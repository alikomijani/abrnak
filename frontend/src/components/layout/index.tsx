import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Navigate, Outlet } from "react-router";

const drawerWidth = 240;

import Sidebar from "./sidebar";
import AppBar from "./appbar";
import { useAuth } from "@/providers/auth-provider";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { isAuthenticated } = useAuth();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        handleDrawerClose={handleDrawerClose}
        mobileOpen={mobileOpen}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
