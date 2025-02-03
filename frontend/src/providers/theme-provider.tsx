import { PropsWithChildren } from "react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import theme from "@/theme/theme";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <MuiThemeProvider theme={theme}>
      <CacheProvider value={rtlCache}>
        <CssBaseline />
        {children}
      </CacheProvider>
    </MuiThemeProvider>
  );
}
