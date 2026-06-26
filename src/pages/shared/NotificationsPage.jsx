import React, { useState } from "react";
import {
  Box, Container, Typography, Chip, Stack, alpha, IconButton,
  Divider, Button, Tooltip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import { BRAND, glassDark, premiumGradient, darkCardGradient } from "../../theme";

const CATEGORIES = ["All", "Jobs", "Applications", "Bookings", "Messages", "Reviews"];

const NOTIFICATIONS = [
  {
    id: 1, category: "Jobs", icon: <WorkIcon />, color: BRAND.orange,
    title: "New Job Match",
    message: "Taj Hotel is looking for an Executive Chef matching your profile in Mumbai.",
    time: "2 minutes ago", unread: true, action: "View Job",
  },
  {
    id: 2, category: "Applications", icon: <CheckCircleIcon />, color: "#10B981",
    title: "Application Shortlisted",
    message: "The Leela Palace has shortlisted your application for Head Chef position.",
    time: "15 minutes ago", unread: true, action: "View Application",
  },
  {
    id: 3, category: "Bookings", icon: <CalendarMonthIcon />, color: BRAND.gold,
    title: "Event Booking Confirmed",
    message: "Your booking for Sunita's Wedding (Dec 28) has been confirmed. 6 hours · ₹15,000",
    time: "1 hour ago", unread: true, action: "View Booking",
  },
  {
    id: 4, category: "Messages", icon: <ChatIcon />, color: "#3B82F6",
    title: "New Message from ITC Hotels",
    message: "Rahul from ITC Hotels: 'Could you please share your availability for next month?'",
    time: "2 hours ago", unread: false, action: "Reply",
  },
  {
    id: 5, category: "Reviews", icon: <StarIcon />, color: "#F59E0B",
    title: "New Review Received",
    message: "Meera Krishnan left you a 5-star review: 'Absolutely exceptional experience!'",
    time: "5 hours ago", unread: false, action: "View Review",
  },
  {
    id: 6, category: "Jobs", icon: <WorkIcon />, color: BRAND.orange,
    title: "Job Alert: Senior Chef",
    message: "3 new Senior Chef positions have been posted in your area matching your skills.",
    time: "Yesterday", unread: false, action: "Browse Jobs",
  },
  {
    id: 7, category: "Applications", icon: <PersonIcon />, color: "#8B5CF6",
    title: "Profile Viewed",
    message: "Your profile was viewed by 8 restaurants this week — 3x more than last week!",
    time: "Yesterday", unread: false,
  },
  {
    id: 8, category: "Bookings", icon: <CalendarMonthIcon />, color: BRAND.gold,
    title: "New Event Booking Request",
    message: "WeddingsBySunita wants to book you for a corporate dinner on Jan 5. 4 hours.",
    time: "2 days ago", unread: false, action: "Accept / Decline",
  },
  {
    id: 9, category: "Reviews", icon: <StarIcon />, color: "#F59E0B",
    title: "Review from Oberoi Hotels",
    message: "Arjun from Oberoi: 'Outstanding professionalism and remarkable culinary skills.'",
    time: "3 days ago", unread: false, action: "View Profile",
  },
];

const NotificationItem = ({ notif, onDismiss }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20, height: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2.5,
        borderRadius: 3,
        background: notif.unread ? alpha(notif.color, 0.06) : "rgba(255,255,255,0.02)",
        border: notif.unread ? `1px solid ${alpha(notif.color, 0.18)}` : "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        transition: "all 0.2s ease",
        "&:hover": {
          background: alpha(notif.color, 0.09),
          border: `1px solid ${alpha(notif.color, 0.25)}`,
        },
      }}
    >
      {/* Unread dot */}
      {notif.unread && (
        <Box
          sx={{
            position: "absolute", top: 16, right: 16,
            width: 8, height: 8, borderRadius: "50%",
            background: premiumGradient,
          }}
        />
      )}

      {/* Icon */}
      <Box
        sx={{
          width: 44, height: 44, borderRadius: 2.5, flexShrink: 0,
          bgcolor: alpha(notif.color, 0.15),
          color: notif.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          "& svg": { fontSize: 22 },
        }}
      >
        {notif.icon}
      </Box>

      {/* Content */}
      <Box flex={1} minWidth={0}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1} mb={0.5}>
          <Typography
            variant="body2"
            fontWeight={notif.unread ? 700 : 600}
            sx={{ color: notif.unread ? "white" : "rgba(255,255,255,0.8)" }}
          >
            {notif.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.3)", flexShrink: 0, fontSize: "0.7rem" }}
          >
            {notif.time}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, mb: notif.action ? 1.5 : 0 }}
        >
          {notif.message}
        </Typography>
        {notif.action && (
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              size="small"
              variant="outlined"
              sx={{
                height: 28, px: 1.5, fontSize: "0.78rem", fontWeight: 700,
                borderColor: alpha(notif.color, 0.4),
                color: notif.color,
                "&:hover": { bgcolor: alpha(notif.color, 0.1), borderColor: notif.color },
              }}
            >
              {notif.action}
            </Button>
            <Tooltip title="Dismiss">
              <IconButton
                size="small"
                onClick={() => onDismiss(notif.id)}
                sx={{ color: "rgba(255,255,255,0.25)", "&:hover": { color: "rgba(255,255,255,0.6)" }, width: 28, height: 28 }}
              >
                <ClearIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  </motion.div>
);

export const NotificationsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filtered = notifications.filter(
    (n) => activeCategory === "All" || n.category === activeCategory
  );
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  const dismiss = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <Box
      sx={{
        background: `linear-gradient(160deg, #080F1D 0%, #0F172A 60%, #1A1F35 100%)`,
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
            <Box>
              <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
                <Typography variant="h4" fontWeight={800} sx={{ color: "white" }}>Notifications</Typography>
                {unreadCount > 0 && (
                  <Box
                    sx={{
                      px: 1.25, height: 26, borderRadius: 2,
                      background: premiumGradient,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 800, color: "white" }}>{unreadCount} new</Typography>
                  </Box>
                )}
              </Box>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.45)" }}>
                Stay updated on jobs, bookings, and messages
              </Typography>
            </Box>
            {unreadCount > 0 && (
              <Button
                startIcon={<DoneAllIcon />}
                onClick={markAllRead}
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 2.5,
                  px: 2,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.05)", color: "white" },
                }}
              >
                Mark all read
              </Button>
            )}
          </Box>
        </motion.div>

        {/* Category Filter */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Stack direction="row" spacing={1} mb={4} sx={{ flexWrap: "wrap", gap: 1 }}>
            {CATEGORIES.map((cat) => {
              const count = cat === "All" ? notifications.filter((n) => n.unread).length
                : notifications.filter((n) => n.category === cat && n.unread).length;
              return (
                <Chip
                  key={cat}
                  label={
                    <Box display="flex" alignItems="center" gap={0.75}>
                      {cat}
                      {count > 0 && (
                        <Box sx={{ width: 18, height: 18, borderRadius: "50%", background: premiumGradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: "white" }}>{count}</Typography>
                        </Box>
                      )}
                    </Box>
                  }
                  onClick={() => setActiveCategory(cat)}
                  sx={{
                    bgcolor: activeCategory === cat ? alpha(BRAND.orange, 0.2) : "rgba(255,255,255,0.05)",
                    color: activeCategory === cat ? BRAND.orangeLight : "rgba(255,255,255,0.6)",
                    border: activeCategory === cat ? `1px solid ${alpha(BRAND.orange, 0.4)}` : "1px solid rgba(255,255,255,0.08)",
                    fontWeight: activeCategory === cat ? 700 : 500,
                    "&:hover": { bgcolor: alpha(BRAND.orange, 0.1) },
                    transition: "all 0.2s",
                  }}
                />
              );
            })}
          </Stack>
        </motion.div>

        {/* Notification List */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <Stack spacing={1.5}>
              {filtered.map((notif, i) => (
                <motion.div key={notif.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }}>
                  <NotificationItem notif={notif} onDismiss={dismiss} />
                </motion.div>
              ))}
            </Stack>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Box
                sx={{
                  ...glassDark(0.4),
                  borderRadius: 4,
                  p: 8,
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <NotificationsNoneIcon sx={{ fontSize: 64, color: "rgba(255,255,255,0.15)", mb: 2 }} />
                <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.5)", mb: 1 }}>All caught up!</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.3)" }}>
                  No {activeCategory !== "All" ? activeCategory.toLowerCase() : ""} notifications right now.
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default NotificationsPage;
