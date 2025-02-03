import { createTheme } from "@mui/material/styles";
import { teal } from "@mui/material/colors";
import { lightGreen } from "@mui/material/colors";
// Create a theme instance.
const lightTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
  direction: "rtl",
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: lightGreen[500],
    },
  },
  typography: {
    fontFamily: [
      "vazirmatn",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default lightTheme;
