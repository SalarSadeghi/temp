import { FC, ReactNode } from "react";

// import rtlPlugin from "stylis-plugin-rtl";
// import createCache from "@emotion/cache";
// import { prefixer } from "stylis";
import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";

interface Props {
  children: ReactNode;
  theme: Theme;
  direction: "rtl" | "ltr";
}

// const cacheRtl = createCache({
//   key: "muirtl",
//   stylisPlugins: [prefixer, rtlPlugin],
// });

// const cacheLtr = createCache({
//   key: "muiltr",
//   stylisPlugins: [prefixer],
// });

export const ThemeProvider: FC<Props> = (props) => {
  return (
    <MuiThemeProvider theme={props.theme}>{props.children}</MuiThemeProvider>
  );
};
