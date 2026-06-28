import React, { useEffect, useState } from "react";
import {
  Grid, Box, Button, Card, CardContent, Typography, Chip,
  Skeleton, Stack, Avatar, alpha,
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
import EventIcon from "@mui/icons-material/Event";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
          jobApi.getMyJobs(),
        ]);
        setStats(statsRes.data.data);
        const allJobs = jobsRes.data.data ?? [];
        setJobs(Array.isArray(allJobs) ? allJobs.slice(0, 5) : []);
      } catch {
        // no-op
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = [
    { icon: <WorkIcon />, label: "Active Jobs", value: loading ? "—" : (stats?.activeJobs ?? 0), color: BRAND.orange },
    { icon: <PeopleIcon />, label: "Total Applicants", value: loading ? "—" : (stats?.totalApplications ?? 0), color: "#3B82F6" },
    { icon: <CheckCircleIcon />, label: "Interviews Scheduled", value: loading ? "—" : (stats?.interviews ?? 0), color: "#10B981" },
    { icon: <TrendingUpIcon />, label: "Hired This Month", value: loading ? "—" : (stats?.hiredCount ?? 0), color: BRAND.gold },
  ];

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
        {statCards.map((stat, i) => (
          <Grid key={stat.label} size={{ xs: 6, sm: 6, md: 3 }}>
            <motion.div {...fadeUp(i * 0.08)}>
              <PremiumStatCard {...stat} loading={loading} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Active Jobs */}
        <Grid size={{ xs: 12, md: 8 }}>
          <motion.div {...fadeUp(0.15)}>
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
                          label={JOB_STATUS_LABELS?.[job.status]?.label ?? job.status ?? "OPEN"}
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
        <Grid size={{ xs: 12, md: 4 }}>
          <motion.div {...fadeUp(0.18)}>
            <Card sx={{ height: "100%", p: 0.5 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2.5}>Quick Actions</Typography>
                <Stack spacing={1.25}>
                  {[
                    { icon: <AddCircleOutlineIcon />, label: "Post New Job", color: BRAND.orange, to: ROUTES.RESTAURANT_POST_JOB },
                    { icon: <SearchIcon />, label: "Browse Chefs", color: "#3B82F6", to: ROUTES.BROWSE_CHEFS },
                    { icon: <PeopleIcon />, label: "View Candidates", color: "#10B981", to: ROUTES.RESTAURANT_CANDIDATES },
                    { icon: <BookmarkIcon />, label: "Shortlisted", color: BRAND.gold, to: ROUTES.RESTAURANT_SHORTLISTED },
                    { icon: <EventIcon />, label: "My Events", color: "#8B5CF6", to: ROUTES.RESTAURANT_MY_EVENTS },
                    { icon: <ChatIcon />, label: "Messages", color: "#3B82F6", to: "/chat" },
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default RestaurantDashboard;
