import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Grid2,
} from "@mui/material";
import { useNavigate } from "react-router";
import image from "@assets/500-error.jpg";
const ServerErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: 5,
      }}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={image}
            alt="404 Illustration"
            sx={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
            }}
          />
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{ fontSize: "6rem", fontWeight: "bold" }}
            >
              500
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
              همیشه همه چیز درست کار نمی‌کنه!
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
              از اختلال پیش آمده عذرخواهی می‌کنیم
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoHome}
              size="large"
            >
              بازگشت به خانه
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.location.reload()}
              size="large"
            >
              تلاش دوباره
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default ServerErrorPage;
