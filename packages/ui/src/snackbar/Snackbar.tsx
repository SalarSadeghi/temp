import type {
  AlertColor,
} from "@mui/material";
import {
  Snackbar as MuiSnackbar,
  Alert,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  useNotificationStore,
  CustomSnackbarState,
} from "@superapp/shared-store/stores/notificationStore.js";
import { Close } from "../../../icons/src";
export type SnackbarSeverity = AlertColor; // 'error' | 'warning' | 'info' | 'success'

export const CustomSnackbar: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const { message, open, position, severity, autoHideDuration, setOpen } =
    useNotificationStore();
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <Close fontSize="small" />
    </IconButton>
  );

  return (
    <div>
      <MuiSnackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={position}
        action={action}
        sx={isDesktop ? { width: 350 } : { width: "95%" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled" // optional: use 'filled', 'outlined', or 'standard'
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </MuiSnackbar>
    </div>
  );
};

export const useSnackbar = () => {
  const { setMessage, setOpen, setPosition, setSeverity } =
    useNotificationStore();

  const showSnackbar = ({
    message,
    position,
    severity,
  }: Partial<
    Pick<CustomSnackbarState, "message" | "position" | "severity">
  >) => {
    setOpen(true);
    message && setMessage(message);
    severity && setSeverity(severity);
    position && setPosition(position);
  };

  return {
    showSnackbar,
  };
};
