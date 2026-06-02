import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDialogStore } from "@superapp/shared-store/stores/dialogStore.js";
import { Shared_Text } from "../Texts/texts";

export function CustomConfirmDialog() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const {
    isOpen,
    overflowY,
    changeOverflowY,
    changeOpen,
    title,
    body,
    onOk,
    onCancel,
    hasCancelBtn,
    hasOkBtn,
    maxWidth,
    isTransparentBackground,
    changeIsTransparentBackground,
    autoClose,
    changeAutoClose,
    changeIsLoading,
    isLoading,
  } = useDialogStore();

  const handleToggle = () => {
    if (isOpen) {
      changeOverflowY("auto");
      changeIsTransparentBackground(false);
    }
    changeOpen(!isOpen);
    changeAutoClose(true);
    changeIsLoading(false);
  };

  const handleCancel = () => {
    handleToggle();
    if (onCancel) onCancel();
  };

  const handleOk = () => {
    if (autoClose) handleToggle();
    if (onOk) onOk();
  };

  return (
    <Dialog
      open={isOpen}
      sx={{
        "& .MuiPaper-root": {
          background: isTransparentBackground ? "transparent" : undefined,
          boxShadow: isTransparentBackground ? "unset" : undefined,
        },
        "& .MuiDialog-paper": {
          maxWidth,
          margin: isDesktop ? "inherit" : 0,
          width: "100%",
        },
        "& .MuiDialogContent-root": {
          overflowY,
        },
      }}
      onClose={handleToggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {typeof body === "string" ? (
          <DialogContentText id="alert-dialog-description">
            <Typography paragraph align="justify">
              {body}
            </Typography>
          </DialogContentText>
        ) : (
          <div> {body}</div>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-start" }}>
        {hasOkBtn && (
          <Button
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={15} /> : undefined}
            onClick={handleOk}
            autoFocus
          >
            {Shared_Text.common.agree}
          </Button>
        )}

        {hasCancelBtn && (
          <Button onClick={handleCancel}>{Shared_Text.common.cancel}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
