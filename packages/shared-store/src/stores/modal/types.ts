// types/modal.types.ts

// Base modal entry - generic but type-safe
export type ModalEntry<TProps = Record<string, unknown>> = {
  id: string;
  type?: string;
  props?: TProps;
  zIndex: number;
  timestamp: number; // for debugging and ordering
};

// Store state
export type ModalState = {
  stack: ModalEntry[];
  maxZIndex: number;
  maxStackSize: number;
};

// Store actions
export type ModalActions = {
  // Core operations
  // pushModal: <TProps extends Record<string, unknown>>(
  //   type: string,
  //   props: TProps
  // ) => string;
  pushModal: <TProps extends Record<string, unknown>>(options: {
    id: string;
    type?: string;
    props?: TProps;
  }) => string;

  popModal: () => void;
  popToModal: (modalId: string) => void;
  popUntilModal: (predicate: (entry: ModalEntry) => boolean) => void;
  replaceTopModal: <TProps extends Record<string, unknown>>(options: {
    id: string;
    type?: string;
    props?: TProps;
  }) => void;
  clearStack: () => void;

  // Utilities
  // Type is not changed
  updateModalProps: <TProps extends Record<string, unknown>>(options: {
    modalId: string;
    newProps: Partial<TProps>;
  }) => void;

  getTopModal: () => ModalEntry | undefined;
  isModalOpen: (modalId?: string) => boolean;
  getModalIndex: (modalId: string) => number;

  // Configuration
  setMaxStackSize: (size: number) => void;
};

// Combined store type
export type ModalStore = ModalState & ModalActions;

// Default configuration
export const DEFAULT_MAX_STACK_SIZE = 10;
export const Z_INDEX_INCREMENT = 1000;
