import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
    </Container>
  );
}
