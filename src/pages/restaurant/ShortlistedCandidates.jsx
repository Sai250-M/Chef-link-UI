import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Avatar, Button, Chip, CircularProgress } from "@mui/material";
import { PageHeader } from "../../components/common/PageHeader";
import { EmptyState } from "../../components/common/EmptyState";
import { restaurantApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";

export const ShortlistedCandidates = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restaurantApi.getSavedProfiles().then((res) => setSaved(res.data.data ?? [])).finally(() => setLoading(false));
  }, []);

  const handleRemove = async (profileId) => {
    try {
      await restaurantApi.unsaveProfile(profileId);
      setSaved((prev) => prev.filter((p) => p.profile_id !== profileId));
    } catch { /* toast */ }
  };

  if (loading) return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;

  return (
    <Box>
      <PageHeader title="Shortlisted Talent" subtitle="Profiles you've saved for later consideration"
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.RESTAURANT_DASHBOARD }, { label: "Shortlisted" }]} />
      {saved.length === 0 ? (
        <EmptyState title="No saved profiles" description="Browse talent and save profiles you're interested in."
          action={{ label: "Browse Talent", onClick: () => window.location.href = ROUTES.RESTAURANT_CANDIDATES }} />
      ) : (
        <Grid container spacing={3}>
          {saved.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" gap={2} alignItems="center" mb={2}>
                    <Avatar sx={{ width: 48, height: 48 }}>{p.first_name?.[0]}{p.last_name?.[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>{p.first_name} {p.last_name}</Typography>
                      <Chip label={p.role?.replace("ROLE_", "")} size="small" color="primary" />
                    </Box>
                  </Box>
                  <Typography variant="caption" color="text.secondary">{p.email}</Typography>
                  <Box display="flex" gap={1} mt={2}>
                    <Button size="small" variant="outlined" color="error" onClick={() => handleRemove(p.profile_id)}>Remove</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
