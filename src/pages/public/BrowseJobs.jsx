import React, { useEffect, useState, useCallback } from "react";
import {
  Box, Container, Grid, Typography, TextField, InputAdornment, Select,
  MenuItem, FormControl, InputLabel, Button, Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { JobCard } from "../../components/cards/JobCard";
import { EmptyState } from "../../components/common/EmptyState";
import { jobApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import { useDebounce } from "../../hooks/useDebounce";
import { useAuth } from "../../hooks/useAuth";

export const BrowseJobs = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleType, setRoleType] = useState("ALL");
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);
  const debouncedCity = useDebounce(city, 400);

  const loadJobs = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const res = await jobApi.search({
        search: debouncedSearch || undefined,
        role_type: roleType === "ALL" ? undefined : roleType,
        city: debouncedCity || undefined,
        page: p,
        limit: 12,
      });
      setJobs(res.data.data ?? []);
      setMeta(res.data.meta ?? null);
      setPage(p);
    } finally { setLoading(false); }
  }, [debouncedSearch, roleType, debouncedCity]);

  useEffect(() => { loadJobs(1); }, [loadJobs]);

  const canApply = isAuthenticated && (user?.role === "ROLE_CHEF" || user?.role === "ROLE_HELPER");

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "80vh", py: 6 }}>
      <Container maxWidth="lg">
        <Box mb={5}>
          <Typography variant="h3" fontWeight={800} mb={1}>Browse Jobs</Typography>
          <Typography variant="body1" color="text.secondary">Find your next culinary opportunity</Typography>
        </Box>

        <Box display="flex" gap={2} mb={4} flexWrap="wrap">
          <TextField
            placeholder="Search jobs, restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ flex: "1 1 280px" }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment> }}
          />
          <TextField
            placeholder="City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            size="small"
            sx={{ flex: "0 1 180px" }}
          />
          <FormControl size="small" sx={{ flex: "0 1 180px" }}>
            <InputLabel>Role Type</InputLabel>
            <Select label="Role Type" value={roleType} onChange={(e) => setRoleType(e.target.value)}>
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="CHEF">Chef</MenuItem>
              <MenuItem value="HELPER">Helper</MenuItem>
              <MenuItem value="BOTH">Both</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {meta && <Typography variant="body2" color="text.secondary" mb={3}>{meta.total} job{meta.total !== 1 ? "s" : ""} found</Typography>}

        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}><Skeleton variant="rectangular" height={340} sx={{ borderRadius: 3 }} /></Grid>
            ))}
          </Grid>
        ) : jobs.length === 0 ? (
          <EmptyState title="No jobs found" description="Try different search terms or check back later." variant="search" />
        ) : (
          <>
            <Grid container spacing={3}>
              {jobs.map((job) => (
                <Grid key={job.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <JobCard job={job} onView={() => {}} onApply={canApply ? () => navigate(ROUTES.LOGIN) : undefined} />
                </Grid>
              ))}
            </Grid>
            {meta && meta.totalPages > 1 && (
              <Box display="flex" justifyContent="center" gap={2} mt={6}>
                <Button variant="outlined" disabled={!meta.hasPrev} onClick={() => loadJobs(page - 1)}>Previous</Button>
                <Typography variant="body2" color="text.secondary" sx={{ alignSelf: "center" }}>
                  Page {meta.page} of {meta.totalPages}
                </Typography>
                <Button variant="outlined" disabled={!meta.hasNext} onClick={() => loadJobs(page + 1)}>Next</Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};
