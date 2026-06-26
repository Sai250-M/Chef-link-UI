import React, { useEffect, useState } from "react";
import {
  Grid, Box, Typography, Button, Card, CardContent, Chip,
  Skeleton, Stack, Avatar, LinearProgress, alpha, Paper,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import EarningsIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import { useAuth } from "../../hooks/useAuth";
import { chefApi, applicationApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import { APPLICATION_STATUS_LABELS } from "../../constants";
import { BRAND, premiumGradient } from "../../theme";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─── Mock chart data ──────────────────────────────────────────────────────────
const applicationData = [
  { month: "Jan", applications: 3, interviews: 1 },
  { month: "Feb", applications: 5, interviews: 2 },
  { month: "Mar", applications: 4, interviews: 3 },
  { month: "Apr", applications: 8, interviews: 4 },
  { month: "May", applications: 6, interviews: 3 },
  { month: "Jun", applications: 9, interviews: 5 },
];

const earningsData = [
  { month: "Jan", earnings: 45000 },
  { month: "Feb", earnings: 52000 },
  { month: "Mar", earnings: 48000 },
  { month: "Apr", earnings: 65000 },
  { month: "May", earnings: 72000 },
  { month: "Jun", earnings: 80000 },
];

const pieData = [
  { name: "Applied", value: 12, color: BRAND.orange },
  { name: "Interview", value: 5, color: "#3B82F6" },
  { name: "Hired", value: 3, color: "#10B981" },
  { name: "Rejected", value: 2, color: "#EF4444" },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
const PremiumStatCard = ({ icon, label, value, change, color, loading }) => (
  <Card sx={{ height: "100%", p: 0.5 }}>
    <CardContent sx={{ p: 3 }}>
      {loading ? (
        <>
          <Skeleton variant="rectangular" width={44} height={44} sx={{ borderRadius: 2, mb: 2 }} />
          <Skeleton width="60%" height={36} sx={{ mb: 0.5 }} />
          <Skeleton width="80%" height={20} />
        </>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: alpha(color, 0.12), color, display: "flex", alignItems: "center", justifyContent: "center", "& svg": { fontSize: 22 } }}>
              {icon}
            </Box>
            {change !== undefined && (
              <Chip
                label={`${change > 0 ? "+" : ""}${change}%`}
                size="small"
                sx={{
                  height: 22, fontSize: "0.7rem", fontWeight: 700,
                  bgcolor: change >= 0 ? alpha("#10B981", 0.12) : alpha("#EF4444", 0.12),
                  color: change >= 0 ? "#10B981" : "#EF4444",
                }}
              />
            )}
          </Box>
          <Typography variant="h4" fontWeight={800} sx={{ color: BRAND.navy, lineHeight: 1, mb: 0.5 }}>{value}</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>{label}</Typography>
        </>
      )}
    </CardContent>
  </Card>
);

const STATUS_COLORS = {
  APPLIED: { bg: alpha("#3B82F6", 0.1), color: "#3B82F6" },
  SHORTLISTED: { bg: alpha(BRAND.gold, 0.12), color: BRAND.goldDark },
  INTERVIEW: { bg: alpha("#8B5CF6", 0.1), color: "#8B5CF6" },
  HIRED: { bg: alpha("#10B981", 0.1), color: "#10B981" },
  REJECTED: { bg: alpha("#EF4444", 0.1), color: "#EF4444" },
};

export const ChefDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, appsRes] = await Promise.all([
          chefApi.getMyProfile(),
          applicationApi.getMy({ limit: 5 }),
        ]);
        setProfile(profileRes.data.data);
        setApplications(appsRes.data.data?.content ?? []);
      } catch {
        // no-op
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const completionFields = [
    { label: "Basic Info", done: !!(profile?.bio) },
    { label: "Profile Photo", done: !!(profile?.profilePhotoUrl) },
    { label: "Cuisine Specialties", done: !!(profile?.cuisines?.length) },
    { label: "Certificates", done: !!(profile?.certificates?.length) },
    { label: "Experience", done: !!(profile?.yearsOfExperience) },
  ];
  const completionPct = Math.round((completionFields.filter((f) => f.done).length / completionFields.length) * 100);

  return (
    <Box>
      {/* Greeting */}
      <motion.div {...fadeUp(0)}>
        <Box mb={4}>
          <Typography variant="h4" fontWeight={800} mb={0.5}>
            Welcome back, {user?.first_name} 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's an overview of your culinary career on ChefLink.
          </Typography>
        </Box>
      </motion.div>

      {/* Stat Cards */}
      <Grid container spacing={3} mb={4}>
        {[
          { icon: <WorkIcon />, label: "Total Applications", value: loading ? "—" : applications.length || 0, change: 18, color: BRAND.orange },
          { icon: <CheckCircleIcon />, label: "Interviews Scheduled", value: loading ? "—" : 3, change: 5, color: "#10B981" },
          { icon: <EarningsIcon />, label: "Total Earned", value: loading ? "—" : "₹3.2L", change: 22, color: "#3B82F6" },
          { icon: <StarIcon />, label: "Average Rating", value: loading ? "—" : profile?.rating?.toFixed(1) || "4.8", change: 2, color: BRAND.gold },
        ].map((stat, i) => (
          <Grid key={stat.label} size={{ xs: 6, sm: 6, md: 3 }}>
            <motion.div {...fadeUp(i * 0.08)}>
              <PremiumStatCard {...stat} loading={loading} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mb={4}>
        {/* Application Trend Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <motion.div {...fadeUp(0.15)}>
            <Card sx={{ height: "100%", p: 0.5 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>Application Activity</Typography>
                    <Typography variant="body2" color="text.secondary">Last 6 months</Typography>
                  </Box>
                  <Chip label="All Time" size="small" color="primary" />
                </Box>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={applicationData}>
                    <defs>
                      <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={BRAND.orange} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={BRAND.orange} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="intGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: BRAND.slate }} />
                    <YAxis tick={{ fontSize: 12, fill: BRAND.slate }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 13 }} />
                    <Area type="monotone" dataKey="applications" stroke={BRAND.orange} strokeWidth={2.5} fill="url(#appGrad)" name="Applications" />
                    <Area type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2.5} fill="url(#intGrad)" name="Interviews" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Application Breakdown Pie */}
        <Grid size={{ xs: 12, md: 4 }}>
          <motion.div {...fadeUp(0.2)}>
            <Card sx={{ height: "100%", p: 0.5 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={0.5}>Application Status</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>Breakdown of all applications</Typography>
                <Box display="flex" justifyContent="center" mb={2}>
                  <PieChart width={160} height={160}>
                    <Pie data={pieData} cx={75} cy={75} innerRadius={45} outerRadius={72} dataKey="value" strokeWidth={0}>
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </Box>
                <Stack spacing={1.25}>
                  {pieData.map((item) => (
                    <Box key={item.name} display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: item.color }} />
                        <Typography variant="body2" color="text.secondary">{item.name}</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight={700}>{item.value}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Earnings Chart */}
        <Grid size={{ xs: 12, md: 7 }}>
          <motion.div {...fadeUp(0.25)}>
            <Card sx={{ p: 0.5 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>Earnings Overview</Typography>
                    <Typography variant="body2" color="text.secondary">Monthly earnings from ChefLink</Typography>
                  </Box>
                  <Typography variant="h5" fontWeight={800} sx={{ color: BRAND.orange }}>₹3.62L</Typography>
                </Box>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: BRAND.slate }} />
                    <YAxis tick={{ fontSize: 12, fill: BRAND.slate }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                    <Tooltip
                      formatter={(v) => [`₹${v.toLocaleString()}`, "Earnings"]}
                      contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 13 }}
                    />
                    <Bar dataKey="earnings" radius={[6, 6, 0, 0]}>
                      {earningsData.map((_, i) => (
                        <Cell key={i} fill={i === earningsData.length - 1 ? BRAND.orange : alpha(BRAND.orange, 0.45)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Profile Completion + Recent Applications */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={3} height="100%">
            {/* Profile Completion */}
            <motion.div {...fadeUp(0.28)}>
              <Card sx={{ p: 0.5 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={700}>Profile Strength</Typography>
                    <Typography variant="h5" fontWeight={800} sx={{ color: completionPct >= 80 ? "#10B981" : BRAND.orange }}>{completionPct}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={completionPct}
                    sx={{ mb: 2.5, height: 10, borderRadius: 5, bgcolor: "#F1F5F9", "& .MuiLinearProgress-bar": { borderRadius: 5, background: completionPct >= 80 ? "linear-gradient(90deg, #10B981, #059669)" : premiumGradient } }}
                  />
                  <Stack spacing={1.25}>
                    {completionFields.map((f) => (
                      <Box key={f.label} display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" color={f.done ? "text.primary" : "text.secondary"}>{f.label}</Typography>
                        {f.done
                          ? <CheckCircleIcon sx={{ fontSize: 18, color: "#10B981" }} />
                          : <Box sx={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #E2E8F0" }} />
                        }
                      </Box>
                    ))}
                  </Stack>
                  {completionPct < 100 && (
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      sx={{ mt: 2.5 }}
                      onClick={() => navigate(ROUTES.CHEF_EDIT_PROFILE)}
                    >
                      Complete Profile
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div {...fadeUp(0.32)}>
              <Card sx={{ p: 0.5, flex: 1 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={700} mb={2}>Quick Actions</Typography>
                  <Stack spacing={1.25}>
                    {[
                      { icon: <WorkIcon />, label: "Browse New Jobs", color: BRAND.orange, to: ROUTES.BROWSE_JOBS },
                      { icon: <AssignmentIcon />, label: "View Applications", color: "#3B82F6", to: ROUTES.CHEF_APPLICATIONS },
                      { icon: <CalendarMonthIcon />, label: "Set Availability", color: "#10B981", to: ROUTES.CHEF_AVAILABILITY },
                      { icon: <ChatIcon />, label: "Messages", color: "#8B5CF6", to: "/chat" },
                    ].map((action) => (
                      <Box
                        key={action.label}
                        onClick={() => navigate(action.to)}
                        sx={{
                          display: "flex", alignItems: "center", gap: 1.5,
                          p: 1.5, borderRadius: 2.5, cursor: "pointer",
                          border: "1px solid #F1F5F9",
                          "&:hover": { bgcolor: alpha(action.color, 0.06), borderColor: alpha(action.color, 0.2), transform: "translateX(4px)" },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: alpha(action.color, 0.1), color: action.color, display: "flex", alignItems: "center", justifyContent: "center", "& svg": { fontSize: 18 } }}>
                          {action.icon}
                        </Box>
                        <Typography variant="body2" fontWeight={600}>{action.label}</Typography>
                        <ArrowForwardIcon sx={{ fontSize: 16, color: "text.secondary", ml: "auto" }} />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Stack>
        </Grid>

        {/* Recent Applications */}
        <Grid size={{ xs: 12 }}>
          <motion.div {...fadeUp(0.35)}>
            <Card sx={{ p: 0.5 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight={700}>Recent Applications</Typography>
                  <Button size="small" endIcon={<ArrowForwardIcon />} onClick={() => navigate(ROUTES.CHEF_APPLICATIONS)}>View All</Button>
                </Box>
                {loading ? (
                  <Stack spacing={2}>
                    {[...Array(3)].map((_, i) => (
                      <Box key={i} display="flex" gap={2} alignItems="center">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box flex={1}><Skeleton width="60%" /><Skeleton width="40%" /></Box>
                        <Skeleton width={80} height={28} />
                      </Box>
                    ))}
                  </Stack>
                ) : applications.length > 0 ? (
                  <Stack spacing={2}>
                    {applications.map((app) => {
                      const sc = STATUS_COLORS[app.status] ?? STATUS_COLORS.APPLIED;
                      return (
                        <Box key={app.id} display="flex" alignItems="center" gap={2} py={1.25} sx={{ borderBottom: "1px solid #F8FAFC", "&:last-child": { border: "none" } }}>
                          <Avatar sx={{ width: 40, height: 40, bgcolor: alpha(BRAND.orange, 0.12), color: BRAND.orange, fontWeight: 700, fontSize: "0.85rem" }}>
                            {app.job?.restaurant?.restaurantName?.[0] ?? "R"}
                          </Avatar>
                          <Box flex={1} minWidth={0}>
                            <Typography variant="body2" fontWeight={700} noWrap>{app.job?.title ?? "Chef Position"}</Typography>
                            <Typography variant="caption" color="text.secondary">{app.job?.restaurant?.restaurantName ?? "Restaurant"}</Typography>
                          </Box>
                          <Chip
                            label={APPLICATION_STATUS_LABELS[app.status] ?? app.status}
                            size="small"
                            sx={{ bgcolor: sc.bg, color: sc.color, fontWeight: 700, height: 24, fontSize: "0.7rem" }}
                          />
                        </Box>
                      );
                    })}
                  </Stack>
                ) : (
                  <Box textAlign="center" py={4}>
                    <Typography variant="body2" color="text.secondary">No applications yet</Typography>
                    <Button variant="contained" size="small" sx={{ mt: 1.5 }} onClick={() => navigate(ROUTES.BROWSE_JOBS)}>Browse Jobs</Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChefDashboard;
