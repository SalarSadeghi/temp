import { createTheme, Theme } from "@mui/material/styles";
import { faIR as datePickerFA } from "@mui/x-date-pickers/locales";
import { faIR as dataGridFA } from "@mui/x-data-grid/locales";

export const lightTheme: Theme = createTheme(
  {
    palette: {
      mode: "light",
      divider: "#e2e8f0",
      primary: { main: "#2563eb", light: "#DBEAFE", dark: "#1e3a8a" },
      secondary: { main: "#475569", light: "#94a3b8", dark: "#1e293b" },
      background: { default: "#f8fafc", paper: "#ffffff" },
      success: { light: "#DCFCE7", main: "#16a34a", dark: "#15803d" },
      error: { light: "#dc28281a", main: "#DC2626", dark: "#b91c1c" },
      info: { light: "#ebf5ff", main: "#0288d1", dark: "#01579b" },
      warning: { main: "#F59E0B", light: "#FFEDD5", dark: "#b45309" },
      text: { primary: "#0f172a", secondary: "#64748b", disabled: "#94a3b8" },
      tertiary: { main: "#9333EA", light: "#F3E8FF" },
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
      divider: "#334155",
      primary: {
        main: "#90caf9",
        light: "#e3f2fd",
        dark: "#1565c0",
      },
      secondary: {
        main: "#f48fb1",
        light: "#fce4ec",
        dark: "#c2185b",
      },
      background: {
        default: "#0f172a",
        paper: "#1e293b",
      },
      success: {
        main: "#4caf50",
        light: "#81c784",
        dark: "#388e3c",
      },
      error: {
        main: "#f44336",
        light: "#e57373",
        dark: "#d32f2f",
      },
      info: {
        main: "#29b6f6",
        light: "#4fc3f7",
        dark: "#0288d1",
      },
      warning: {
        main: "#ff9800",
        light: "#ffb74d",
        dark: "#f57c00",
      },
      text: {
        primary: "#78fafc",
        secondary: "#cbd5e1",
        disabled: "#64748b",
      },
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
