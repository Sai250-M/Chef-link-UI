import React from "react";
import {
  Box, Container, Typography, Button, Paper, Stack,
  Divider, Chip, alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import HandymanIcon from "@mui/icons-material/Handyman";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate, useLocation } from "react-router-dom";
import { BRAND } from "../../../theme";
import { ROUTES } from "../../../constants/routes";

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const formatTime = (timeStr) => {
  if (!timeStr) return null;
  try {
    const [h, m] = timeStr.split(":");
    const d = new Date();
    d.setHours(Number(h), Number(m));
    return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return timeStr;
  }
};

export const BookingSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const booking = state?.booking;

  const referenceId = booking?.id ? booking.id.slice(0, 8).toUpperCase() : null;
  const isChef = booking?.booking_type === "CHEF";

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", display: "flex", alignItems: "center", py: 8 }}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, textAlign: "center", border: "1px solid #E2E8F0" }}>
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 14 }}
            >
              <Box
                sx={{
                  width: 96, height: 96, borderRadius: "50%", mx: "auto", mb: 3,
                  background: `linear-gradient(135deg, ${alpha("#10B981", 0.15)} 0%, ${alpha("#059669", 0.08)} 100%)`,
                  border: `2px solid ${alpha("#10B981", 0.25)}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 52, color: "#10B981" }} />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <Typography variant="h4" fontWeight={800} mb={1}>
                Booking Submitted!
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={booking ? 3 : 4}>
                Your booking request has been submitted successfully.
                The {isChef ? "chef" : "helper"} will review and respond within 24 hours.
              </Typography>
            </motion.div>

            {/* Booking Details */}
            {booking && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ bgcolor: BRAND.surface, borderRadius: 3, p: 3, mb: 3, textAlign: "left" }}>
                  <Typography variant="overline" color="text.secondary" display="block" mb={2} fontWeight={700}>
                    Booking Details
                  </Typography>
                  <Stack spacing={1.75}>
                    {referenceId && (
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">Reference #</Typography>
                        <Chip
                          label={referenceId}
                          size="small"
                          sx={{ fontWeight: 800, fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: 1 }}
                        />
                      </Box>
                    )}
                    {booking.booking_type && (
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">Type</Typography>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          {isChef
                            ? <PeopleIcon sx={{ fontSize: 14, color: BRAND.orange }} />
                            : <HandymanIcon sx={{ fontSize: 14, color: BRAND.orange }} />
                          }
                          <Typography variant="body2" fontWeight={600}>{booking.booking_type}</Typography>
                        </Box>
                      </Box>
                    )}
                    {booking.event_type && (
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">Event</Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {booking.event_type.replace(/_/g, " ")}
                        </Typography>
                      </Box>
                    )}
                    {booking.event_date && (
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                          <Box component="span" display="flex" alignItems="center" gap={0.5}>
                            <CalendarMonthIcon sx={{ fontSize: 14 }} /> Date
                          </Box>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>{formatDate(booking.event_date)}</Typography>
                      </Box>
                    )}
                    {booking.start_time && booking.end_time && (
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                          <Box component="span" display="flex" alignItems="center" gap={0.5}>
                            <AccessTimeIcon sx={{ fontSize: 14 }} /> Time
                          </Box>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {formatTime(booking.start_time)} – {formatTime(booking.end_time)}
                        </Typography>
                      </Box>
                    )}
                    {booking.city && (
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">City</Typography>
                        <Typography variant="body2" fontWeight={600}>{booking.city}</Typography>
                      </Box>
                    )}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">Status</Typography>
                      <Chip label="Pending Review" color="warning" size="small" sx={{ fontWeight: 700 }} />
                    </Box>
                  </Stack>
                </Box>
              </motion.div>
            )}

            {/* Response Time Banner */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.35 }}
            >
              <Box
                sx={{
                  p: 2.5, borderRadius: 3, mb: 4,
                  bgcolor: alpha(BRAND.orange, 0.06),
                  border: `1px solid ${alpha(BRAND.orange, 0.18)}`,
                }}
              >
                <Typography variant="body2" color={BRAND.orangeDark} fontWeight={700} mb={0.25}>
                  Expected response: Within 24 hours
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Check your email inbox for confirmation and further updates.
                </Typography>
              </Box>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.35 }}
            >
              <Stack spacing={1.5}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<HomeIcon />}
                  onClick={() => navigate(ROUTES.HOME)}
                >
                  Return to Home
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<PeopleIcon />}
                  onClick={() => navigate(ROUTES.PUBLIC_CHEFS)}
                >
                  Browse More Chefs
                </Button>
                <Button
                  variant="text"
                  fullWidth
                  startIcon={<HandymanIcon />}
                  onClick={() => navigate(ROUTES.PUBLIC_HELPERS)}
                  sx={{ color: "text.secondary" }}
                >
                  Browse Helpers
                </Button>
              </Stack>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};
