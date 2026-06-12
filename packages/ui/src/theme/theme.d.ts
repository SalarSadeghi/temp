// theme.d.ts
import {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: MuiPalette["primary"];
  }

  interface PaletteOptions {
    tertiary?: MuiPaletteOptions["primary"];
  }
}
