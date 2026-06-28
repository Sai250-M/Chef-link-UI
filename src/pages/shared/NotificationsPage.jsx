import React, { useState, useEffect } from "react";
import {
  Box, Container, Typography, Chip, Stack, alpha, IconButton,
  Button, Tooltip, Skeleton,
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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BRAND, glassDark, premiumGradient } from "../../theme";
import { notificationApi } from "../../services/api";

dayjs.extend(relativeTime);

const CATEGORIES = ["All", "Jobs", "Applications", "Bookings", "Messages", "Reviews"];

const getNotifMeta = (type = "") => {
  const t = (type || "").toUpperCase();
  if (t.includes("BOOKING") || t.includes("EVENT"))
    return { category: "Bookings", icon: <CalendarMonthIcon />, color: BRAND.gold };
  if (t.includes("MESSAGE") || t.includes("CHAT"))
    return { category: "Messages", icon: <ChatIcon />, color: "#3B82F6" };
  if (t.includes("REVIEW") || t.includes("RATING"))
    return { category: "Reviews", icon: <StarIcon />, color: "#F59E0B" };
  if (t.includes("APPLICATION") || t.includes("SHORTLIST") || t.includes("HIRED") || t.includes("REJECTED"))
    return { category: "Applications", icon: <CheckCircleIcon />, color: "#10B981" };
  if (t.includes("PROFILE") || t.includes("VIEW"))
    return { category: "Applications", icon: <PersonIcon />, color: "#8B5CF6" };
  if (t.includes("JOB") || t.includes("MATCH"))
    return { category: "Jobs", icon: <WorkIcon />, color: BRAND.orange };
  return { category: "Jobs", icon: <NotificationsNoneIcon />, color: BRAND.orange };
};

const mapNotif = (n) => {
  const meta = getNotifMeta(n.type || n.notification_type || "");
  return {
    id: n.id,
    category: meta.category,
    icon: meta.icon,
    color: meta.color,
    title: n.title || (n.type || "Notification").replace(/_/g, " "),
    message: n.message || n.body || n.content || "",
    time: dayjs(n.created_at).fromNow(),
    unread: !(n.is_read ?? n.read ?? false),
  };
};

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
        border: notif.unread
          ? `1px solid ${alpha(notif.color, 0.18)}`
          : "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        transition: "all 0.2s ease",
        "&:hover": {
          background: alpha(notif.color, 0.09),
          border: `1px solid ${alpha(notif.color, 0.25)}`,
        },
      }}
    >
      {notif.unread && (
        <Box
          sx={{
            position: "absolute", top: 16, right: 16,
            width: 8, height: 8, borderRadius: "50%",
            background: premiumGradient,
          }}
        />
      )}

      <Box
        sx={{
          width: 44, height: 44, borderRadius: 2.5, flexShrink: 0,
          bgcolor: alpha(notif.color, 0.15), color: notif.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          "& svg": { fontSize: 22 },
        }}
      >
        {notif.icon}
      </Box>

      <Box flex={1} minWidth={0}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1} mb={0.5}>
          <Typography
            variant="body2"
            fontWeight={notif.unread ? 700 : 600}
            sx={{ color: notif.unread ? "white" : "rgba(255,255,255,0.8)" }}
          >
            {notif.title}
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", flexShrink: 0, fontSize: "0.7rem" }}>
            {notif.time}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
          {notif.message}
        </Typography>
      </Box>

      <Tooltip title="Dismiss">
        <IconButton
          size="small"
          onClick={() => onDismiss(notif.id)}
          sx={{
            color: "rgba(255,255,255,0.25)",
            "&:hover": { color: "rgba(255,255,255,0.6)" },
            width: 28, height: 28, alignSelf: "flex-start", mt: 0.25,
          }}
        >
          <ClearIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    </Box>
  </motion.div>
);

const SkeletonItem = () => (
  <Box sx={{ display: "flex", gap: 2, p: 2.5, borderRadius: 3, border: "1px solid rgba(255,255,255,0.05)" }}>
    <Skeleton variant="rounded" width={44} height={44} sx={{ bgcolor: "rgba(255,255,255,0.07)", borderRadius: 2.5, flexShrink: 0 }} />
    <Box flex={1}>
      <Skeleton width="45%" height={18} sx={{ bgcolor: "rgba(255,255,255,0.07)", mb: 0.75 }} />
      <Skeleton width="80%" height={14} sx={{ bgcolor: "rgba(255,255,255,0.05)" }} />
      <Skeleton width="55%" height={14} sx={{ bgcolor: "rgba(255,255,255,0.05)", mt: 0.5 }} />
    </Box>
  </Box>
);

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    notificationApi
      .getAll()
      .then((res) => {
        const raw = res.data.data ?? res.data ?? [];
        setNotifications(Array.isArray(raw) ? raw.map(mapNotif) : []);
      })
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = notifications.filter(
    (n) => activeCategory === "All" || n.category === activeCategory
  );
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = async () => {
    const ids = notifications.filter((n) => n.unread).map((n) => n.id);
    if (!ids.length) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    try { await notificationApi.markRead(ids); } catch { /* silent */ }
  };

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
                  borderRadius: 2.5, px: 2,
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
              const count = cat === "All"
                ? notifications.filter((n) => n.unread).length
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

        {/* Content */}
        {loading ? (
          <Stack spacing={1.5}>
            {[...Array(5)].map((_, i) => <SkeletonItem key={i} />)}
          </Stack>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <Stack spacing={1.5}>
                {filtered.map((notif, i) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <NotificationItem notif={notif} onDismiss={dismiss} />
                  </motion.div>
                ))}
              </Stack>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Box
                  sx={{
                    ...glassDark(0.4),
                    borderRadius: 4, p: 8, textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <NotificationsNoneIcon sx={{ fontSize: 64, color: "rgba(255,255,255,0.15)", mb: 2 }} />
                  <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.5)", mb: 1 }}>All caught up!</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.3)" }}>
                    No {activeCategory !== "All" ? activeCategory.toLowerCase() + " " : ""}notifications right now.
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Container>
    </Box>
  );
};

export default NotificationsPage;
