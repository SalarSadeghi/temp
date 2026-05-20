// components/modals/ModalRenderer.tsx
import React, { Suspense, lazy, ComponentType } from "react";
import { CircularProgress, Box } from "@mui/material";
import { BaseModal, useModalRenderer } from "./BaseModal.js";
import { useModalStore } from "../../../shared-store/src/stores/modal/modalStore.js";

// Registry of modal components (lazy loaded)
const modalRegistry: Record<
  string,
  React.LazyExoticComponent<ComponentType<any>>
> = {
  // Example modals - you'll add these later
  // confirm: lazy(() => import('./modals/ConfirmModal')),
  // form: lazy(() => import('./modals/FormModal')),
  // alert: lazy(() => import('./modals/AlertModal')),
  // loading: lazy(() => import('./modals/LoadingModal')),
  generic: lazy(() =>
    import("./GenericModal.js").then((module) => ({
      default: module.GenericModal,
    }))
  ),
};

// Loading fallback component
const ModalLoadingFallback: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 200,
    }}
  >
    <CircularProgress size={40} />
  </Box>
);

// Main Modal Renderer - place this once in your App component
export const ModalRenderer: React.FC = () => {
  const { modalsToRender, hasModals } = useModalRenderer();
  const stack = useModalStore((state) => state.stack);

  if (!hasModals) return null;

  return (
    <>
      {modalsToRender.map((modal) => {
        const ModalComponent = modalRegistry[modal.type];

        if (!ModalComponent) {
          console.error(
            `Modal type "${modal.type}" not registered in modalRegistry`
          );
          return null;
        }

        // Find the complete entry from stack (for z-index and other props)
        const stackEntry = stack.find((s) => s.id === modal.id);
        const baseModalProps = (modal.props as any)._baseModalProps || {};
        return (
          <Suspense key={modal.id} fallback={<ModalLoadingFallback />}>
            <BaseModal
              modalId={modal.id}
              modalType={modal.type}
              open={true}
              // You can pass default props from preset
              // Or let individual modals define their own BaseModal props
              {...baseModalProps} // Extract base modal props from modal props
            >
              <ModalComponent
                {...modal.props}
                modalId={modal.id}
                isTopModal={modal.isTop}
                onClose={() => {
                  // Default close behavior if modal doesn't provide its own
                  const { popModal } = useModalStore.getState();
                  popModal();
                }}
              />
            </BaseModal>
          </Suspense>
        );
      })}
    </>
  );
};

// Helper to extract base modal props from any modal's props
// export const withBaseModalProps = <T extends Record<string, any>>(
//   modalProps: T,
//   baseModalOverrides?: Partial<React.ComponentProps<typeof BaseModal>>
// ): T & { _baseModalProps: Partial<React.ComponentProps<typeof BaseModal>> } => {
//   return {
//     ...modalProps,
//     _baseModalProps: baseModalOverrides || {},
//   };
// };
