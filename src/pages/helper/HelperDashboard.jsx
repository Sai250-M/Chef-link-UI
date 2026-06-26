import React, { useEffect, useState } from "react";
import { Grid, Box, Button, Card, CardContent, Typography, Chip, Skeleton } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/common/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { ProfileCompletion } from "../../components/dashboard/ProfileCompletion";
import { useAuth } from "../../hooks/useAuth";
import { helperApi, applicationApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import { APPLICATION_STATUS_LABELS } from "../../constants";

export const HelperDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([helperApi.getMyProfile(), applicationApi.getMy({ limit: 5 })])
      .then(([p, a]) => { setProfile(p.data.data); setApplications(a.data.data ?? []); })
      .finally(() => setLoading(false));
  }, []);

  const appCounts = applications.reduce((acc, a) => { acc[a.status] = (acc[a.status] ?? 0) + 1; return acc; }, {});

  const completionSteps = [
    { label: "Add bio", done: !!profile?.bio },
    { label: "Set years of experience", done: !!profile?.years_experience },
    { label: "Set hourly rate", done: !!profile?.hourly_rate },
    { label: "Add city", done: !!profile?.city },
    { label: "Add skills", done: (profile?.skills?.length ?? 0) > 0 },
    { label: "Add phone number", done: !!profile?.phone },
    { label: "Upload profile photo", done: !!profile?.avatar_url },
  ];

  return (
    <Box>
      <PageHeader
        title={`Welcome, ${user?.first_name}!`}
        subtitle="Track your profile and applications"
        action={<Button variant="contained" onClick={() => navigate(ROUTES.BROWSE_JOBS)}>Browse Jobs</Button>}
      />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          {loading ? <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3 }} /> : (
            <StatCard title="Total Applications" value={applications.length} icon={<AssignmentIcon />} color="#E07B39" />
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          {loading ? <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3 }} /> : (
            <StatCard title="Shortlisted" value={appCounts["SHORTLISTED"] ?? 0} icon={<TrendingUpIcon />} color="#3B82F6" />
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          {loading ? <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3 }} /> : (
            <StatCard title="Hired" value={appCounts["HIRED"] ?? 0} icon={<CheckCircleIcon />} color="#10B981" />
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          {loading ? <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3 }} /> : (
            <StatCard title="Skills Listed" value={profile?.skills?.length ?? 0} icon={<WorkIcon />} color="#F59E0B" />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {loading ? <Skeleton variant="rectangular" height={340} sx={{ borderRadius: 3 }} /> : (
            <ProfileCompletion pct={profile?.profile_completion_pct ?? 0} steps={completionSteps} editRoute={ROUTES.HELPER_EDIT_PROFILE} />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={700}>Recent Applications</Typography>
                <Button size="small" onClick={() => navigate(ROUTES.HELPER_APPLICATIONS)}>View All</Button>
              </Box>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} variant="rectangular" height={64} sx={{ borderRadius: 2, mb: 1.5 }} />)
              ) : applications.length === 0 ? (
                <Box textAlign="center" py={5}>
                  <Typography variant="body2" color="text.secondary">No applications yet.</Typography>
                  <Button variant="outlined" size="small" sx={{ mt: 2 }} onClick={() => navigate(ROUTES.BROWSE_JOBS)}>Browse Jobs</Button>
                </Box>
              ) : (
                applications.map((app) => (
                  <Box key={app.id} display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", mb: 1.5 }}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>{app.job_title}</Typography>
                      <Typography variant="caption" color="text.secondary">{app.restaurant_name}</Typography>
                    </Box>
                    <Chip label={APPLICATION_STATUS_LABELS[app.status]?.label ?? app.status} color={APPLICATION_STATUS_LABELS[app.status]?.color} size="small" />
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
