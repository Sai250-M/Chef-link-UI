import React, { useEffect, useState } from "react";
import {
  Box, Card, CardContent, Typography, Button, Chip, Grid, Skeleton,
  Select, MenuItem, FormControl, InputLabel, IconButton, Menu, MenuItem as MuiMenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlined";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/common/PageHeader";
import { EmptyState } from "../../components/common/EmptyState";
import { StatusChip } from "../../components/common/StatusChip";
import { jobApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import dayjs from "dayjs";

export const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [menuAnchor, setMenuAnchor] = useState(null);

  const loadJobs = async (status) => {
    setLoading(true);
    try {
      const res = await jobApi.getMyJobs(status === "ALL" ? undefined : status);
      setJobs(res.data.data ?? []);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadJobs(); }, []);

  const handleDelete = async (jobId) => {
    setMenuAnchor(null);
    try {
      await jobApi.delete(jobId);
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
    } catch { /* toast */ }
  };

  return (
    <Box>
      <PageHeader
        title="Manage Jobs"
        subtitle="View and manage all your job postings"
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.RESTAURANT_DASHBOARD }, { label: "Jobs" }]}
        action={
          <Box display="flex" gap={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select label="Status" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); loadJobs(e.target.value); }}>
                <MenuItem value="ALL">All</MenuItem>
                {["DRAFT","OPEN","CLOSED","FILLED","CANCELLED"].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => navigate(ROUTES.RESTAURANT_POST_JOB)}>Post Job</Button>
          </Box>
        }
      />

      {loading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 3 }).map((_, i) => <Grid key={i} size={12}><Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} /></Grid>)}
        </Grid>
      ) : jobs.length === 0 ? (
        <EmptyState title="No job posts yet" description="Post your first job to start receiving applications from top culinary talent."
          action={{ label: "Post a Job", onClick: () => navigate(ROUTES.RESTAURANT_POST_JOB) }} />
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} flexWrap="wrap">
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
                      <Typography variant="subtitle1" fontWeight={700}>{job.title}</Typography>
                      <StatusChip status={job.status} type="job" />
                      <Chip label={job.role_type} size="small" variant="outlined" />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {job.city || "Remote"} · {job.openings} opening{job.openings !== 1 ? "s" : ""} · Posted {dayjs(job.created_at).format("DD MMM YYYY")}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Button size="small" variant="outlined" onClick={() => navigate(`${ROUTES.RESTAURANT_MANAGE_JOBS}/${job.id}/applications`)}>Applications</Button>
                    <IconButton size="small" onClick={(e) => setMenuAnchor({ el: e.currentTarget, jobId: job.id })}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Menu anchorEl={menuAnchor?.el} open={!!menuAnchor} onClose={() => setMenuAnchor(null)} slotProps={{ paper: { sx: { borderRadius: 2 } } }}>
        <MuiMenuItem onClick={() => setMenuAnchor(null)}>Edit</MuiMenuItem>
        <MuiMenuItem sx={{ color: "error.main" }} onClick={() => menuAnchor && handleDelete(menuAnchor.jobId)}>Delete</MuiMenuItem>
      </Menu>
    </Box>
  );
};
