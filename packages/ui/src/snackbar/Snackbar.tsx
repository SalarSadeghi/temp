import type {
  SnackbarProps as MuiSnackbarProps,
  AlertColor,
} from "@mui/material";
import { Snackbar as MuiSnackbar, Alert, AlertProps } from "@mui/material";
import {
  useNotificationStore,
  CustomSnackbarState,
} from "@superapp/shared-store/stores/notificationStore.js";
export type SnackbarSeverity = AlertColor; // 'error' | 'warning' | 'info' | 'success'

// export interface CustomSnackbarProps {
//   open: boolean;
//   message: string;
//   severity?: SnackbarSeverity;
//   autoHideDuration?: number;
//   onClose?: () => void;
//   position?: {
//     vertical: "top" | "bottom";
//     horizontal: "left" | "center" | "right";
//   };
// }

export const CustomSnackbar: React.FC = () => {
  const { message, open, position, severity, autoHideDuration } =
    useNotificationStore();
  //   const handleClose = (
  //     event?: React.SyntheticEvent | Event,
  //     reason?: string
  //   ) => {
  //     if (reason === "clickaway") return;
  //     onClose?.();
  //   };

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      //   onClose={handleClose}
      anchorOrigin={position}
    >
      <Alert
        // onClose={handleClose}
        severity={severity}
        variant="filled" // optional: use 'filled', 'outlined', or 'standard'
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export const useSnackbar = () => {
  const { setMessage, setOpen, setAutoHideDuration, setPosition, setSeverity } =
    useNotificationStore();

  const showSnackbar = ({
    message,
    position,
    severity,
  }: Pick<CustomSnackbarState, "message"> &
    Partial<Pick<CustomSnackbarState, "position" | "severity">>) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
    setPosition(position);
  };

  return {
    // snackbarProps: {
    //   open: state.open,
    //   message: state.message,
    //   severity: state.severity,
    //   onClose: hideSnackbar,
    // },
    showSnackbar,
    // hideSnackbar,
  };
};
