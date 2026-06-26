import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, Alert, Divider,
  InputAdornment, IconButton, Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES, getDashboardRoute } from "../../constants/routes";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      await login(data);
      navigate(from || "/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800} gutterBottom>Welcome back</Typography>
        <Typography variant="body2" color="text.secondary">Sign in to your ChefLink account</Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box display="flex" flexDirection="column" gap={2.5}>
          <TextField
            {...register("email")}
            label="Email Address"
            type="email"
            fullWidth
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            {...register("password")}
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={1} mb={3}>
          <Link component={RouterLink} to={ROUTES.FORGOT_PASSWORD} underline="hover" sx={{ fontSize: "0.875rem", color: "primary.main" }}>
            Forgot password?
          </Link>
        </Box>

        <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading} sx={{ py: 1.5, fontSize: "1rem" }}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </Box>

      <Divider sx={{ my: 3 }}>
        <Typography variant="caption" color="text.secondary">New to ChefLink?</Typography>
      </Divider>

      <Button component={RouterLink} to={ROUTES.REGISTER} variant="outlined" size="large" fullWidth sx={{ py: 1.5 }}>
        Create an Account
      </Button>
    </Box>
  );
};
