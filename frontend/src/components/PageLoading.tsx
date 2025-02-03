import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function PageLoading() {
  return (
    <Backdrop
      open
      sx={(theme) => ({
        color: theme.palette.common.white,
        zIndex: theme.zIndex.drawer + 1,
      })}
    >
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="inherit" />
      </Box>
    </Backdrop>
  );
}

export default PageLoading;
