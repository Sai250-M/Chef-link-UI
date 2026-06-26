import React, { useEffect, useState } from "react";
import {
  Box, Card, CardContent, Typography, Chip, Button, Select, MenuItem,
  FormControl, InputLabel, Grid, Skeleton, Avatar,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { PageHeader } from "../../components/common/PageHeader";
import { EmptyState } from "../../components/common/EmptyState";
import { StatusChip } from "../../components/common/StatusChip";
import { applicationApi, jobApi } from "../../services/api";
import { APPLICATION_STATUS_LABELS } from "../../constants";
import { ROUTES } from "../../constants/routes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const ChefApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const loadApplications = async (status) => {
    setLoading(true);
    try {
      const params = status && status !== "ALL" ? { status } : {};
      const res = await applicationApi.getMy(params);
      setApplications(res.data.data ?? []);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadApplications(); }, []);

  const handleWithdraw = async (applicationId) => {
    try {
      await jobApi.withdrawApplication(applicationId);
      setApplications((prev) => prev.map((a) => a.id === applicationId ? { ...a, status: "WITHDRAWN" } : a));
    } catch { /* toast */ }
  };

  return (
    <Box>
      <PageHeader
        title="My Applications"
        subtitle="Track all your job applications in one place"
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.CHEF_DASHBOARD }, { label: "Applications" }]}
        action={
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Filter Status</InputLabel>
            <Select label="Filter Status" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); loadApplications(e.target.value === "ALL" ? undefined : e.target.value); }}>
              <MenuItem value="ALL">All</MenuItem>
              {Object.entries(APPLICATION_STATUS_LABELS).map(([val, cfg]) => (
                <MenuItem key={val} value={val}>{cfg.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />

      {loading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid key={i} size={12}><Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} /></Grid>
          ))}
        </Grid>
      ) : applications.length === 0 ? (
        <EmptyState title="No applications yet" description="Start applying to jobs to see your applications here." variant="empty"
          action={{ label: "Browse Jobs", onClick: () => window.location.href = ROUTES.BROWSE_JOBS }} />
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {applications.map((app) => (
            <Card key={app.id}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} flexWrap="wrap">
                  <Box display="flex" gap={2} alignItems="flex-start">
                    <Avatar sx={{ width: 48, height: 48, borderRadius: 2 }}>{app.restaurant_name?.[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>{app.job_title}</Typography>
                      <Typography variant="body2" color="text.secondary">{app.restaurant_name}</Typography>
                      <Box display="flex" alignItems="center" gap={2} mt={0.75}>
                        {app.job_city && (
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <LocationOnIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                            <Typography variant="caption" color="text.secondary">{app.job_city}</Typography>
                          </Box>
                        )}
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <CalendarTodayIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                          <Typography variant="caption" color="text.secondary">Applied {dayjs(app.applied_at).fromNow()}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <StatusChip status={app.status} type="application" />
                    {app.status === "PENDING" && (
                      <Button size="small" variant="outlined" color="error" onClick={() => handleWithdraw(app.id)}>Withdraw</Button>
                    )}
                  </Box>
                </Box>
                {app.cover_letter && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block" mb={0.5} fontWeight={600}>Your Cover Letter</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {app.cover_letter}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};
