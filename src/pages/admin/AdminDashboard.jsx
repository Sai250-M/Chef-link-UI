import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { PageHeader } from "../../components/common/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";

export const AdminDashboard = () => (
  <Box>
    <PageHeader title="Admin Dashboard" subtitle="Platform-wide overview and analytics" />
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard title="Total Users" value="8,500+" icon={<PeopleIcon />} color="#E07B39" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard title="Total Jobs" value="1,200+" icon={<WorkIcon />} color="#3B82F6" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard title="Applications" value="28,000+" icon={<AssignmentIcon />} color="#10B981" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard title="Hires Made" value="4,500+" icon={<TrendingUpIcon />} color="#F59E0B" />
      </Grid>
      <Grid size={12}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Analytics</Typography>
            <Typography variant="body2" color="text.secondary">
              Full admin analytics, user management, content moderation, and revenue dashboards are coming in the next release.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);
