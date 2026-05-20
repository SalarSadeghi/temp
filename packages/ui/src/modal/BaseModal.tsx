// components/modals/BaseModal.tsx
import React, { ReactNode, useEffect, useCallback, useRef } from "react";
import {
  Modal as MuiModal,
  Box,
  IconButton,
  Typography,
  Divider,
  SxProps,
  Theme,
  Backdrop,
  Fade,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import {
  useModalActions,
  useTopModal,
} from "../../../shared-store/src/index.js";
import { Close } from "../../../icons/src/index.js";
import { useModalStore } from "../../../shared-store/src/stores/modal/modalStore.js";

// Types
export type BaseModalProps = {
  // Core
  modalId: string;
  modalType: string;
  open: boolean;

  // Content
  title?: string | ReactNode;
  children: ReactNode;
  actions?: ReactNode; // Footer actions (buttons)

  // Styling
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth?: boolean;
  fullScreen?: boolean;
  sx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;

  // Behavior
  disableEscapeKeyDown?: boolean;
  disableScrollLock?: boolean;
  closeOnBackdropClick?: boolean; // You said no backdrop click, but keeping for flexibility
  closeOnModalPop?: boolean; // Auto-close when popped from stack
  hideBackdrop?: boolean;

  // Callbacks
  onClose?: () => void;
  onExited?: () => void; // Called after exit animation completes
  onEntered?: () => void; // Called after enter animation completes

  // Performance
  keepMounted?: boolean; // For modals that need to preserve state
};

// Styling constants
const modalStyles = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "hidden",
  outline: "none", // Remove focus outline (MUI handles focus)
};

export const BaseModal: React.FC<BaseModalProps> = ({
  modalId,
  modalType,
  open,
  title,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  fullScreen = false,
  sx,
  contentSx,
  disableEscapeKeyDown = false,
  disableScrollLock = false,
  closeOnBackdropClick = false,
  closeOnModalPop = true,
  hideBackdrop = false,
  onClose,
  onExited,
  onEntered,
  keepMounted = false,
}) => {
  const { popModal, getTopModal } = useModalActions();
  const topModal = useTopModal();

  // Track if this modal is the topmost in stack
  const isTopModal = topModal?.id === modalId;

  // Refs for animation
  const hasExitedRef = useRef(false);

  // Handle close - only if this modal is on top
  const handleClose = useCallback(() => {
    // Prevent closing if this modal isn't on top

    if (!isTopModal) {
      console.warn(
        `[Modal] Cannot close modal "${modalId}" - not on top of stack`
      );
      return;
    }

    // Custom close handler
    onClose?.();

    // Pop from store if closeOnModalPop is true
    if (closeOnModalPop) {
      popModal();
    }
  }, [isTopModal, modalId, onClose, closeOnModalPop, popModal]);

  // Handle ESC key - respect disableEscapeKeyDown prop
  const handleEscapeKeyDown = useCallback(() => {
    if (!disableEscapeKeyDown && isTopModal) {
      handleClose();
    }
  }, [disableEscapeKeyDown, isTopModal, handleClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(() => {
    if (closeOnBackdropClick && isTopModal) {
      handleClose();
    }
  }, [closeOnBackdropClick, isTopModal, handleClose]);

  // Auto-close when this modal is no longer in stack (safety mechanism)
  useEffect(() => {
    const currentTop = getTopModal();
    const isStillInStack =
      currentTop?.id === modalId ||
      // Check if modal exists anywhere in stack (not just top)
      false; // Would need full stack access

    if (open && !isStillInStack && closeOnModalPop) {
      // Modal was removed from stack externally
      if (process.env.NODE_ENV === "development") {
        console.warn(`[Modal] "${modalId}" closed due to stack removal`);
      }
    }
  }, [open, modalId, closeOnModalPop, getTopModal]);

  // Handle animation complete
  const handleExited = useCallback(() => {
    hasExitedRef.current = true;
    onExited?.();
  }, [onExited]);

  const handleEntered = useCallback(() => {
    hasExitedRef.current = false;
    onEntered?.();
  }, [onEntered]);

  // Determine z-index from store if needed (optional - MUI handles it)
  // We'll let MUI manage z-index automatically

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      // onBackdropClick={handleBackdropClick}
      //   onEscapeKeyDown={handleEscapeKeyDown}
      //   onExited={handleExited}
      //   onEntered={handleEntered}
      disableEscapeKeyDown={disableEscapeKeyDown}
      disableScrollLock={disableScrollLock}
      hideBackdrop={hideBackdrop}
      keepMounted={keepMounted}
      closeAfterTransition
      slots={{
        backdrop: hideBackdrop ? undefined : Backdrop,
      }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.modal, // MUI default is 1300
        ...sx,
      }}
    >
      <Fade in={open} timeout={300}>
        <Box
          sx={{
            ...modalStyles,
            // maxWidth: fullScreen ? "100%" : maxWidth,
            width: fullScreen
              ? "100%"
              : fullWidth
                ? "calc(100% - 32px)"
                : "auto",
            height: fullScreen ? "100%" : "auto",
            borderRadius: fullScreen ? 0 : 2,
            ...sx,
          }}
        >
          {/* Header */}
          {(title || true) && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  pb: title ? 2 : 1,
                  borderBottom: title ? 1 : 0,
                  borderColor: "divider",
                }}
              >
                {typeof title === "string" ? (
                  <Typography variant="h6" component="h2">
                    {title}
                  </Typography>
                ) : (
                  title
                )}

                <IconButton
                  onClick={handleClose}
                  size="small"
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      color: "text.primary",
                    },
                  }}
                  aria-label="Close modal"
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
              {title && <Divider />}
            </>
          )}

          {/* Content */}
          <Box
            sx={{
              p: 3,
              flex: 1,
              overflowY: "auto",
              maxHeight: fullScreen ? "calc(100vh - 120px)" : "70vh",
              ...contentSx,
            }}
          >
            {children}
          </Box>

          {/* Footer with actions */}
          {actions && (
            <>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                  p: 2,
                  bgcolor: "background.paper",
                }}
              >
                {actions}
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </MuiModal>
  );
};

// Custom hook for using BaseModal with store integration
export const useModalRenderer = () => {
  const stack = useModalStore((state) => state.stack);

  // Get all modals to render (from stack)
  const modalsToRender = stack.map((entry) => ({
    id: entry.id,
    type: entry.type,
    props: entry.props,
    zIndex: entry.zIndex,
    isTop: entry.id === stack[stack.length - 1]?.id,
  }));

  return {
    modalsToRender,
    hasModals: stack.length > 0,
    stackSize: stack.length,
  };
};

// Optional: Preset configurations for common modal types
export const modalPresets = {
  // Small confirmation modal
  confirm: {
    maxWidth: "xs" as const,
    fullWidth: true,
    hideBackdrop: false,
  },

  // Large form modal
  form: {
    maxWidth: "md" as const,
    fullWidth: true,
    disableEscapeKeyDown: true, // Prevent accidental close
  },

  // Full-screen modal (e.g., image editor)
  fullscreen: {
    fullScreen: true,
    hideBackdrop: false,
  },

  // Alert/notification modal
  alert: {
    maxWidth: "xs" as const,
    fullWidth: true,
    closeOnBackdropClick: true,
    hideBackdrop: false,
  },

  // Loading modal (no close button)
  loading: {
    maxWidth: "xs" as const,
    fullWidth: true,
    disableEscapeKeyDown: true,
    hideBackdrop: false,
    showCloseButton: false, // You'll need to handle this separately
  },
};
