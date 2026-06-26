import React, { useEffect, useState } from "react";
import {
  Grid, Box, Button, Card, CardContent, Typography, Chip,
  Skeleton, Stack, Avatar, alpha, LinearProgress,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell, LineChart, Line,
} from "recharts";
import { useAuth } from "../../hooks/useAuth";
import { restaurantApi, jobApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import { JOB_STATUS_LABELS } from "../../constants";
import { BRAND, premiumGradient } from "../../theme";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const hiringData = [
  { month: "Jan", applications: 18, hires: 2 },
  { month: "Feb", applications: 24, hires: 3 },
  { month: "Mar", applications: 20, hires: 1 },
  { month: "Apr", applications: 32, hires: 4 },
  { month: "May", applications: 28, hires: 3 },
  { month: "Jun", applications: 40, hires: 5 },
];

const staffNeedsData = [
  { role: "Head Chef", needed: 1, filled: 1 },
  { role: "Sous Chef", needed: 2, filled: 1 },
  { role: "Line Cook", needed: 4, filled: 3 },
  { role: "Kitchen Helper", needed: 3, filled: 2 },
  { role: "Pastry Chef", needed: 1, filled: 0 },
];

const responseData = [
  { day: "Mon", time: 2.4 },
  { day: "Tue", time: 1.8 },
  { day: "Wed", time: 3.2 },
  { day: "Thu", time: 1.5 },
  { day: "Fri", time: 2.1 },
  { day: "Sat", time: 4.0 },
  { day: "Sun", time: 2.8 },
];

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
                sx={{ height: 22, fontSize: "0.7rem", fontWeight: 700, bgcolor: change >= 0 ? alpha("#10B981", 0.12) : alpha("#EF4444", 0.12), color: change >= 0 ? "#10B981" : "#EF4444" }}
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

export const RestaurantDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, jobsRes] = await Promise.all([
          restaurantApi.getStats(),
          jobApi.getMy({ limit: 5 }),
        ]);
        setStats(statsRes.data.data);
        setJobs(jobsRes.data.data?.content ?? []);
      } catch {
        // no-op
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Box>
      {/* Greeting */}
      <motion.div {...fadeUp(0)}>
        <Box mb={4} display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" fontWeight={800} mb={0.5}>
              Restaurant Dashboard 🍴
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your hiring pipeline and track team performance.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate(ROUTES.RESTAURANT_POST_JOB)}
          >
            Post a Job
          </Button>
        </Box>
      </motion.div>

      {/* Stat Cards */}
      <Grid container spacing={3} mb={4}>
        {[
          { icon: <WorkIcon />, label: "Active Jobs", value: loading ? "—" : stats?.activeJobs ?? 4, change: 12, color: BRAND.orange },
          { icon: <PeopleIcon />, label: "Total Applicants", value: loading ? "—" : stats?.totalApplications ?? 40, change: 28, color: "#3B82F6" },
          { icon: <CheckCircleIcon />, label: "Interviews Scheduled", value: loading ? "—" : stats?.interviews ?? 8, change: -5, color: "#10B981" },
          { icon: <TrendingUpIcon />, label: "Hired This Month", value: loading ? "—" : stats?.hiredCount ?? 3, change: 50, color: BRAND.gold },
        ].map((stat, i) => (
          <Grid key={stat.label} size={{ xs: 6, sm: 6, md: 3 }}>
            <motion.div {...fadeUp(i * 0.08)}>
              <PremiumStatCard {...stat} loading={loading} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mb={4}>
        {/* Hiring Trend Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <motion.div {...fadeUp(0.15)}>
            <Card sx={{ height: "100%", p: 0.5 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>Hiring Funnel</Typography>
                    <Typography variant="body2" color="text.secondary">Applications vs. Successful Hires</Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Chip size="small" label="Applications" sx={{ bgcolor: alpha(BRAND.orange, 0.1), color: BRAND.orangeDark, fontWeight: 600 }} />
                    <Chip size="small" label="Hires" sx={{ bgcolor: alpha("#10B981", 0.1), color: "#059669", fontWeight: 600 }} />
                  </Stack>
                </Box>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={hiringData}>
                    <defs>
                      <linearGradient id="appGradR" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={BRAND.orange} stopOpacity={0.18} />
                        <stop offset="95%" stopColor={BRAND.orange} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="hireGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: BRAND.slate }} />
                    <YAxis tick={{ fontSize: 12, fill: BRAND.slate }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 13 }} />
                    <Area type="monotone" dataKey="applications" stroke={BRAND.orange} strokeWidth={2.5} fill="url(#appGradR)" name="Applications" />
                    <Area type="monotone" dataKey="hires" stroke="#10B981" strokeWidth={2.5} fill="url(#hireGrad)" name="Hires" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Response Time */}
        <Grid size={{ xs: 12, md: 4 }}>
          <motion.div {...fadeUp(0.18)}>
            <Card sx={{ height: "100%", p: 0.5 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={0.5}>Avg. Response Time</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>Hours to respond to applicants</Typography>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={responseData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: BRAND.slate }} />
                    <YAxis tick={{ fontSize: 11, fill: BRAND.slate }} unit="h" />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} formatter={(v) => [`${v}h`, "Response time"]} />
                    <Line type="monotone" dataKey="time" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: "#3B82F6", r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Staffing Needs */}
        <Grid size={{ xs: 12, md: 5 }}>
          <motion.div {...fadeUp(0.22)}>
            <Card sx={{ height: "100%", p: 0.5 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight={700}>Staffing Needs</Typography>
                  <Chip label={`${staffNeedsData.filter(s => s.filled < s.needed).length} open`} size="small" sx={{ bgcolor: alpha(BRAND.orange, 0.1), color: BRAND.orangeDark, fontWeight: 700 }} />
                </Box>
                <Stack spacing={2.25}>
                  {staffNeedsData.map((item) => {
                    const pct = Math.round((item.filled / item.needed) * 100);
                    return (
                      <Box key={item.role}>
                        <Box display="flex" justifyContent="space-between" mb={0.75}>
                          <Typography variant="body2" fontWeight={600}>{item.role}</Typography>
                          <Typography variant="body2" color="text.secondary">{item.filled}/{item.needed}</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 8, borderRadius: 4, bgcolor: "#F1F5F9",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 4,
                              background: pct === 100 ? "linear-gradient(90deg, #10B981, #059669)" : pct >= 50 ? premiumGradient : "linear-gradient(90deg, #EF4444, #DC2626)",
                            },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Active Jobs */}
        <Grid size={{ xs: 12, md: 7 }}>
          <motion.div {...fadeUp(0.25)}>
            <Card sx={{ height: "100%", p: 0.5 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight={700}>Active Job Listings</Typography>
                  <Button size="small" endIcon={<ArrowForwardIcon />} onClick={() => navigate(ROUTES.RESTAURANT_MANAGE_JOBS)}>Manage Jobs</Button>
                </Box>
                {loading ? (
                  <Stack spacing={2}>
                    {[...Array(4)].map((_, i) => (
                      <Box key={i} display="flex" gap={2} alignItems="center">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box flex={1}><Skeleton width="55%" /><Skeleton width="35%" /></Box>
                        <Skeleton width={70} height={26} />
                      </Box>
                    ))}
                  </Stack>
                ) : jobs.length > 0 ? (
                  <Stack spacing={2}>
                    {jobs.map((job) => (
                      <Box key={job.id} display="flex" alignItems="center" gap={2} py={1} sx={{ borderBottom: "1px solid #F8FAFC", "&:last-child": { border: "none" } }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: 2.5, background: premiumGradient, display: "flex", alignItems: "center", justifyContent: "center", color: "white", "& svg": { fontSize: 18 }, flexShrink: 0 }}>
                          <WorkIcon />
                        </Box>
                        <Box flex={1} minWidth={0}>
                          <Typography variant="body2" fontWeight={700} noWrap>{job.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{job.location} · {job.applicationCount ?? 0} applicants</Typography>
                        </Box>
                        <Chip
                          label={JOB_STATUS_LABELS?.[job.status] ?? job.status ?? "OPEN"}
                          size="small"
                          sx={{
                            bgcolor: job.status === "OPEN" ? alpha("#10B981", 0.1) : alpha(BRAND.slate, 0.1),
                            color: job.status === "OPEN" ? "#10B981" : BRAND.slate,
                            fontWeight: 700, height: 24, fontSize: "0.7rem",
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Box textAlign="center" py={4}>
                    <Typography variant="body2" color="text.secondary">No jobs posted yet</Typography>
                    <Button variant="contained" size="small" sx={{ mt: 1.5 }} onClick={() => navigate(ROUTES.RESTAURANT_POST_JOB)}>Post a Job</Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12 }}>
          <motion.div {...fadeUp(0.3)}>
            <Card sx={{ p: 0.5 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2.5}>Quick Actions</Typography>
                <Grid container spacing={2}>
                  {[
                    { icon: <AddCircleOutlineIcon />, label: "Post New Job", color: BRAND.orange, to: ROUTES.RESTAURANT_POST_JOB },
                    { icon: <SearchIcon />, label: "Browse Chefs", color: "#3B82F6", to: ROUTES.BROWSE_CHEFS },
                    { icon: <PeopleIcon />, label: "View Candidates", color: "#10B981", to: ROUTES.RESTAURANT_CANDIDATES },
                    { icon: <BookmarkIcon />, label: "Shortlisted", color: BRAND.gold, to: ROUTES.RESTAURANT_SHORTLISTED },
                    { icon: <ChatIcon />, label: "Messages", color: "#8B5CF6", to: "/chat" },
                  ].map((action) => (
                    <Grid key={action.label} size={{ xs: 6, sm: 4, md: 2.4 }}>
                      <Box
                        onClick={() => navigate(action.to)}
                        sx={{
                          p: 2, borderRadius: 3, textAlign: "center", cursor: "pointer",
                          border: "1px solid #F1F5F9",
                          "&:hover": { bgcolor: alpha(action.color, 0.06), borderColor: alpha(action.color, 0.2), transform: "translateY(-2px)" },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: alpha(action.color, 0.1), color: action.color, display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 1, "& svg": { fontSize: 22 } }}>
                          {action.icon}
                        </Box>
                        <Typography variant="caption" fontWeight={600} color="text.primary">{action.label}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RestaurantDashboard;
