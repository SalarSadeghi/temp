// store/modalStore.ts
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { ModalStore, ModalEntry, ModalState } from "./types.js";
import { DEFAULT_MAX_STACK_SIZE, Z_INDEX_INCREMENT } from "./types.js";

// Initial state
const initialState: ModalState = {
  stack: [],
  maxZIndex: 1000, // Base z-index for first modal
  maxStackSize: DEFAULT_MAX_STACK_SIZE,
};

// Helper functions (outside store for performance)
const generateModalId = (): string => Date.now().toString().substring(0, 8); // 8 char IDs are enough

const calculateZIndex = (currentMaxZIndex: number): number => {
  return currentMaxZIndex + Z_INDEX_INCREMENT;
};

const getModalAtIndex = (
  stack: ModalEntry[],
  index: number
): ModalEntry | undefined => {
  return stack[index];
};

const findModalIndex = (stack: ModalEntry[], modalId: string): number => {
  // Manual loop for performance (faster than findIndex for hot path)
  for (let i = stack.length - 1; i >= 0; i--) {
    const entry = getModalAtIndex(stack, i);
    if (entry?.id === modalId) return i;
  }
  return -1;
};

// Create the store with performance optimizations
export const useModalStore = create<ModalStore>()(
  subscribeWithSelector(
    immer((set, get) => ({
      // Initial state
      ...initialState,

      // Push modal - returns modal ID for reference
      pushModal: <TProps extends Record<string, unknown>>(
        type: string,
        props: TProps
      ): string => {
        const { stack, maxZIndex, maxStackSize } = get();

        // Prevent stack overflow
        if (stack.length >= maxStackSize) {
          console.warn(
            `Modal stack limit reached (${maxStackSize}). Cannot open more modals.`
          );
          return "";
        }

        const modalId = generateModalId();
        const newZIndex = calculateZIndex(maxZIndex);

        const newEntry: ModalEntry<TProps> = {
          id: modalId,
          type,
          props,
          zIndex: newZIndex,
          timestamp: Date.now(),
        };

        set((state) => {
          state.stack.push(newEntry);
          state.maxZIndex = newZIndex;
        });
        return modalId;
      },

      // Pop top modal
      popModal: () => {
        const { stack } = get();

        if (stack.length === 0) {
          return;
        }
        // const popped = stack[stack.length - 1];
        set((state) => {
          state.stack.pop();
          // Don't decrease maxZIndex - it's ok to keep growing
          // Prevents z-index conflicts if same modal reopens
        });
      },

      // Pop all modals down to specific modal (inclusive keeps target)
      popToModal: (modalId: string) => {
        const { stack } = get();
        const targetIndex = findModalIndex(stack, modalId);

        if (targetIndex === -1) {
          return;
        }

        // const removedCount = stack.length - (targetIndex + 1);

        set((state) => {
          // Keep modals from 0 to targetIndex (inclusive)
          state.stack = state.stack.slice(0, targetIndex + 1);
        });
      },

      // Pop until predicate returns true (keeps the matching modal)
      popUntilModal: (predicate: (entry: ModalEntry) => boolean) => {
        const { stack } = get();

        // Find from top down
        let keepIndex = -1;
        for (let i = stack.length - 1; i >= 0; i--) {
          const entry = getModalAtIndex(stack, i);
          if (entry && predicate(entry)) {
            keepIndex = i;
            break;
          }
        }

        if (keepIndex === -1) {
          console.warn("[Modal] popUntilModal: predicate never matched");
          return;
        }

        set((state) => {
          state.stack = state.stack.slice(0, keepIndex + 1);
        });
      },

      // Replace top modal without changing stack depth
      replaceTopModal: <TProps extends Record<string, unknown>>(
        type: string,
        props: TProps
      ) => {
        const { stack, maxZIndex } = get();

        if (stack.length === 0) {
          console.warn("[Modal] Cannot replace top modal - stack is empty");
          return;
        }

        const newId = generateModalId();

        set((state) => {
          // Remove top modal
          state.stack.pop();
          // Push new one with same z-index pattern
          state.stack.push({
            id: newId,
            type,
            props,
            zIndex: maxZIndex,
            timestamp: Date.now(),
          });
        });
      },

      // Clear entire stack
      clearStack: () => {
        // const { stack } = get();

        set((state) => {
          state.stack = [];
          // Don't reset maxZIndex to avoid z-index collisions on re-open
        });
      },

      // Update props of specific modal (useful for loading states inside modal)
      updateModalProps: <TProps extends Record<string, unknown>>(
        modalId: string,
        newProps: Partial<TProps>
      ) => {
        const modalIndex = findModalIndex(get().stack, modalId);

        if (modalIndex === -1) {
          console.warn(
            `[Modal] Cannot update props - modal ${modalId} not found`
          );
          return;
        }

        set((state) => {
          const modal = state.stack[modalIndex];
          if (modal) {
            // Merge props immutably
            modal.props = { ...modal.props, ...newProps };
          }
        });
      },

      // Get top modal (without removing)
      getTopModal: () => {
        const { stack } = get();
        return stack.length > 0 ? stack[stack.length - 1] : undefined;
      },

      // Check if any modal or specific modal is open
      isModalOpen: (modalId?: string) => {
        console.log("is modal open called");
        
        const { stack } = get();
        if (!modalId) return stack.length > 0;
        return stack.some((modal) => modal.id === modalId);
      },

      // Get index of modal in stack
      getModalIndex: (modalId: string) => {
        return findModalIndex(get().stack, modalId);
      },

      // Configure max stack size dynamically
      setMaxStackSize: (size: number) => {
        if (size < 1) {
          console.warn("[Modal] Max stack size must be at least 1");
          return;
        }

        set((state) => {
          state.maxStackSize = size;
          // Trim stack if current exceeds new limit
          if (state.stack.length > size) {
            const removedCount = state.stack.length - size;
            state.stack = state.stack.slice(0, size);
            console.warn(
              `[Modal] Stack trimmed to ${size}, removed ${removedCount} modal(s)`
            );
          }
        });
      },
    }))
  )
);

// Performance-optimized selectors (prevent unnecessary re-renders)
// export const useModalStackLength = () =>
//   useModalStore((state) => state.stack.length);

// export const useModalStack = () =>
//   useModalStore(
//     (state) => state.stack,
//     (prev, next) => {
//       // Custom equality check - only re-render if stack reference changes or length changes
//       if (prev.length !== next.length) return false;
//       if (prev === next) return true;
//       // Deep check first and last modal (most common changes)
//       const prevFirst = prev[0];
//       const nextFirst = next[0];
//       const prevLast = prev[prev.length - 1];
//       const nextLast = next[next.length - 1];
//       return prevFirst?.id === nextFirst?.id && prevLast?.id === nextLast?.id;
//     }
//   );

export const useTopModal = () =>
  useModalStore((state) => state.stack[state.stack.length - 1]);

// export const useIsAnyModalOpen = () =>
//   useModalStore((state) => state.stack.length > 0);

// Optimized hook for checking specific modal
export const useIsModalOpen = (modalId: string) =>
  useModalStore((state) => state.stack.some((modal) => modal.id === modalId));

// Hook with actions (stable reference)
export const useModalActions = () => {
  const pushModal = useModalStore((state) => state.pushModal);
  const popModal = useModalStore((state) => state.popModal);
  const popToModal = useModalStore((state) => state.popToModal);
  const popUntilModal = useModalStore((state) => state.popUntilModal);
  const replaceTopModal = useModalStore((state) => state.replaceTopModal);
  const clearStack = useModalStore((state) => state.clearStack);
  const updateModalProps = useModalStore((state) => state.updateModalProps);
  const getTopModal = useModalStore((state) => state.getTopModal);
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const getModalIndex = useModalStore((state) => state.getModalIndex);
  const setMaxStackSize = useModalStore((state) => state.setMaxStackSize);

  return {
    pushModal,
    popModal,
    popToModal,
    popUntilModal,
    replaceTopModal,
    clearStack,
    updateModalProps,
    getTopModal,
    isModalOpen,
    getModalIndex,
    setMaxStackSize,
  };
};
