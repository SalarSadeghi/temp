import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from ".";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

interface ThemeContextType {
  mode: "light" | "dark";
  toggleTheme: () => void;
  setMode: (mode: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }
  return context;
};

interface AppThemeProviderProps {
  children: ReactNode;
  defaultMode?: "light" | "dark";
  direction?: "ltr" | "rtl";
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
  defaultMode = "light",
  direction = "rtl",
}) => {
  const [mode, setMode] = useState<"light" | "dark">(defaultMode);

  // const theme = useMemo(() => {direction, ...getTheme(mode)}, [mode]);
  const theme = useMemo(() => {
    const baseTheme = getTheme(mode);

    return createTheme({
      ...baseTheme,
      direction,
    });
  }, [mode, direction]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
      setMode,
    }),
    [mode]
  );

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  // const cacheLtr = createCache({
  //   key: "muiltr",
  //   stylisPlugins: [prefixer],
  // });

  useEffect(() => {
    document.dir = direction;
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <CacheProvider value={cacheRtl}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};
