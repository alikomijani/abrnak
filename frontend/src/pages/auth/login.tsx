import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Alert,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { loginMutation, UserCredentials } from "@/api/auth";
import { useAuth } from "@/providers/auth-provider";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuth();
  const { mutate, isPending } = loginMutation({
    onError(error) {
      setError("root", { message: error.message });
      Object.entries(error.errors ?? {}).forEach(([key, value]) => {
        setError(key as keyof UserCredentials, { message: value.toString() });
      });
    },
    onSuccess(data) {
      login(data.tokens, data.user);
      navigate("/");
    },
  });

  const onSubmit = (data: UserCredentials) => {
    mutate(data);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        ورود
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="ایمیل"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="کلمه عبور"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          disabled={isPending}
        >
          {isPending ? "در حال ورود..." : "ورود"}
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        حساب کاربری ندارید؟{" "}
        <MuiLink component={Link} to="/auth/register" underline="hover">
          اینجا کلیک کنید
        </MuiLink>
      </Typography>
      <Box width={"100%"} mt={2}>
        {errors.root && <Alert severity="warning">{errors.root.message}</Alert>}
      </Box>
    </>
  );
};

export default LoginPage;
