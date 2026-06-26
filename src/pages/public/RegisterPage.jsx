import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, Alert,
  InputAdornment, IconButton, Grid, Stepper, Step, StepLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES, getDashboardRoute } from "../../constants/routes";

const schema = z.object({
  role: z.enum(["ROLE_CHEF", "ROLE_HELPER", "ROLE_RESTAURANT"]),
  first_name: z.string().min(2, "At least 2 characters"),
  last_name: z.string().min(2, "At least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number").optional().or(z.literal("")),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ROLE_OPTIONS = [
  { value: "ROLE_CHEF", label: "Chef", icon: <RestaurantIcon />, desc: "Cook and culinary professional" },
  { value: "ROLE_HELPER", label: "Helper", icon: <PeopleIcon />, desc: "Kitchen support staff" },
  { value: "ROLE_RESTAURANT", label: "Restaurant", icon: <StoreIcon />, desc: "Hire culinary talent" },
];

export const RegisterPage = () => {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const { register, handleSubmit, control, watch, trigger, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: "ROLE_CHEF" },
  });

  const selectedRole = watch("role");

  const handleNextStep = async () => {
    const valid = await trigger(["role"]);
    if (valid) setActiveStep(1);
  };

  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const { confirmPassword, ...payload } = data;
      await authRegister({ ...payload, phone: payload.phone || undefined });
      navigate(getDashboardRoute(data.role), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setActiveStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800} gutterBottom>Create your account</Typography>
        <Typography variant="body2" color="text.secondary">Join ChefLink in seconds</Typography>
      </Box>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        <Step><StepLabel>Choose Role</StepLabel></Step>
        <Step><StepLabel>Your Details</StepLabel></Step>
      </Stepper>

      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {activeStep === 0 && (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>I am joining as a...</Typography>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Box display="flex" flexDirection="column" gap={1.5}>
                  {ROLE_OPTIONS.map((opt) => (
                    <Box
                      key={opt.value}
                      onClick={() => field.onChange(opt.value)}
                      sx={{
                        p: 2, border: "2px solid", borderColor: field.value === opt.value ? "primary.main" : "divider",
                        borderRadius: 3, cursor: "pointer", bgcolor: field.value === opt.value ? "primary.light" : "transparent",
                        opacity: field.value === opt.value ? 1 : 0.8, transition: "all 0.2s",
                        display: "flex", alignItems: "center", gap: 2,
                        "&:hover": { borderColor: "primary.light", opacity: 1 },
                      }}
                    >
                      <Box sx={{ color: field.value === opt.value ? "primary.main" : "text.secondary" }}>{opt.icon}</Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>{opt.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{opt.desc}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            />
            <Button fullWidth variant="contained" size="large" sx={{ mt: 3, py: 1.5 }} onClick={handleNextStep}>
              Continue
            </Button>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField {...register("first_name")} label="First Name" fullWidth error={!!errors.first_name} helperText={errors.first_name?.message} />
              </Grid>
              <Grid size={6}>
                <TextField {...register("last_name")} label="Last Name" fullWidth error={!!errors.last_name} helperText={errors.last_name?.message} />
              </Grid>
              <Grid size={12}>
                <TextField {...register("email")} label="Email Address" type="email" fullWidth autoComplete="email" error={!!errors.email} helperText={errors.email?.message} />
              </Grid>
              <Grid size={12}>
                <TextField {...register("phone")} label="Phone Number (optional)" fullWidth placeholder="10-digit mobile number" error={!!errors.phone} helperText={errors.phone?.message} />
              </Grid>
              <Grid size={12}>
                <TextField
                  {...register("password")}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={12}>
                <TextField {...register("confirmPassword")} label="Confirm Password" type={showPassword ? "text" : "password"} fullWidth error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />
              </Grid>
            </Grid>

            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2, mb: 3 }}>
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </Typography>

            <Box display="flex" gap={2}>
              <Button variant="outlined" size="large" onClick={() => setActiveStep(0)} sx={{ flex: 1 }}>Back</Button>
              <Button type="submit" variant="contained" size="large" disabled={isLoading} sx={{ flex: 2 }}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <Box textAlign="center" mt={3}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <RouterLink to={ROUTES.LOGIN} style={{ color: "inherit", fontWeight: 600 }}>Sign in</RouterLink>
        </Typography>
      </Box>
    </Box>
  );
};
