import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerMutation, UserData } from "@/api/auth";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/providers/auth-provider";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const { login } = useAuth();
  const { mutate, isPending } = registerMutation({
    onError(error) {
      setError("root", { message: error.message });
      Object.entries(error.errors ?? {}).forEach(([key, value]) => {
        setError(key as keyof UserData, {
          message: value.toString(),
        });
      });
    },
    onSuccess(data) {
      login(data.tokens, data.user);
      navigate("/");
    },
  });

  const onSubmit = (data: UserData) => {
    mutate(data);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        ثبت نام
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "First Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="نام"
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Last Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="نام خانوادگی"
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
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
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
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
          {isPending ? "درحال ثبت نام..." : "ثبت نام"}
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        حساب کاربری دارید؟{" "}
        <MuiLink component={Link} to="/auth/login" underline="hover">
          اینجا کلیک کنید
        </MuiLink>
      </Typography>
    </>
  );
};

export default RegisterPage;
