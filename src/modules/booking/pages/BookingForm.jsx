import React, { useState, useEffect } from "react";
import {
  Box, Container, Typography, Grid, TextField, Button,
  Paper, Stack, Stepper, Step, StepLabel, Divider,
  FormControl, InputLabel, Select, MenuItem, Alert,
  Avatar, Chip, CircularProgress, Breadcrumbs, Link,
  InputAdornment, alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import HandymanIcon from "@mui/icons-material/Handyman";
import { BRAND } from "../../../theme";
import { ROUTES } from "../../../constants/routes";
import { bookingSchema, EVENT_TYPES } from "../validation/booking.validation";
import { submitGuestBooking } from "../services/booking.service";
import { getPublicChefById } from "../services/chef.service";
import { getPublicHelperById } from "../services/helper.service";
import { INDIAN_CITIES } from "../../../constants";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

const STEPS = ["Your Information", "Event Details", "Location & Notes"];

const todayStr = () => new Date().toISOString().split("T")[0];

export const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const bookingType = pathname.includes("book-chef") ? "CHEF" : "HELPER";

  const [activeStep, setActiveStep] = useState(0);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guest_name: "",
      guest_email: "",
      guest_phone: "",
      event_type: "",
      event_date: "",
      start_time: "",
      end_time: "",
      guest_count: "",
      budget: "",
      currency: "INR",
      location: "",
      address: "",
      city: "",
      state: "",
      country: "India",
      special_requirements: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setProfileLoading(true);
      try {
        const res = bookingType === "CHEF"
          ? await getPublicChefById(id)
          : await getPublicHelperById(id);
        setProfile(res.data.data);
      } catch {
        setProfile(null);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [id, bookingType]);

  const step1Fields = ["guest_name", "guest_email", "guest_phone"];
  const step2Fields = ["event_type", "event_date", "start_time", "end_time", "guest_count", "budget"];

  const handleNext = async () => {
    const fields = activeStep === 0 ? step1Fields : step2Fields;
    const valid = await trigger(fields);
    if (valid) setActiveStep((s) => s + 1);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        ...data,
        booking_type: bookingType,
        ...(bookingType === "CHEF" ? { chef_id: id } : { helper_id: id }),
        guest_count: Number(data.guest_count),
        budget: Number(data.budget),
      };
      const res = await submitGuestBooking(payload);
      navigate(ROUTES.PUBLIC_BOOKING_SUCCESS, {
        state: { booking: res.data.data },
        replace: true,
      });
    } catch (err) {
      const msg = err?.response?.data?.message || "Booking submission failed. Please try again.";
      setSubmitError(msg);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  };

  const profileName = profile ? `${profile.first_name} ${profile.last_name}` : "";
  const profileInitials = profile
    ? `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`.toUpperCase()
    : "";
  const browseRoute = bookingType === "CHEF" ? ROUTES.PUBLIC_CHEFS : ROUTES.PUBLIC_HELPERS;
  const typeLabel = bookingType === "CHEF" ? "Chef" : "Helper";

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Page Header */}
      <Box sx={{ background: "linear-gradient(160deg, #0F172A 0%, #1E293B 100%)", py: { xs: 5, md: 6 } }}>
        <Container maxWidth="lg">
          <motion.div {...fadeUp(0)}>
            <Breadcrumbs sx={{ mb: 3 }}>
              <Link
                component={RouterLink}
                to={browseRoute}
                sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: BRAND.orange }, textDecoration: "none" }}
              >
                {typeLabel}s
              </Link>
              {profile && (
                <Link
                  component={RouterLink}
                  to={(bookingType === "CHEF" ? ROUTES.PUBLIC_CHEF_DETAIL : ROUTES.PUBLIC_HELPER_DETAIL).replace(":id", id)}
                  sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: BRAND.orange }, textDecoration: "none" }}
                >
                  {profileName}
                </Link>
              )}
              <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>Book Now</Typography>
            </Breadcrumbs>
          </motion.div>

          <motion.div {...fadeUp(0.06)}>
            <Typography variant="h3" fontWeight={800} sx={{ color: "white", mb: 1 }}>
              Book a {typeLabel}
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)" }}>
              No account required. Fill in your details and we'll confirm your booking.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {/* Form Column */}
          <Grid size={{ xs: 12, md: 8 }}>
            {submitError && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setSubmitError(null)}>
                {submitError}
              </Alert>
            )}

            {/* Stepper */}
            <motion.div {...fadeUp(0.05)}>
              <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3, borderRadius: 4, border: "1px solid #E2E8F0" }}>
                <Stepper activeStep={activeStep} sx={{ mb: 0 }}>
                  {STEPS.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Step 1: Guest Information */}
              {activeStep === 0 && (
                <motion.div {...fadeUp(0.08)}>
                  <Paper sx={{ p: { xs: 3, sm: 4 }, borderRadius: 4, border: "1px solid #E2E8F0" }}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                      <PersonIcon sx={{ color: BRAND.orange }} />
                      <Typography variant="h6" fontWeight={700}>Your Information</Typography>
                    </Box>
                    <Stack spacing={3}>
                      <TextField
                        label="Full Name"
                        placeholder="Priya Sharma"
                        fullWidth
                        {...register("guest_name")}
                        error={!!errors.guest_name}
                        helperText={errors.guest_name?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={{ fontSize: 18, color: BRAND.slate }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        label="Email Address"
                        placeholder="priya@example.com"
                        type="email"
                        fullWidth
                        {...register("guest_email")}
                        error={!!errors.guest_email}
                        helperText={errors.guest_email?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ fontSize: 18, color: BRAND.slate }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        label="Phone Number"
                        placeholder="+91 9876543210"
                        fullWidth
                        {...register("guest_phone")}
                        error={!!errors.guest_phone}
                        helperText={errors.guest_phone?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon sx={{ fontSize: 18, color: BRAND.slate }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>
                  </Paper>
                </motion.div>
              )}

              {/* Step 2: Event Details */}
              {activeStep === 1 && (
                <motion.div {...fadeUp(0.08)}>
                  <Paper sx={{ p: { xs: 3, sm: 4 }, borderRadius: 4, border: "1px solid #E2E8F0" }}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                      <EventIcon sx={{ color: BRAND.orange }} />
                      <Typography variant="h6" fontWeight={700}>Event Details</Typography>
                    </Box>
                    <Stack spacing={3}>
                      <Controller
                        name="event_type"
                        control={control}
                        render={({ field }) => (
                          <FormControl fullWidth error={!!errors.event_type}>
                            <InputLabel>Event Type *</InputLabel>
                            <Select {...field} label="Event Type *">
                              {EVENT_TYPES.map((et) => (
                                <MenuItem key={et.value} value={et.value}>{et.label}</MenuItem>
                              ))}
                            </Select>
                            {errors.event_type && (
                              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                                {errors.event_type.message}
                              </Typography>
                            )}
                          </FormControl>
                        )}
                      />

                      <TextField
                        label="Event Date"
                        type="date"
                        fullWidth
                        {...register("event_date")}
                        error={!!errors.event_date}
                        helperText={errors.event_date?.message}
                        inputProps={{ min: todayStr() }}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EventIcon sx={{ fontSize: 18, color: BRAND.slate }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            label="Start Time"
                            type="time"
                            fullWidth
                            {...register("start_time")}
                            error={!!errors.start_time}
                            helperText={errors.start_time?.message}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccessTimeIcon sx={{ fontSize: 18, color: BRAND.slate }} />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            label="End Time"
                            type="time"
                            fullWidth
                            {...register("end_time")}
                            error={!!errors.end_time}
                            helperText={errors.end_time?.message}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccessTimeIcon sx={{ fontSize: 18, color: BRAND.slate }} />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            label="Number of Guests"
                            type="number"
                            fullWidth
                            {...register("guest_count")}
                            error={!!errors.guest_count}
                            helperText={errors.guest_count?.message}
                            inputProps={{ min: 1 }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PeopleIcon sx={{ fontSize: 18, color: BRAND.slate }} />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            label="Budget (₹)"
                            type="number"
                            fullWidth
                            {...register("budget")}
                            error={!!errors.budget}
                            helperText={errors.budget?.message}
                            inputProps={{ min: 1 }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CurrencyRupeeIcon sx={{ fontSize: 18, color: BRAND.slate }} />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Stack>
                  </Paper>
                </motion.div>
              )}

              {/* Step 3: Location & Requirements */}
              {activeStep === 2 && (
                <motion.div {...fadeUp(0.08)}>
                  <Paper sx={{ p: { xs: 3, sm: 4 }, borderRadius: 4, border: "1px solid #E2E8F0" }}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                      <LocationOnIcon sx={{ color: BRAND.orange }} />
                      <Typography variant="h6" fontWeight={700}>Location & Requirements</Typography>
                    </Box>
                    <Stack spacing={3}>
                      <TextField
                        label="Venue / Location Name"
                        placeholder="e.g. Taj Banquet Hall"
                        fullWidth
                        {...register("location")}
                        error={!!errors.location}
                        helperText={errors.location?.message}
                      />
                      <TextField
                        label="Address"
                        placeholder="Street address"
                        fullWidth
                        {...register("address")}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                      />
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                              <FormControl fullWidth>
                                <InputLabel>City</InputLabel>
                                <Select {...field} label="City">
                                  <MenuItem value="">Select city</MenuItem>
                                  {INDIAN_CITIES.map((c) => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            label="State"
                            placeholder="e.g. Maharashtra"
                            fullWidth
                            {...register("state")}
                          />
                        </Grid>
                      </Grid>
                      <TextField
                        label="Special Requirements"
                        placeholder="Dietary restrictions, equipment needed, specific requests..."
                        fullWidth
                        multiline
                        rows={4}
                        {...register("special_requirements")}
                        error={!!errors.special_requirements}
                        helperText={errors.special_requirements?.message}
                      />
                    </Stack>
                  </Paper>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <motion.div {...fadeUp(0.12)}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} gap={2}>
                  <Button
                    variant="outlined"
                    onClick={() => activeStep === 0 ? navigate(-1) : setActiveStep((s) => s - 1)}
                    startIcon={<ArrowBackIcon />}
                    disabled={submitting}
                  >
                    {activeStep === 0 ? "Cancel" : "Back"}
                  </Button>

                  {activeStep < STEPS.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={submitting}
                      startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <CheckCircleIcon />}
                      sx={{ px: 4 }}
                    >
                      {submitting ? "Submitting..." : "Submit Booking"}
                    </Button>
                  )}
                </Box>
              </motion.div>
            </form>
          </Grid>

          {/* Summary Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div {...fadeUp(0.1)}>
              <Paper
                sx={{
                  p: 3, borderRadius: 4, border: "1px solid #E2E8F0",
                  position: "sticky", top: 100,
                }}
              >
                <Typography variant="h6" fontWeight={700} mb={3}>Booking Summary</Typography>

                {profileLoading ? (
                  <Stack spacing={1}>
                    <Box display="flex" gap={2} alignItems="center" mb={2}>
                      <Box sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "#E2E8F0" }} />
                      <Box flex={1}>
                        <Box sx={{ height: 16, bgcolor: "#E2E8F0", borderRadius: 1, mb: 1, width: "60%" }} />
                        <Box sx={{ height: 14, bgcolor: "#E2E8F0", borderRadius: 1, width: "40%" }} />
                      </Box>
                    </Box>
                  </Stack>
                ) : profile ? (
                  <>
                    <Box display="flex" alignItems="center" gap={2} mb={3}>
                      <Avatar src={profile.avatar_url || undefined} sx={{ width: 56, height: 56, fontWeight: 800 }}>
                        {profileInitials}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700}>{profileName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {bookingType === "CHEF" ? profile.specialization : profile.city}
                        </Typography>
                        <Box>
                          <Chip
                            label={bookingType}
                            size="small"
                            icon={bookingType === "CHEF" ? <RestaurantMenuIcon style={{ fontSize: 12 }} /> : <HandymanIcon style={{ fontSize: 12 }} />}
                            sx={{ height: 20, fontSize: "0.68rem", fontWeight: 700, bgcolor: alpha(BRAND.orange, 0.1), color: BRAND.orangeDark, mt: 0.5 }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Divider sx={{ mb: 2.5 }} />

                    <Stack spacing={1.5}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Hourly Rate</Typography>
                        <Typography variant="body2" fontWeight={700}>₹{Number(profile.hourly_rate).toLocaleString("en-IN")}/hr</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Location</Typography>
                        <Typography variant="body2" fontWeight={700}>{profile.city}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Status</Typography>
                        <Chip
                          label={profile.is_available ? "Available" : "Busy"}
                          size="small"
                          sx={{
                            height: 20, fontSize: "0.7rem", fontWeight: 700,
                            bgcolor: profile.is_available ? alpha("#10B981", 0.1) : alpha("#F59E0B", 0.1),
                            color: profile.is_available ? "#059669" : "#D97706",
                          }}
                        />
                      </Box>
                    </Stack>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Profile information unavailable.
                  </Typography>
                )}

                <Divider sx={{ my: 2.5 }} />

                {/* Steps Progress */}
                <Typography variant="caption" color="text.secondary" display="block" mb={1.5} fontWeight={600}>
                  STEP {activeStep + 1} OF {STEPS.length}
                </Typography>
                <Stack spacing={1}>
                  {STEPS.map((step, i) => (
                    <Box key={step} display="flex" alignItems="center" gap={1.25}>
                      <Box
                        sx={{
                          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.7rem", fontWeight: 700,
                          bgcolor: i < activeStep ? BRAND.orange : i === activeStep ? alpha(BRAND.orange, 0.15) : "#E2E8F0",
                          color: i < activeStep ? "white" : i === activeStep ? BRAND.orange : BRAND.slate,
                        }}
                      >
                        {i < activeStep ? "✓" : i + 1}
                      </Box>
                      <Typography
                        variant="caption"
                        fontWeight={i === activeStep ? 700 : 400}
                        color={i === activeStep ? "text.primary" : "text.secondary"}
                      >
                        {step}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 2.5 }} />

                <Box sx={{ p: 2, bgcolor: alpha(BRAND.orange, 0.05), borderRadius: 3 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    You will receive a confirmation email once the {typeLabel.toLowerCase()} accepts your request. No payment is required at this stage.
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
