import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, TextField, InputAdornment, Skeleton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { PageHeader } from "../../components/common/PageHeader";
import { EmptyState } from "../../components/common/EmptyState";
import { ChefCard } from "../../components/cards/ChefCard";
import { chefApi, helperApi, restaurantApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import { useDebounce } from "../../hooks/useDebounce";

export const Candidates = () => {
  const [chefs, setChefs] = useState([]);
  const [helpers, setHelpers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("chefs");
  const debouncedSearch = useDebounce(search, 400);

  const load = async () => {
    setLoading(true);
    try {
      if (tab === "chefs") {
        const res = await chefApi.search({ search: debouncedSearch || undefined, is_available: "true" });
        setChefs(res.data.data ?? []);
      } else {
        const res = await helperApi.search({ search: debouncedSearch || undefined, is_available: "true" });
        setHelpers(res.data.data ?? []);
      }
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [tab, debouncedSearch]);

  const handleSave = async (profileId, role) => {
    try { await restaurantApi.saveProfile(profileId, role); } catch { /* toast */ }
  };

  const profiles = tab === "chefs" ? chefs : helpers;

  return (
    <Box>
      <PageHeader title="Browse Talent" subtitle="Find the perfect chef or helper for your restaurant"
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.RESTAURANT_DASHBOARD }, { label: "Candidates" }]} />

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <Box display="flex" gap={1}>
          <Button variant={tab === "chefs" ? "contained" : "outlined"} onClick={() => setTab("chefs")}>Chefs</Button>
          <Button variant={tab === "helpers" ? "contained" : "outlined"} onClick={() => setTab("helpers")}>Helpers</Button>
        </Box>
        <TextField size="small" placeholder={`Search ${tab}...`} value={search} onChange={(e) => setSearch(e.target.value)} sx={{ minWidth: 280 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment> }} />
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, i) => <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}><Skeleton variant="rectangular" height={320} sx={{ borderRadius: 3 }} /></Grid>)}
        </Grid>
      ) : profiles.length === 0 ? (
        <EmptyState title={`No ${tab} found`} description="Try adjusting your search filters." variant="search" />
      ) : (
        <Grid container spacing={3}>
          {profiles.map((profile) => (
            <Grid key={profile.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ChefCard chef={profile} onSave={() => handleSave(profile.user_id, tab === "chefs" ? "ROLE_CHEF" : "ROLE_HELPER")} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
