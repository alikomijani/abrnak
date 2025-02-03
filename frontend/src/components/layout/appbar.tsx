type Props = {
  handleDrawerToggle: () => void;
};
import {
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import TOMAN_LOGO from "@/assets/toman_logo.png";
import SwitchTheme from "./SwitchTheme";

export default function AppBar({ handleDrawerToggle }: Props) {
  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.text.primary,
        borderBottom: 1,
        borderColor: (t) => t.palette.grey[300],
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <img src={TOMAN_LOGO} height={38} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          mx={3}
          sx={{
            flexGrow: 1,
          }}
        >
          پنل مدیریت تسکینو
        </Typography>
        <SwitchTheme />
      </Toolbar>
    </MuiAppBar>
  );
}
