import React, { useState, useEffect, useCallback } from "react";
import {
  Box, Container, Typography, Grid, TextField, InputAdornment,
  Stack, Paper, Select, MenuItem, FormControl, InputLabel,
  Divider, Slider, Button, Pagination, Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import PeopleIcon from "@mui/icons-material/People";
import { BRAND } from "../../../theme";
import { INDIAN_CITIES } from "../../../constants";
import { getPublicChefs } from "../services/chef.service";
import { PublicChefCard } from "../components/PublicChefCard";
import { BookingLoadingCards } from "../components/BookingLoadingCards";
import { BookingEmptyState } from "../components/BookingEmptyState";
import { useDebounce } from "../../../hooks/useDebounce";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const SORT_OPTIONS = [
  { value: "created_at:DESC", label: "Newest First" },
  { value: "hourly_rate:ASC", label: "Rate: Low to High" },
  { value: "hourly_rate:DESC", label: "Rate: High to Low" },
  { value: "years_experience:DESC", label: "Most Experienced" },
];

export const BrowsePublicChefs = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [availability, setAvailability] = useState("");
  const [rateRange, setRateRange] = useState([0, 10000]);
  const [sortValue, setSortValue] = useState("created_at:DESC");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 450);

  const fetchChefs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [sortBy, sortDir] = sortValue.split(":");
      const params = {
        page,
        limit: 9,
        sortBy,
        sortDir,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(city && { city }),
        ...(availability !== "" && { is_available: availability }),
        ...(rateRange[0] > 0 && { min_rate: rateRange[0] }),
        ...(rateRange[1] < 10000 && { max_rate: rateRange[1] }),
      };
      const res = await getPublicChefs(params);
      setChefs(res.data.data || []);
      setMeta(res.data.meta || { page: 1, totalPages: 1, total: 0 });
    } catch {
      setError("Failed to load chefs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, city, availability, rateRange, sortValue]);

  useEffect(() => {
    fetchChefs();
  }, [fetchChefs]);

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setAvailability("");
    setRateRange([0, 10000]);
    setSortValue("created_at:DESC");
    setPage(1);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(160deg, #0F172A 0%, #1E293B 100%)",
          py: { xs: 6, md: 9 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute", top: 0, right: 0, width: 400, height: 400,
            background: "radial-gradient(circle, rgba(224,123,57,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div {...fadeUp(0)}>
            <Typography variant="overline" sx={{ color: BRAND.orange, display: "block", mb: 1 }}>
              Chef Discovery
            </Typography>
            <Typography variant="h2" fontWeight={800} sx={{ color: "white", mb: 1.5 }}>
              Find Your Perfect Chef
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", mb: 4, maxWidth: 480 }}>
              Browse verified culinary professionals. Book directly — no account needed.
            </Typography>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <Paper
              sx={{
                display: "flex", alignItems: "center", borderRadius: 4,
                overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", maxWidth: 680,
              }}
            >
              <TextField
                fullWidth
                placeholder="Search by name, cuisine, or city..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start" sx={{ pl: 2 }}>
                      <SearchIcon sx={{ color: BRAND.slate }} />
                    </InputAdornment>
                  ),
                  sx: { py: 1.25, px: 1, fontSize: "1rem" },
                }}
              />
              <Button variant="contained" sx={{ borderRadius: 0, px: 4, py: 1.875, fontSize: "1rem", flexShrink: 0 }}>
                Search
              </Button>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Sidebar Filters */}
          <Grid size={{ xs: 12, md: 3 }}>
            <motion.div {...fadeUp(0.1)}>
              <Paper sx={{ borderRadius: 4, p: 3, border: "1px solid #E2E8F0", position: "sticky", top: 100 }}>
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <TuneIcon sx={{ color: BRAND.orange, fontSize: 20 }} />
                  <Typography variant="h6" fontWeight={700}>Filters</Typography>
                </Box>
                <Stack spacing={2.5}>
                  <FormControl fullWidth size="small">
                    <InputLabel>City</InputLabel>
                    <Select value={city} onChange={(e) => { setCity(e.target.value); setPage(1); }} label="City">
                      <MenuItem value="">All Cities</MenuItem>
                      {INDIAN_CITIES.slice(0, 20).map((c) => (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small">
                    <InputLabel>Availability</InputLabel>
                    <Select value={availability} onChange={(e) => { setAvailability(e.target.value); setPage(1); }} label="Availability">
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="true">Available Now</MenuItem>
                      <MenuItem value="false">Busy</MenuItem>
                    </Select>
                  </FormControl>
                  <Box>
                    <Typography variant="body2" fontWeight={600} mb={1.5}>
                      Hourly Rate: ₹{rateRange[0].toLocaleString()} – ₹{rateRange[1] >= 10000 ? "10,000+" : rateRange[1].toLocaleString()}
                    </Typography>
                    <Slider
                      value={rateRange}
                      onChange={(_, val) => setRateRange(val)}
                      onChangeCommitted={() => setPage(1)}
                      min={0}
                      max={10000}
                      step={500}
                      sx={{ color: BRAND.orange }}
                    />
                  </Box>
                  <Divider />
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={clearFilters}
                    sx={{ borderColor: "#E2E8F0", color: "text.secondary" }}
                  >
                    Clear Filters
                  </Button>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>

          {/* Chef Grid */}
          <Grid size={{ xs: 12, md: 9 }}>
            <motion.div {...fadeUp(0.15)}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PeopleIcon sx={{ color: BRAND.orange }} />
                  <Typography variant="h6" fontWeight={700}>
                    {loading ? "Loading..." : `${meta.total} chef${meta.total !== 1 ? "s" : ""} found`}
                  </Typography>
                </Box>
                <FormControl size="small" sx={{ minWidth: 190 }}>
                  <InputLabel>Sort by</InputLabel>
                  <Select value={sortValue} onChange={(e) => { setSortValue(e.target.value); setPage(1); }} label="Sort by">
                    {SORT_OPTIONS.map((o) => (
                      <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </motion.div>

            {loading ? (
              <BookingLoadingCards count={6} />
            ) : chefs.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {chefs.map((chef, i) => (
                    <Grid key={chef.id} size={{ xs: 12, sm: 6, xl: 4 }}>
                      <motion.div {...fadeUp(i * 0.05)}>
                        <PublicChefCard chef={chef} />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
                {meta.totalPages > 1 && (
                  <Box display="flex" justifyContent="center" mt={5}>
                    <Pagination
                      count={meta.totalPages}
                      page={page}
                      onChange={(_, v) => {
                        setPage(v);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
              </>
            ) : (
              <BookingEmptyState
                title="No chefs match your filters"
                description="Try broadening your search or clearing filters"
                action={clearFilters}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
