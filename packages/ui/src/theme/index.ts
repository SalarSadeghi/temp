import { createTheme, Theme } from "@mui/material/styles";
import { faIR as datePickerFA } from "@mui/x-date-pickers/locales";
import { faIR as dataGridFA } from "@mui/x-data-grid/locales";

export const lightTheme: Theme = createTheme(
  {
    palette: {
      mode: "light",
      primary: { main: "#432b6f", light: "#432b6f", dark: "#432b6f" },
      secondary: { main: "#a02278" },
      background: { default: "#f5f5f5", paper: "#ffffff" },
      success: { light: "#aaffc7", main: "#00807e" },
      error: { light: "#f48fb1", main: "#ff3737" },
      info: { light: "#ebf5ff", main: "#0288d1" },
    },

    typography: {
      fontFamily:
        'IRANSans -apple-system BlinkMacSystemFont "Segoe UI" "Roboto" "Oxygen" "Ubuntu" "Cantarell" "Fira Sans" "Droid Sans" "Helvetica Neue" "sans-serif"',
      button: { textTransform: "none" },
    },
    shape: { borderRadius: 8 },
  },
  datePickerFA,
  dataGridFA,
);

export const darkTheme: Theme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: { main: "#90caf9" },
      secondary: { main: "#f48fb1" },
      background: { default: "#121212", paper: "#1e1e1e" },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      button: { textTransform: "none" },
    },
    shape: { borderRadius: 8 },
  },
  datePickerFA,
  dataGridFA,
);

export const getTheme = (mode: "light" | "dark"): Theme =>
  mode === "light" ? lightTheme : darkTheme;
