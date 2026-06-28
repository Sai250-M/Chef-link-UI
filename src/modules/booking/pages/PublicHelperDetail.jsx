import React, { useState, useEffect } from "react";
import {
  Box, Container, Typography, Grid, Avatar, Chip, Button,
  Paper, Stack, Divider, Breadcrumbs, Link, Skeleton, Alert, alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HandymanIcon from "@mui/icons-material/Handyman";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedIcon from "@mui/icons-material/Verified";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { BRAND } from "../../../theme";
import { ROUTES } from "../../../constants/routes";
import { getPublicHelperById } from "../services/helper.service";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const StatCard = ({ icon, label, value }) => (
  <Paper sx={{ p: 2.5, borderRadius: 3, border: "1px solid #E2E8F0", textAlign: "center" }}>
    <Box sx={{ color: BRAND.orange, mb: 1 }}>{icon}</Box>
    <Typography variant="h5" fontWeight={800} mb={0.25}>{value}</Typography>
    <Typography variant="caption" color="text.secondary">{label}</Typography>
  </Paper>
);

const DetailSkeleton = () => (
  <Container maxWidth="lg" sx={{ py: 6 }}>
    <Skeleton variant="text" width={200} height={20} sx={{ mb: 3 }} />
    <Box display="flex" gap={3} mb={4} flexDirection={{ xs: "column", sm: "row" }} alignItems="flex-start">
      <Skeleton variant="circular" width={100} height={100} />
      <Box flex={1}>
        <Skeleton variant="text" width="50%" height={40} />
        <Skeleton variant="text" width="30%" height={24} />
      </Box>
    </Box>
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Skeleton variant="rounded" height={120} sx={{ mb: 3 }} />
        <Skeleton variant="rounded" height={180} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Skeleton variant="rounded" height={300} />
      </Grid>
    </Grid>
  </Container>
);

export const PublicHelperDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [helper, setHelper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHelper = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getPublicHelperById(id);
        setHelper(res.data.data);
      } catch {
        setError("Helper not found or currently unavailable.");
      } finally {
        setLoading(false);
      }
    };
    fetchHelper();
  }, [id]);

  if (loading) return <DetailSkeleton />;

  if (error || !helper) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert
          severity="error"
          action={
            <Button size="small" onClick={() => navigate(ROUTES.PUBLIC_HELPERS)}>
              Back to Helpers
            </Button>
          }
        >
          {error || "Helper not found"}
        </Alert>
      </Container>
    );
  }

  const fullName = `${helper.first_name} ${helper.last_name}`;
  const initials = `${helper.first_name?.[0] || ""}${helper.last_name?.[0] || ""}`.toUpperCase();
  const location = [helper.city, helper.state, helper.country].filter(Boolean).join(", ");

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Banner */}
      <Box sx={{ background: "linear-gradient(160deg, #0F172A 0%, #1E293B 100%)", pt: { xs: 5, md: 7 }, pb: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <motion.div {...fadeUp(0)}>
            <Breadcrumbs sx={{ mb: 3 }}>
              <Link
                component={RouterLink}
                to={ROUTES.PUBLIC_HELPERS}
                sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: BRAND.orange }, textDecoration: "none" }}
              >
                Helpers
              </Link>
              <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>{fullName}</Typography>
            </Breadcrumbs>
          </motion.div>
          <motion.div {...fadeUp(0.06)}>
            <Box display="flex" alignItems={{ xs: "flex-start", sm: "center" }} gap={3} flexDirection={{ xs: "column", sm: "row" }} flexWrap="wrap">
              <Avatar
                src={helper.avatar_url || undefined}
                sx={{ width: { xs: 80, md: 100 }, height: { xs: 80, md: 100 }, fontSize: "2rem", fontWeight: 800, flexShrink: 0 }}
              >
                {initials}
              </Avatar>
              <Box flex={1}>
                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                  <Typography variant="h3" fontWeight={800} sx={{ color: "white" }}>{fullName}</Typography>
                  <VerifiedIcon sx={{ color: BRAND.orange, fontSize: 26 }} />
                </Box>
                <Box display="flex" alignItems="center" gap={0.75} mt={0.5}>
                  <LocationOnIcon sx={{ fontSize: 15, color: "rgba(255,255,255,0.45)" }} />
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)" }}>{location}</Typography>
                </Box>
              </Box>
              <Chip
                label={helper.is_available ? "Available" : "Busy"}
                sx={{
                  height: 32, fontWeight: 700, fontSize: "0.875rem",
                  bgcolor: helper.is_available ? alpha("#10B981", 0.18) : alpha("#F59E0B", 0.18),
                  color: helper.is_available ? "#6EE7B7" : "#FCD34D",
                }}
              />
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Stats */}
            <motion.div {...fadeUp(0.1)}>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <StatCard icon={<WorkIcon />} label="Years Experience" value={`${helper.years_experience}+`} />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <StatCard icon={<AttachMoneyIcon />} label="Hourly Rate" value={`₹${Number(helper.hourly_rate).toLocaleString("en-IN")}`} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <StatCard icon={<HandymanIcon />} label="Skills" value={helper.skills?.length || 0} />
                </Grid>
              </Grid>
            </motion.div>

            {/* About */}
            {helper.bio && (
              <motion.div {...fadeUp(0.14)}>
                <Paper sx={{ p: 3, mb: 3, borderRadius: 4, border: "1px solid #E2E8F0" }}>
                  <Typography variant="h6" fontWeight={700} mb={2}>About</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>{helper.bio}</Typography>
                </Paper>
              </motion.div>
            )}

            {/* Skills */}
            {helper.skills?.length > 0 && (
              <motion.div {...fadeUp(0.18)}>
                <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #E2E8F0" }}>
                  <Typography variant="h6" fontWeight={700} mb={2}>Skills</Typography>
                  <Stack spacing={1.5}>
                    {helper.skills.map((skill) => (
                      <Box key={skill.id} display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <HandymanIcon sx={{ fontSize: 16, color: BRAND.orange }} />
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600}>{skill.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{skill.category}</Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={skill.proficiency_level}
                          size="small"
                          sx={{ fontSize: "0.7rem", fontWeight: 700, bgcolor: alpha(BRAND.orange, 0.08), color: BRAND.orangeDark }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </motion.div>
            )}
          </Grid>

          {/* Sticky Booking Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div {...fadeUp(0.1)}>
              <Paper
                sx={{
                  p: 3, borderRadius: 4, border: "1px solid #E2E8F0",
                  position: "sticky", top: 100, boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                }}
              >
                <Typography variant="h6" fontWeight={700} mb={0.5}>Book This Helper</Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  No account needed. Submit a request and get a response within 24 hours.
                </Typography>
                <Divider sx={{ mb: 2.5 }} />
                <Stack spacing={1.5} mb={3}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Hourly Rate</Typography>
                    <Typography variant="body2" fontWeight={700}>₹{Number(helper.hourly_rate).toLocaleString("en-IN")}/hr</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Currency</Typography>
                    <Typography variant="body2" fontWeight={700}>{helper.currency || "INR"}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Location</Typography>
                    <Typography variant="body2" fontWeight={700}>{helper.city}</Typography>
                  </Box>
                </Stack>
                <Box display="flex" alignItems="center" gap={1} mb={3} p={2} sx={{ bgcolor: alpha("#10B981", 0.06), borderRadius: 3, border: `1px solid ${alpha("#10B981", 0.18)}` }}>
                  <CalendarMonthIcon sx={{ color: "#059669", fontSize: 20 }} />
                  <Typography variant="body2" color="#059669" fontWeight={600}>
                    {helper.is_available ? "Available for new bookings" : "Busy — request anyway"}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => navigate(ROUTES.PUBLIC_BOOK_HELPER.replace(":id", helper.id))}
                  sx={{ mb: 1.5, py: 1.75 }}
                >
                  Book Helper Now
                </Button>
                <Button variant="outlined" fullWidth onClick={() => navigate(ROUTES.PUBLIC_HELPERS)} startIcon={<ArrowBackIcon />}>
                  Browse Other Helpers
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
