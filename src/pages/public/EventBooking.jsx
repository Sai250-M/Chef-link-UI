import React, { useState } from "react";
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  Avatar, Chip, Stack, alpha, Paper, Divider, Rating,
  TextField, MenuItem, InputAdornment, Stepper, Step, StepLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { BRAND, glassDark, premiumGradient, darkCardGradient, gradientText } from "../../theme";

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } };

const EVENT_TYPES = [
  "Wedding Reception", "Birthday Party", "Corporate Event",
  "Private Dinner", "Anniversary Celebration", "Cocktail Party",
  "Pop-up Dinner", "Baby Shower", "Holiday Party",
];

const CHEFS = [
  {
    id: 1, name: "Arjun Kapoor", avatar: "AK", specialty: "French & Continental",
    rating: 4.9, reviews: 127, exp: "12 yrs", rate: 2500,
    certifications: ["Cordon Bleu Paris", "FSSAI Certified"],
    description: "Michelin-trained executive chef specializing in French and contemporary Continental cuisine. Available for weddings and corporate events.",
    badges: ["Top Rated", "Premium"],
    cuisines: ["French", "Continental", "Italian"],
  },
  {
    id: 2, name: "Priya Nair", avatar: "PN", specialty: "South Indian & Pan-Asian",
    rating: 4.8, reviews: 98, exp: "8 yrs", rate: 1800,
    certifications: ["IHM Mumbai", "WSET Level 2"],
    description: "Award-winning chef with expertise in authentic South Indian and contemporary Pan-Asian fusion. Specializes in large-scale events.",
    badges: ["Award Winner"],
    cuisines: ["South Indian", "Thai", "Japanese"],
  },
  {
    id: 3, name: "Ravi Sharma", avatar: "RS", specialty: "Patisserie & Desserts",
    rating: 5.0, reviews: 204, exp: "15 yrs", rate: 3200,
    certifications: ["Le Cordon Bleu", "ACF Certified"],
    description: "Celebrity pastry chef who has worked with India's most prestigious hotels. Creates extraordinary dessert experiences for special occasions.",
    badges: ["Celebrity Chef", "5-Star"],
    cuisines: ["Patisserie", "Chocolatier", "Wedding Cakes"],
  },
  {
    id: 4, name: "Meera Patel", avatar: "MP", specialty: "Mughlai & North Indian",
    rating: 4.7, reviews: 156, exp: "10 yrs", rate: 2000,
    certifications: ["IHM Delhi", "Taj Hotel Trained"],
    description: "Authentic Mughlai and North Indian specialist who has catered for royalty. Perfect for traditional Indian weddings and festive events.",
    badges: ["Highly Booked"],
    cuisines: ["Mughlai", "Punjabi", "Awadhi"],
  },
];

const BOOKING_STEPS = ["Select Chef", "Event Details", "Review & Pay"];

const ChefCard = ({ chef, selected, onSelect }) => (
  <Card
    onClick={() => onSelect(chef)}
    sx={{
      cursor: "pointer",
      border: selected ? `2px solid ${BRAND.orange}` : "1px solid #E2E8F0",
      boxShadow: selected ? `0 12px 40px ${alpha(BRAND.orange, 0.2)}` : undefined,
      transform: selected ? "scale(1.02)" : "scale(1)",
      transition: "all 0.25s ease",
      "&:hover": { transform: "scale(1.02)", boxShadow: `0 12px 40px ${alpha(BRAND.orange, 0.15)}` },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box display="flex" gap={2} alignItems="flex-start" mb={2}>
        <Avatar sx={{ width: 56, height: 56, fontSize: "1.1rem", fontWeight: 800 }}>{chef.avatar}</Avatar>
        <Box flex={1} minWidth={0}>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography variant="subtitle1" fontWeight={700}>{chef.name}</Typography>
            <VerifiedIcon sx={{ fontSize: 16, color: BRAND.orange }} />
            {selected && <CheckCircleIcon sx={{ fontSize: 18, color: BRAND.orange }} />}
          </Box>
          <Typography variant="body2" color="text.secondary">{chef.specialty}</Typography>
          <Box display="flex" gap={0.75} mt={0.75} flexWrap="wrap">
            {chef.badges.map((b) => (
              <Chip key={b} label={b} size="small" sx={{ height: 20, fontSize: "0.68rem", fontWeight: 700, bgcolor: alpha(BRAND.orange, 0.1), color: BRAND.orangeDark }} />
            ))}
          </Box>
        </Box>
        <Box textAlign="right">
          <Typography variant="h6" fontWeight={800} sx={{ color: BRAND.orange }}>₹{chef.rate.toLocaleString()}</Typography>
          <Typography variant="caption" color="text.secondary">/hour</Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={0.5} mb={1.5}>
        <StarIcon sx={{ fontSize: 14, color: "#F59E0B" }} />
        <Typography variant="body2" fontWeight={700}>{chef.rating}</Typography>
        <Typography variant="caption" color="text.secondary">({chef.reviews} reviews) · {chef.exp} exp</Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.65 }}>{chef.description}</Typography>

      <Box display="flex" gap={0.75} flexWrap="wrap">
        {chef.cuisines.map((c) => (
          <Chip key={c} label={c} size="small" variant="outlined" sx={{ fontSize: "0.73rem", height: 24 }} />
        ))}
      </Box>
    </CardContent>
  </Card>
);

export const EventBooking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedChef, setSelectedChef] = useState(null);
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const totalCost = selectedChef && hours ? selectedChef.rate * parseInt(hours || 0) : 0;

  const handleBook = () => setConfirmed(true);

  if (confirmed) {
    return (
      <Box sx={{ background: `linear-gradient(160deg, #080F1D 0%, #0F172A 100%)`, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container maxWidth="sm">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <Paper sx={{ ...glassDark(0.7), borderRadius: 6, p: 6, textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
              <motion.div animate={{ scale: [0.5, 1.2, 1] }} transition={{ duration: 0.8 }}>
                <CheckCircleIcon sx={{ fontSize: 80, color: "#10B981", mb: 2 }} />
              </motion.div>
              <Typography variant="h4" fontWeight={800} sx={{ color: "white", mb: 1.5 }}>Booking Confirmed!</Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.65)", mb: 3.5 }}>
                Your event booking with <strong style={{ color: BRAND.orangeLight }}>{selectedChef?.name}</strong> has been confirmed.
                You'll receive a confirmation email shortly.
              </Typography>
              <Box sx={{ ...glassDark(0.5), borderRadius: 3, p: 2.5, mb: 3.5, border: "1px solid rgba(255,255,255,0.08)" }}>
                <Typography variant="subtitle2" sx={{ color: BRAND.gold, fontWeight: 700, mb: 1.5 }}>Booking Summary</Typography>
                {[
                  { label: "Chef", value: selectedChef?.name },
                  { label: "Event", value: eventType || "Private Dinner" },
                  { label: "Date", value: date || "To be confirmed" },
                  { label: "Duration", value: `${hours} hours` },
                  { label: "Total", value: `₹${totalCost.toLocaleString()}`, highlight: true },
                ].map((item) => (
                  <Box key={item.label} display="flex" justifyContent="space-between" mb={0.75}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>{item.label}</Typography>
                    <Typography variant="body2" sx={{ color: item.highlight ? BRAND.gold : "rgba(255,255,255,0.8)", fontWeight: item.highlight ? 700 : 500 }}>{item.value}</Typography>
                  </Box>
                ))}
              </Box>
              <Button variant="contained" fullWidth size="large" onClick={() => setConfirmed(false)} sx={{ py: 1.5 }}>
                Book Another Event
              </Button>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ background: `linear-gradient(160deg, #080F1D 0%, #0F172A 60%, #1A1F35 100%)`, minHeight: "100vh", py: 6 }}>
      {/* Header */}
      <Box sx={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,197,66,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box textAlign="center" mb={6}>
            <Chip label="Event Chef Booking" sx={{ ...glassDark(0.5), color: BRAND.gold, border: `1px solid ${alpha(BRAND.gold, 0.3)}`, fontWeight: 700, mb: 2, fontSize: "0.8125rem" }} />
            <Typography variant="h2" fontWeight={800} sx={{ color: "white", mb: 1.5 }}>
              Book Your <Box component="span" sx={gradientText}>Perfect Chef</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 500, mx: "auto" }}>
              Airbnb-style booking. Select, customize, and confirm your private chef in minutes.
            </Typography>
          </Box>
        </motion.div>

        {/* Stepper */}
        <Box mb={5}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {BOOKING_STEPS.map((label, i) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      "& .MuiStepIcon-root": { color: i <= activeStep ? BRAND.orange : "rgba(255,255,255,0.2)", fontSize: 32 },
                      "& .MuiStepIcon-text": { fill: "white", fontWeight: 700 },
                    },
                  }}
                  sx={{ "& .MuiStepLabel-label": { color: i <= activeStep ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)", fontWeight: i === activeStep ? 700 : 500 } }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Step 1: Select Chef */}
            {activeStep === 0 && (
              <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}>
                <Typography variant="h5" fontWeight={700} sx={{ color: "white", mb: 3 }}>Choose Your Chef</Typography>
                <Stack spacing={2.5}>
                  {CHEFS.map((chef, i) => (
                    <motion.div key={chef.id} variants={fadeUp}>
                      <ChefCard chef={chef} selected={selectedChef?.id === chef.id} onSelect={setSelectedChef} />
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            )}

            {/* Step 2: Event Details */}
            {activeStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Paper sx={{ ...glassDark(0.6), borderRadius: 4, p: 4, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Typography variant="h5" fontWeight={700} sx={{ color: "white", mb: 3.5 }}>Event Details</Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        select fullWidth label="Event Type" value={eventType} onChange={(e) => setEventType(e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><CelebrationIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} /></InputAdornment> }}
                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(255,255,255,0.05)", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" }, "& .MuiSelect-icon": { color: "rgba(255,255,255,0.4)" }, "& input, & .MuiSelect-select": { color: "white" } }}
                      >
                        {EVENT_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth label="Number of Guests" type="number" value={guests} onChange={(e) => setGuests(e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><PeopleIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} /></InputAdornment> }}
                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(255,255,255,0.05)", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" }, "& input": { color: "white" } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth label="Event Date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><CalendarMonthIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} /></InputAdornment> }}
                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(255,255,255,0.05)", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" }, "& input": { color: "white", colorScheme: "dark" } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        select fullWidth label="Hours Required" value={hours} onChange={(e) => setHours(e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} /></InputAdornment> }}
                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(255,255,255,0.05)", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" }, "& .MuiSelect-icon": { color: "rgba(255,255,255,0.4)" }, "& .MuiSelect-select": { color: "white" } }}
                      >
                        {[2,3,4,5,6,7,8,10,12].map((h) => <MenuItem key={h} value={String(h)}>{h} hours — ₹{((selectedChef?.rate || 0) * h).toLocaleString()}</MenuItem>)}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth label="Event Location / Venue" value={location} onChange={(e) => setLocation(e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} /></InputAdornment> }}
                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(255,255,255,0.05)", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" }, "& input": { color: "white" } }}
                        placeholder="Hotel name, home address, or venue"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth multiline rows={3} label="Special Requirements or Menu Preferences"
                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(255,255,255,0.05)", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" }, "& textarea": { color: "white" } }}
                        placeholder="Dietary restrictions, preferred menu style, special requests..."
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {activeStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Paper sx={{ ...glassDark(0.6), borderRadius: 4, p: 4, border: "1px solid rgba(255,255,255,0.08)", mb: 3 }}>
                  <Typography variant="h5" fontWeight={700} sx={{ color: "white", mb: 3 }}>Review Your Booking</Typography>
                  <Box display="flex" gap={2} alignItems="center" mb={3} p={2} sx={{ bgcolor: "rgba(255,255,255,0.04)", borderRadius: 3 }}>
                    <Avatar sx={{ width: 52, height: 52, fontWeight: 700 }}>{selectedChef?.avatar}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: "white" }}>{selectedChef?.name}</Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)" }}>{selectedChef?.specialty}</Typography>
                    </Box>
                    <Box ml="auto" textAlign="right">
                      <Typography variant="h6" fontWeight={800} sx={{ color: BRAND.orange }}>₹{selectedChef?.rate?.toLocaleString()}/hr</Typography>
                    </Box>
                  </Box>
                  <Stack spacing={1.5}>
                    {[
                      { label: "Event Type", value: eventType || "Not specified" },
                      { label: "Date", value: date || "Not specified" },
                      { label: "Duration", value: hours ? `${hours} hours` : "Not specified" },
                      { label: "Guests", value: guests || "Not specified" },
                      { label: "Location", value: location || "Not specified" },
                    ].map((item) => (
                      <Box key={item.label} display="flex" justifyContent="space-between" py={1} sx={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.45)" }}>{item.label}</Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{item.value}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>

                <Paper sx={{ ...glassDark(0.6), borderRadius: 4, p: 4, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Typography variant="h6" fontWeight={700} sx={{ color: "white", mb: 2.5 }}>Payment Details</Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)" }}>Chef rate × {hours || 0} hours</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>₹{totalCost.toLocaleString()}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)" }}>Platform fee (5%)</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>₹{Math.round(totalCost * 0.05).toLocaleString()}</Typography>
                  </Box>
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 1.5 }} />
                  <Box display="flex" justifyContent="space-between" mb={3}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: "white" }}>Total</Typography>
                    <Typography variant="h6" fontWeight={800} sx={{ color: BRAND.gold }}>₹{Math.round(totalCost * 1.05).toLocaleString()}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<PaymentIcon />}
                    onClick={handleBook}
                    sx={{ py: 1.75, fontSize: "1.0625rem", fontWeight: 700 }}
                  >
                    Pay & Confirm Booking
                  </Button>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", display: "block", textAlign: "center", mt: 1.5 }}>
                    Secured by Razorpay · 256-bit SSL encryption
                  </Typography>
                </Paper>
              </motion.div>
            )}

            {/* Navigation buttons */}
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button
                variant="outlined"
                onClick={() => setActiveStep((p) => p - 1)}
                disabled={activeStep === 0}
                sx={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", "&:hover": { borderColor: "rgba(255,255,255,0.5)", bgcolor: "rgba(255,255,255,0.05)" } }}
              >
                Back
              </Button>
              {activeStep < 2 && (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => setActiveStep((p) => p + 1)}
                  disabled={activeStep === 0 && !selectedChef}
                  sx={{ px: 4 }}
                >
                  {activeStep === 0 ? "Continue with " + (selectedChef?.name || "a Chef") : "Review Booking"}
                </Button>
              )}
            </Box>
          </Grid>

          {/* Sidebar Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: { md: "sticky" }, top: 24 }}>
              <Paper sx={{ ...glassDark(0.65), borderRadius: 4, p: 3.5, border: "1px solid rgba(255,255,255,0.08)", mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ color: "white", mb: 2 }}>Booking Summary</Typography>

                {selectedChef ? (
                  <Box mb={2} p={2} sx={{ bgcolor: "rgba(255,255,255,0.04)", borderRadius: 2.5 }}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Avatar sx={{ width: 40, height: 40, fontWeight: 700 }}>{selectedChef.avatar}</Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={700} sx={{ color: "white" }}>{selectedChef.name}</Typography>
                        <Typography variant="caption" sx={{ color: BRAND.orange }}>₹{selectedChef.rate.toLocaleString()}/hr</Typography>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box p={2} sx={{ bgcolor: "rgba(255,255,255,0.03)", borderRadius: 2.5, textAlign: "center", mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.35)" }}>No chef selected yet</Typography>
                  </Box>
                )}

                <Stack spacing={1.5}>
                  {[
                    { label: "Event Type", value: eventType || "—", icon: "🎉" },
                    { label: "Date", value: date || "—", icon: "📅" },
                    { label: "Duration", value: hours ? `${hours} hrs` : "—", icon: "⏰" },
                    { label: "Guests", value: guests || "—", icon: "👥" },
                  ].map((item) => (
                    <Box key={item.label} display="flex" alignItems="center" gap={1.5}>
                      <Typography sx={{ fontSize: "1rem", width: 24 }}>{item.icon}</Typography>
                      <Box flex={1}>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)", display: "block" }}>{item.label}</Typography>
                        <Typography variant="body2" sx={{ color: item.value === "—" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.85)", fontWeight: 600 }}>{item.value}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>

                {totalCost > 0 && (
                  <>
                    <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", my: 2 }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)" }}>Estimated Total</Typography>
                      <Typography variant="h6" fontWeight={800} sx={{ color: BRAND.gold }}>₹{Math.round(totalCost * 1.05).toLocaleString()}</Typography>
                    </Box>
                  </>
                )}
              </Paper>

              {/* Trust Badges */}
              <Paper sx={{ ...glassDark(0.5), borderRadius: 4, p: 3, border: "1px solid rgba(255,255,255,0.06)" }}>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", mb: 2 }}>Why ChefLink</Typography>
                {[
                  { icon: "✅", text: "All chefs verified & certified" },
                  { icon: "🔒", text: "Secure escrow payment" },
                  { icon: "⚡", text: "Instant booking confirmation" },
                  { icon: "💬", text: "24/7 support available" },
                ].map((item) => (
                  <Box key={item.text} display="flex" alignItems="center" gap={1.5} mb={1.5}>
                    <Typography sx={{ fontSize: "1rem" }}>{item.icon}</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>{item.text}</Typography>
                  </Box>
                ))}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// For the celebration icon import that was missing
function CelebrationIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M1.5 22.5L8.5 4L20.5 16L2.5 22.5ZM4.5 19L15.5 15.5L8 8L4.5 19Z"/>
    </svg>
  );
}

export default EventBooking;
