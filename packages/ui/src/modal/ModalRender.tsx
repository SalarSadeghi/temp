// components/modals/ModalRenderer.tsx
import React, { Suspense, lazy, ComponentType } from "react";
import { CircularProgress, Box } from "@mui/material";
import { BaseModal, BaseModalProps } from "./BaseModal.js";
import { useModalActions } from "../../../shared-store/src/index.js";
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

interface ModalRendererProps extends BaseModalProps {}

// Main Modal Renderer - place this once in your App component
export const ModalRenderer: React.FC<ModalRendererProps> = (
  props: ModalRendererProps
) => {
  const hasModals = useModalStore((state) => state.stack.length > 0);
  if (!hasModals) return null;
  const { modalType } = props;
  return (
    <>
      <Suspense fallback={<ModalLoadingFallback />}>
        <BaseModal {...props}>{props.children}</BaseModal>
      </Suspense>
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
