import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link as RouterLink } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { authApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";

const schema = z.object({ email: z.string().email("Invalid email address") });

export const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      await authApi.forgotPassword(data.email);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <Box textAlign="center">
        <CheckCircleIcon sx={{ fontSize: 64, color: "success.main", mb: 2 }} />
        <Typography variant="h5" fontWeight={700} gutterBottom>Check your email</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          We've sent a password reset link. Please check your inbox and spam folder.
        </Typography>
        <Button component={RouterLink} to={ROUTES.LOGIN} variant="outlined" startIcon={<ArrowBackIcon />}>
          Back to Sign In
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800} gutterBottom>Forgot Password?</Typography>
        <Typography variant="body2" color="text.secondary">Enter your email and we'll send you a reset link</Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("email")}
          label="Email Address"
          type="email"
          fullWidth
          autoFocus
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 3 }}
        />
        <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading} sx={{ py: 1.5, mb: 2 }}>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
        <Button component={RouterLink} to={ROUTES.LOGIN} variant="text" fullWidth startIcon={<ArrowBackIcon />}>
          Back to Sign In
        </Button>
      </Box>
    </Box>
  );
};
