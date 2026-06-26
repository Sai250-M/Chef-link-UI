import React, { useEffect, useRef, useState } from "react";
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  Avatar, Chip, Stack, alpha, Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion, useInView, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedIcon from "@mui/icons-material/Verified";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SecurityIcon from "@mui/icons-material/Security";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CelebrationIcon from "@mui/icons-material/Celebration";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ROUTES } from "../../constants/routes";
import { BRAND, glass, glassDark, gradientText, premiumGradient, darkCardGradient } from "../../theme";

// ─── Motion variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
const stagger = (delay = 0.12) => ({
  visible: { transition: { staggerChildren: delay } },
  hidden: {},
});

// ─── Animated section wrapper ─────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

// ─── 3D Chef Illustration (SVG) ───────────────────────────────────────────────
const ChefIllustration = () => (
  <svg viewBox="0 0 420 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 420, filter: "drop-shadow(0 30px 60px rgba(224,123,57,0.25))" }}>
    {/* Chef hat glow */}
    <ellipse cx="210" cy="110" rx="90" ry="20" fill="rgba(224,123,57,0.15)" />
    {/* Chef hat */}
    <rect x="140" y="60" width="140" height="80" rx="20" fill="#FFFFFF" />
    <rect x="130" y="130" width="160" height="24" rx="6" fill="#F1F5F9" />
    <ellipse cx="210" cy="60" rx="65" ry="55" fill="#FFFFFF" />
    <ellipse cx="210" cy="60" rx="50" ry="42" fill="#F8FAFC" />
    {/* Hat band orange */}
    <rect x="130" y="128" width="160" height="10" rx="5" fill={BRAND.orange} />
    {/* Face */}
    <ellipse cx="210" cy="200" rx="62" ry="68" fill="#FFD5B0" />
    {/* Eyes */}
    <ellipse cx="188" cy="192" rx="8" ry="9" fill="#1E293B" />
    <ellipse cx="232" cy="192" rx="8" ry="9" fill="#1E293B" />
    <circle cx="190" cy="190" r="3" fill="#fff" />
    <circle cx="234" cy="190" r="3" fill="#fff" />
    {/* Smile */}
    <path d="M188 218 Q210 236 232 218" stroke="#C47050" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    {/* Cheeks */}
    <ellipse cx="177" cy="210" rx="12" ry="8" fill="rgba(224,123,57,0.2)" />
    <ellipse cx="243" cy="210" rx="12" ry="8" fill="rgba(224,123,57,0.2)" />
    {/* Moustache */}
    <path d="M194 206 Q202 212 210 206 Q218 212 226 206" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Neck */}
    <rect x="192" y="264" width="36" height="28" rx="6" fill="#FFD5B0" />
    {/* Chef coat body */}
    <path d="M130 295 Q160 280 192 278 L192 440 Q160 445 130 430 Z" fill="#FFFFFF" />
    <path d="M290 295 Q260 280 228 278 L228 440 Q260 445 290 430 Z" fill="#FFFFFF" />
    <rect x="192" y="278" width="36" height="162" fill="#F8FAFC" />
    {/* Coat buttons */}
    <circle cx="210" cy="310" r="5" fill={BRAND.orange} />
    <circle cx="210" cy="340" r="5" fill={BRAND.orange} />
    <circle cx="210" cy="370" r="5" fill={BRAND.orange} />
    {/* Coat collar */}
    <path d="M192 278 L175 310 L192 320 Z" fill="#E2E8F0" />
    <path d="M228 278 L245 310 L228 320 Z" fill="#E2E8F0" />
    {/* Left arm holding pan */}
    <path d="M130 305 Q90 330 75 370" stroke="#FFD5B0" strokeWidth="36" strokeLinecap="round" fill="none" />
    <path d="M130 305 Q90 330 75 370" stroke="#FFFFFF" strokeWidth="28" strokeLinecap="round" fill="none" />
    {/* Right arm raised */}
    <path d="M290 305 Q340 290 360 255" stroke="#FFD5B0" strokeWidth="36" strokeLinecap="round" fill="none" />
    <path d="M290 305 Q340 290 360 255" stroke="#FFFFFF" strokeWidth="28" strokeLinecap="round" fill="none" />
    {/* Frying pan */}
    <ellipse cx="68" cy="380" rx="42" ry="16" fill="#334155" />
    <ellipse cx="68" cy="375" rx="42" ry="16" fill="#475569" />
    <rect x="26" y="370" width="14" height="6" rx="3" fill="#1E293B" />
    {/* Food in pan */}
    <circle cx="55" cy="368" r="8" fill="#FDE68A" />
    <circle cx="75" cy="365" r="6" fill="#FCA5A5" />
    <circle cx="65" cy="372" r="5" fill="#6EE7B7" />
    {/* Spatula in right hand */}
    <rect x="353" y="225" width="10" height="60" rx="5" fill="#94A3B8" transform="rotate(-25 353 225)" />
    <rect x="347" y="218" width="20" height="28" rx="4" fill="#64748B" transform="rotate(-25 347 218)" />
    {/* Steam from pan */}
    <path d="M50 355 Q55 340 50 325" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M65 350 Q70 332 65 315" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M80 355 Q85 338 80 322" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Stars / sparkles around */}
    <path d="M350 150 L354 162 L366 162 L357 170 L360 182 L350 175 L340 182 L343 170 L334 162 L346 162 Z" fill={BRAND.gold} opacity="0.8" />
    <path d="M58 120 L61 129 L70 129 L63 135 L65 144 L58 139 L51 144 L53 135 L46 129 L55 129 Z" fill={BRAND.orangeLight} opacity="0.7" />
    <circle cx="385" cy="220" r="6" fill={BRAND.gold} opacity="0.6" />
    <circle cx="30" cy="260" r="4" fill={BRAND.orange} opacity="0.5" />
  </svg>
);

// ─── Floating Card ─────────────────────────────────────────────────────────────
const FloatingCard = ({ children, sx, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    style={{ position: "absolute", ...sx }}
  >
    <Paper
      sx={{
        ...glassDark(0.85),
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 3,
        p: 1.5,
        minWidth: 180,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      {children}
    </Paper>
  </motion.div>
);

// ─── Stat counter card ─────────────────────────────────────────────────────────
const StatCounter = ({ value, suffix, label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(motionVal, value, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => {
        if (Number.isInteger(value)) {
          setDisplay(Math.round(v).toLocaleString());
        } else {
          setDisplay(v.toFixed(1));
        }
      },
    });
    return ctrl.stop;
  }, [inView, value, motionVal]);

  return (
    <Box ref={ref} textAlign="center">
      <Typography variant="h2" sx={{ ...gradientText, fontWeight: 900, lineHeight: 1 }}>
        {display}{suffix}
      </Typography>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mt: 0.75, fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  );
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 10000, suffix: "+", label: "Registered Chefs" },
  { value: 5000, suffix: "+", label: "Restaurants" },
  { value: 50000, suffix: "+", label: "Job Matches" },
  { value: 4.9, suffix: "★", label: "Average Rating" },
];

const ROLES = [
  {
    icon: <RestaurantMenuIcon sx={{ fontSize: 36 }} />,
    title: "Professional Chefs",
    color: BRAND.orange,
    gradient: "linear-gradient(135deg, #E07B39 0%, #B8611F 100%)",
    desc: "Showcase your culinary expertise, upload certificates, and connect with top restaurants and event organizers.",
    cta: "Join as Chef",
    to: `${ROUTES.REGISTER}?role=chef`,
    features: ["Portfolio & Certificates", "Direct Event Bookings", "Hourly Rate Control"],
  },
  {
    icon: <PeopleAltIcon sx={{ fontSize: 36 }} />,
    title: "Kitchen Helpers",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    desc: "Build your skills profile, list your experience, and get matched with restaurants looking for dedicated support.",
    cta: "Join as Helper",
    to: `${ROUTES.REGISTER}?role=helper`,
    features: ["Flexible Schedules", "Skill-based Matching", "Fast Applications"],
  },
  {
    icon: <StorefrontIcon sx={{ fontSize: 36 }} />,
    title: "Restaurants",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    desc: "Post jobs, search curated talent, shortlist candidates, and manage your entire hiring pipeline end-to-end.",
    cta: "Start Hiring",
    to: `${ROUTES.REGISTER}?role=restaurant`,
    features: ["Job Posting & Management", "Candidate Shortlisting", "Applicant Analytics"],
  },
  {
    icon: <CelebrationIcon sx={{ fontSize: 36 }} />,
    title: "Event Organizers",
    color: BRAND.gold,
    gradient: `linear-gradient(135deg, ${BRAND.gold} 0%, ${BRAND.goldDark} 100%)`,
    desc: "Hire top private chefs for weddings, parties, and catering events. Airbnb-style instant booking.",
    cta: "Book a Chef",
    to: ROUTES.EVENT_BOOKING || "/event-booking",
    features: ["Instant Booking Calendar", "Hourly Event Pricing", "Verified Chef Profiles"],
  },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Create Your Profile", desc: "Sign up in minutes. Add your experience, skills, certifications, cuisine specialties, and availability.", icon: "👤" },
  { num: "02", title: "Post Skills or Job", desc: "Chefs upload portfolios and set rates. Restaurants post jobs with requirements, location, and pay details.", icon: "📋" },
  { num: "03", title: "Smart Match & Connect", desc: "Our algorithm connects the right talent with the right opportunity. Browse, filter, and shortlist instantly.", icon: "🔗" },
  { num: "04", title: "Get Hired & Grow", desc: "Apply, accept bookings, schedule interviews, and build your culinary career or dream team.", icon: "🚀" },
];

const FEATURED_CHEFS = [
  { name: "Arjun Kapoor", role: "Executive Chef", cuisine: "French & Continental", rating: 4.9, reviews: 127, exp: "12 yrs", rate: "₹2,500/hr", avatar: "AK", specialty: "Michelin-trained" },
  { name: "Priya Nair", role: "Head Chef", cuisine: "South Indian & Pan-Asian", rating: 4.8, reviews: 98, exp: "8 yrs", rate: "₹1,800/hr", avatar: "PN", specialty: "Award-winning" },
  { name: "Ravi Sharma", role: "Pastry Chef", cuisine: "Patisserie & Desserts", rating: 5.0, reviews: 204, exp: "15 yrs", rate: "₹3,200/hr", avatar: "RS", specialty: "Celebrity events" },
];

const TESTIMONIALS = [
  { name: "Meera Krishnan", role: "Executive Chef", place: "The Spice Garden, Bengaluru", text: "ChefLink completely changed how I find work. Three premium restaurant positions in my first month. The platform understands hospitality professionals.", avatar: "MK", rating: 5 },
  { name: "Kabir Malhotra", role: "Restaurant Owner", place: "Malhotra's, Mumbai", text: "We hired an outstanding head chef through ChefLink in under a week. The caliber of candidates is genuinely impressive. Worth every rupee.", avatar: "KM", rating: 5 },
  { name: "Sunita Reddy", role: "Wedding Planner", place: "Grand Events, Hyderabad", text: "Booking private chefs for our luxury weddings has never been easier. The Airbnb-style calendar and verified profiles give clients complete confidence.", avatar: "SR", rating: 5 },
];

const FEATURES_GRID = [
  { icon: <FlashOnIcon />, title: "Instant Matching", desc: "AI-powered matching connects chefs with relevant jobs in real-time. Zero friction, maximum precision.", color: BRAND.orange },
  { icon: <VerifiedIcon />, title: "Verified Talent", desc: "Every profile is backed by verified certifications, work history, and authentic reviews from employers.", color: "#10B981" },
  { icon: <SecurityIcon />, title: "Secure Payments", desc: "Enterprise-grade payment infrastructure with escrow, instant payouts, and full transaction history.", color: "#3B82F6" },
  { icon: <SearchIcon />, title: "Advanced Search", desc: "Filter by cuisine, location, experience, salary, availability, and rating with live preview.", color: BRAND.gold },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export const HomePage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <Box>
      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <Box
        ref={heroRef}
        sx={{
          background: `linear-gradient(160deg, #080F1D 0%, #0F172A 40%, #1A1F35 70%, #0F172A 100%)`,
          color: "white",
          pt: { xs: 10, md: 13 },
          pb: { xs: 10, md: 14 },
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: "auto", md: "92vh" },
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Background orbs */}
        <Box sx={{ position: "absolute", top: "10%", right: "8%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(224,123,57,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", top: "40%", left: "40%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,197,66,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        {/* Animated grid background */}
        <Box
          sx={{
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, width: "100%" }}>
          <Grid container spacing={{ xs: 6, md: 4 }} alignItems="center">
            {/* Left: Text */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div variants={stagger(0.1)} initial="hidden" animate="visible">
                <motion.div variants={fadeUp}>
                  <Chip
                    label="🍴 India's #1 Culinary Talent Platform"
                    sx={{
                      ...glass(0.08),
                      color: BRAND.orangeLight,
                      fontWeight: 700,
                      mb: 3,
                      fontSize: "0.8125rem",
                      border: `1px solid ${alpha(BRAND.orange, 0.3)}`,
                      px: 0.5,
                    }}
                  />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Typography
                    variant="h1"
                    sx={{
                      color: "white",
                      mb: 2,
                      lineHeight: 1.08,
                      "& .gradient": gradientText,
                    }}
                  >
                    Find Top Chefs.{" "}
                    <Box component="span" className="gradient">Hire Instantly.</Box>
                  </Typography>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Typography
                    variant="body1"
                    sx={{ color: "rgba(255,255,255,0.65)", fontSize: "1.125rem", mb: 4.5, maxWidth: 520, lineHeight: 1.8 }}
                  >
                    Connect restaurants, professional chefs, kitchen helpers, and event organizers on one premium platform. Built for the hospitality industry.
                  </Typography>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={7}>
                    <Button
                      component={RouterLink}
                      to={ROUTES.BROWSE_JOBS}
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ py: 1.875, px: 4, fontSize: "1.0625rem" }}
                    >
                      Find Jobs
                    </Button>
                    <Button
                      component={RouterLink}
                      to={ROUTES.BROWSE_CHEFS}
                      variant="outlined"
                      size="large"
                      sx={{
                        py: 1.875, px: 4, fontSize: "1.0625rem",
                        borderColor: "rgba(255,255,255,0.25)",
                        color: "white",
                        "&:hover": { borderColor: "rgba(255,255,255,0.6)", bgcolor: "rgba(255,255,255,0.07)" },
                      }}
                    >
                      Hire a Chef
                    </Button>
                  </Stack>
                </motion.div>

                {/* Trust stats */}
                <motion.div variants={fadeUp}>
                  <Grid container spacing={3}>
                    {STATS.map((s) => (
                      <Grid key={s.label} size={{ xs: 6, sm: 3 }}>
                        <StatCounter {...s} />
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Right: Illustration + floating cards */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ position: "relative", display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                style={{ position: "relative", width: "100%", maxWidth: 480 }}
              >
                <ChefIllustration />

                {/* Floating job card */}
                <FloatingCard sx={{ top: 60, left: -40 }} delay={0}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ width: 38, height: 38, bgcolor: alpha(BRAND.orange, 0.2), color: BRAND.orange, fontSize: "1.25rem" }}>👨‍🍳</Avatar>
                    <Box>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", display: "block" }}>New Application</Typography>
                      <Typography variant="subtitle2" sx={{ color: "white", fontWeight: 700 }}>Head Chef · Mumbai</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.75} mt={1}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#10B981" }} />
                    <Typography variant="caption" sx={{ color: "#10B981", fontWeight: 600 }}>₹80,000 / month</Typography>
                  </Box>
                </FloatingCard>

                {/* Floating rating card */}
                <FloatingCard sx={{ bottom: 100, right: -40 }} delay={0.8}>
                  <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                    {[1,2,3,4,5].map(i => <StarIcon key={i} sx={{ fontSize: 14, color: BRAND.gold }} />)}
                  </Box>
                  <Typography variant="caption" sx={{ color: "white", fontWeight: 700, display: "block" }}>Arjun K. just got hired!</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>The Leela, New Delhi</Typography>
                </FloatingCard>

                {/* Floating booking card */}
                <FloatingCard sx={{ bottom: 220, left: -50 }} delay={1.4}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Box sx={{ width: 36, height: 36, borderRadius: 2, background: premiumGradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🎉</Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", display: "block" }}>Event Booking</Typography>
                      <Typography variant="subtitle2" sx={{ color: "white", fontWeight: 700 }}>Wedding · 200 guests</Typography>
                    </Box>
                  </Box>
                </FloatingCard>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ═══ ROLE CARDS ══════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: BRAND.surface, py: { xs: 9, md: 13 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box textAlign="center" mb={7}>
              <Typography variant="overline" sx={{ color: BRAND.orange, display: "block", mb: 1 }}>Who It's For</Typography>
              <Typography variant="h2" fontWeight={800} mb={2}>Built for every role in the kitchen</Typography>
              <Typography variant="body1" color="text.secondary" maxWidth={520} mx="auto">
                Whether you're a seasoned chef, a new helper, a growing restaurant, or an event planner — ChefLink has you covered.
              </Typography>
            </Box>
          </Reveal>

          <Grid container spacing={3}>
            {ROLES.map((role, i) => (
              <Grid key={role.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Reveal delay={i * 0.1}>
                  <Card
                    sx={{
                      height: "100%",
                      background: darkCardGradient,
                      border: `1px solid rgba(255,255,255,0.07)`,
                      "&:hover": {
                        boxShadow: `0 20px 60px ${alpha(role.color, 0.25)}`,
                        transform: "translateY(-6px)",
                        border: `1px solid ${alpha(role.color, 0.3)}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3.5, height: "100%", display: "flex", flexDirection: "column" }}>
                      <Box
                        sx={{
                          width: 64, height: 64, borderRadius: 3,
                          background: role.gradient,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "white", mb: 2.5,
                          boxShadow: `0 8px 20px ${alpha(role.color, 0.35)}`,
                        }}
                      >
                        {role.icon}
                      </Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: "white", mb: 1.25 }}>{role.title}</Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.75, mb: 2.5, flex: 1 }}>{role.desc}</Typography>
                      <Stack spacing={0.75} mb={3}>
                        {role.features.map((f) => (
                          <Box key={f} display="flex" alignItems="center" gap={1}>
                            <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: role.gradient, flexShrink: 0 }} />
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{f}</Typography>
                          </Box>
                        ))}
                      </Stack>
                      <Button
                        component={RouterLink}
                        to={role.to}
                        variant="outlined"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          borderColor: alpha(role.color, 0.5),
                          color: role.color,
                          "&:hover": { bgcolor: alpha(role.color, 0.1), borderColor: role.color },
                          mt: "auto",
                        }}
                      >
                        {role.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ HOW IT WORKS ════════════════════════════════════════════════════ */}
      <Box
        sx={{
          background: `linear-gradient(160deg, #0F172A 0%, #1A1F35 50%, #0F172A 100%)`,
          py: { xs: 9, md: 14 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(224,123,57,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <Box textAlign="center" mb={9}>
              <Typography variant="overline" sx={{ color: BRAND.orange, display: "block", mb: 1 }}>How It Works</Typography>
              <Typography variant="h2" fontWeight={800} sx={{ color: "white", mb: 2 }}>Four steps to your next hire</Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.55)", maxWidth: 480, mx: "auto" }}>
                Simple, transparent, fast. We've designed ChefLink to get out of the way and let great talent meet great opportunity.
              </Typography>
            </Box>
          </Reveal>

          <Grid container spacing={3}>
            {HOW_IT_WORKS.map((step, i) => (
              <Grid key={step.num} size={{ xs: 12, sm: 6, md: 3 }}>
                <Reveal delay={i * 0.12}>
                  <Box sx={{ position: "relative" }}>
                    {/* Connector line */}
                    {i < HOW_IT_WORKS.length - 1 && (
                      <Box sx={{
                        display: { xs: "none", md: "block" },
                        position: "absolute",
                        top: 36, left: "60%", width: "80%", height: 2,
                        background: `linear-gradient(90deg, ${alpha(BRAND.orange, 0.4)} 0%, transparent 100%)`,
                        zIndex: 0,
                      }} />
                    )}
                    <Box
                      sx={{
                        ...glassDark(0.6),
                        borderRadius: 4,
                        p: 3.5,
                        textAlign: "center",
                        border: `1px solid rgba(255,255,255,0.07)`,
                        position: "relative",
                        zIndex: 1,
                        "&:hover": { border: `1px solid ${alpha(BRAND.orange, 0.25)}`, boxShadow: `0 12px 40px rgba(224,123,57,0.12)` },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Box sx={{ fontSize: "2.5rem", mb: 2 }}>{step.icon}</Box>
                      <Box
                        sx={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          width: 36, height: 36, borderRadius: "50%",
                          background: premiumGradient,
                          color: "white", fontWeight: 800, fontSize: "0.875rem",
                          mb: 2, boxShadow: "0 4px 14px rgba(224,123,57,0.4)",
                        }}
                      >
                        {step.num.split("0")[1]}
                      </Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: "white", mb: 1.25 }}>{step.title}</Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{step.desc}</Typography>
                    </Box>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ FEATURED CHEFS ══════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: BRAND.surface, py: { xs: 9, md: 13 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box display="flex" alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={6}>
              <Box>
                <Typography variant="overline" sx={{ color: BRAND.orange, display: "block", mb: 1 }}>Top Talent</Typography>
                <Typography variant="h2" fontWeight={800}>Featured Chefs</Typography>
              </Box>
              <Button component={RouterLink} to={ROUTES.BROWSE_CHEFS} variant="outlined" endIcon={<ArrowForwardIcon />}>
                View All Chefs
              </Button>
            </Box>
          </Reveal>

          <Grid container spacing={3}>
            {FEATURED_CHEFS.map((chef, i) => (
              <Grid key={chef.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal delay={i * 0.1}>
                  <Card sx={{ p: 0.5 }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" alignItems="flex-start" gap={2} mb={2.5}>
                        <Avatar sx={{ width: 60, height: 60, fontSize: "1.2rem", fontWeight: 800 }}>{chef.avatar}</Avatar>
                        <Box flex={1} minWidth={0}>
                          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                            <Typography variant="subtitle1" fontWeight={700} noWrap>{chef.name}</Typography>
                            <VerifiedIcon sx={{ fontSize: 16, color: BRAND.orange }} />
                          </Box>
                          <Typography variant="body2" color="text.secondary">{chef.role}</Typography>
                          <Chip label={chef.specialty} size="small" sx={{ mt: 0.5, height: 22, fontSize: "0.7rem", fontWeight: 700, bgcolor: alpha(BRAND.orange, 0.1), color: BRAND.orangeDark }} />
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center" gap={0.5} mb={2}>
                        <StarIcon sx={{ fontSize: 16, color: BRAND.gold }} />
                        <Typography variant="body2" fontWeight={700}>{chef.rating}</Typography>
                        <Typography variant="caption" color="text.secondary">({chef.reviews} reviews)</Typography>
                      </Box>

                      <Box display="flex" gap={1} flexWrap="wrap" mb={2.5}>
                        <Chip icon={<RestaurantMenuIcon sx={{ fontSize: "14px !important" }} />} label={chef.cuisine} size="small" variant="outlined" sx={{ fontSize: "0.75rem" }} />
                        <Chip label={`${chef.exp} exp`} size="small" variant="outlined" sx={{ fontSize: "0.75rem" }} />
                      </Box>

                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={800} sx={{ color: BRAND.orange }}>{chef.rate}</Typography>
                        <Button variant="contained" size="small" sx={{ fontSize: "0.8rem" }}>Hire Now</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ EVENT BOOKING PREVIEW ═══════════════════════════════════════════ */}
      <Box
        sx={{
          background: `linear-gradient(160deg, #080F1D 0%, #0F172A 100%)`,
          py: { xs: 9, md: 14 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "absolute", top: 0, right: 0, width: 450, height: 450, background: "radial-gradient(circle, rgba(244,197,66,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal>
                <Typography variant="overline" sx={{ color: BRAND.gold, display: "block", mb: 1 }}>Event Chef Booking</Typography>
                <Typography variant="h2" fontWeight={800} sx={{ color: "white", mb: 2.5 }}>
                  Book a Private Chef for Your Next Event
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", mb: 4, lineHeight: 1.85 }}>
                  Airbnb-style booking experience. Select a verified chef, choose your event type, pick a date, and pay securely — all in under 5 minutes.
                </Typography>
                <Stack spacing={2} mb={4}>
                  {["Weddings & Private Parties", "Corporate Catering Events", "Birthday & Anniversary Dinners", "Pop-up Restaurant Experiences"].map((item) => (
                    <Box key={item} display="flex" alignItems="center" gap={2}>
                      <Box sx={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${BRAND.gold} 0%, ${BRAND.goldDark} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Typography sx={{ fontSize: "0.75rem" }}>✓</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)" }}>{item}</Typography>
                    </Box>
                  ))}
                </Stack>
                <Button
                  component={RouterLink}
                  to={ROUTES.EVENT_BOOKING || "/event-booking"}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ background: `linear-gradient(135deg, ${BRAND.gold} 0%, ${BRAND.goldDark} 100%)`, color: BRAND.navy, "&:hover": { boxShadow: `0 12px 32px rgba(244,197,66,0.4)` } }}
                >
                  Book a Chef Now
                </Button>
              </Reveal>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal delay={0.15}>
                <Paper
                  sx={{
                    ...glassDark(0.7),
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 5,
                    p: 3.5,
                    boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 700, mb: 2.5 }}>Book Your Chef</Typography>

                  <Stack spacing={2} mb={3}>
                    {[
                      { icon: <RestaurantMenuIcon />, label: "Event Type", value: "Wedding Reception · 150 guests" },
                      { icon: <LocationOnIcon />, label: "Location", value: "The Oberoi Grand, Mumbai" },
                      { icon: <AccessTimeIcon />, label: "Date & Hours", value: "Dec 28, 2025 · 6 hours" },
                      { icon: <AttachMoneyIcon />, label: "Total Price", value: "₹18,000 · Chef Arjun K.", highlight: true },
                    ].map((item) => (
                      <Box
                        key={item.label}
                        sx={{
                          display: "flex", alignItems: "center", gap: 2,
                          p: 2, borderRadius: 3,
                          background: item.highlight ? alpha(BRAND.gold, 0.1) : "rgba(255,255,255,0.04)",
                          border: item.highlight ? `1px solid ${alpha(BRAND.gold, 0.3)}` : "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <Box sx={{ color: item.highlight ? BRAND.gold : "rgba(255,255,255,0.4)", display: "flex" }}>{item.icon}</Box>
                        <Box>
                          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", display: "block" }}>{item.label}</Typography>
                          <Typography variant="body2" sx={{ color: item.highlight ? BRAND.gold : "white", fontWeight: item.highlight ? 700 : 500 }}>{item.value}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ py: 1.5, background: premiumGradient, fontSize: "1rem", fontWeight: 700 }}
                  >
                    Confirm Booking
                  </Button>
                </Paper>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ═══ FEATURES ════════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: BRAND.surface, py: { xs: 9, md: 13 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box textAlign="center" mb={7}>
              <Typography variant="overline" sx={{ color: BRAND.orange, display: "block", mb: 1 }}>Why ChefLink</Typography>
              <Typography variant="h2" fontWeight={800} mb={2}>The smarter way to hire in hospitality</Typography>
              <Typography variant="body1" color="text.secondary" maxWidth={480} mx="auto">
                Enterprise-grade features for the culinary industry. Purpose-built for how hospitality professionals actually work.
              </Typography>
            </Box>
          </Reveal>

          <Grid container spacing={3}>
            {FEATURES_GRID.map((feature, i) => (
              <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Reveal delay={i * 0.1}>
                  <Box
                    sx={{
                      p: 3.5,
                      borderRadius: 4,
                      background: "white",
                      border: "1px solid #E2E8F0",
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: `0 16px 48px ${alpha(feature.color, 0.15)}`,
                        borderColor: alpha(feature.color, 0.3),
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 52, height: 52, borderRadius: 3,
                        bgcolor: alpha(feature.color, 0.1),
                        color: feature.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        mb: 2.5, "& svg": { fontSize: 26 },
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={700} mb={1.25}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.75}>{feature.desc}</Typography>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════════════════ */}
      <Box
        sx={{
          background: `linear-gradient(160deg, #0F172A 0%, #1A1F35 100%)`,
          py: { xs: 9, md: 13 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 300, background: "radial-gradient(ellipse, rgba(224,123,57,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <Box textAlign="center" mb={7}>
              <Typography variant="overline" sx={{ color: BRAND.orange, display: "block", mb: 1 }}>Testimonials</Typography>
              <Typography variant="h2" fontWeight={800} sx={{ color: "white" }}>Loved by culinary professionals</Typography>
            </Box>
          </Reveal>

          <Grid container spacing={3}>
            {TESTIMONIALS.map((t, i) => (
              <Grid key={t.name} size={{ xs: 12, md: 4 }}>
                <Reveal delay={i * 0.1}>
                  <Box
                    sx={{
                      ...glassDark(0.55),
                      borderRadius: 4,
                      p: 3.5,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      "&:hover": { border: `1px solid ${alpha(BRAND.orange, 0.25)}`, boxShadow: `0 16px 48px rgba(224,123,57,0.1)` },
                    }}
                  >
                    <Box display="flex" gap={0.25} mb={2.5}>
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <StarIcon key={idx} sx={{ fontSize: 18, color: BRAND.gold }} />
                      ))}
                    </Box>
                    <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, mb: 3, flex: 1, fontStyle: "italic" }}>
                      "{t.text}"
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1.75}>
                      <Avatar sx={{ width: 48, height: 48, fontWeight: 700, fontSize: "0.95rem" }}>{t.avatar}</Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ color: "white" }}>{t.name}</Typography>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>{t.role} · {t.place}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ CTA ═════════════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: BRAND.surface, py: { xs: 9, md: 13 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Box
              sx={{
                background: premiumGradient,
                borderRadius: 6,
                p: { xs: 5, md: 8 },
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 30px 80px rgba(224,123,57,0.35)",
              }}
            >
              <Box sx={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
              <Box sx={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
              <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.7)", display: "block", mb: 1.5 }}>
                Join 10,000+ Professionals
              </Typography>
              <Typography variant="h2" sx={{ color: "white", fontWeight: 800, mb: 2.5 }}>
                Start your culinary journey today
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", mb: 5, fontSize: "1.125rem", maxWidth: 480, mx: "auto" }}>
                Create your free profile in minutes and connect with India's most prestigious restaurants and hospitality brands.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                <Button
                  component={RouterLink}
                  to={ROUTES.REGISTER}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    py: 1.875, px: 5,
                    bgcolor: "white", color: BRAND.orangeDark,
                    fontWeight: 700,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.92)", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" },
                    background: "white",
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  component={RouterLink}
                  to={ROUTES.BROWSE_JOBS}
                  variant="outlined"
                  size="large"
                  sx={{
                    py: 1.875, px: 5,
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "white",
                    "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Browse Jobs
                </Button>
              </Stack>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
