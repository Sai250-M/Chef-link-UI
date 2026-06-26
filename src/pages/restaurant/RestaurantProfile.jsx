import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, Avatar, Divider, LinearProgress, CircularProgress, Link } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/common/PageHeader";
import { restaurantApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";

export const RestaurantProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    restaurantApi.getMyProfile().then((res) => setProfile(res.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;
  if (!profile) return null;

  return (
    <Box>
      <PageHeader title="Restaurant Profile" breadcrumbs={[{ label: "Dashboard", href: ROUTES.RESTAURANT_DASHBOARD }, { label: "Profile" }]}
        action={<Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate(ROUTES.RESTAURANT_EDIT_PROFILE)}>Edit Profile</Button>}
      />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <Avatar sx={{ width: 96, height: 96, fontSize: "2rem", fontWeight: 700, mx: "auto", mb: 2 }}>{profile.name?.[0]}</Avatar>
              <Typography variant="h5" fontWeight={700}>{profile.name}</Typography>
              {profile.cuisine_type && <Typography variant="body2" color="text.secondary">{profile.cuisine_type}</Typography>}
              {profile.city && (
                <Box display="flex" alignItems="center" justifyContent="center" gap={0.5} mt={1}>
                  <LocationOnIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary">{profile.city}, {profile.country}</Typography>
                </Box>
              )}
              {profile.website && (
                <Box display="flex" alignItems="center" justifyContent="center" gap={0.5} mt={0.5}>
                  <LanguageIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                  <Link href={profile.website} target="_blank" rel="noopener" variant="caption">{profile.website}</Link>
                </Box>
              )}
              <Divider sx={{ my: 2.5 }} />
              {profile.established_year && <Typography variant="body2" color="text.secondary">Est. {profile.established_year}</Typography>}
              {profile.seating_capacity && <Typography variant="body2" color="text.secondary">{profile.seating_capacity} seats</Typography>}
              <Divider sx={{ my: 2.5 }} />
              <Box textAlign="left">
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                  <Typography variant="caption" color="text.secondary">Profile Strength</Typography>
                  <Typography variant="caption" fontWeight={600} color="primary.main">{profile.profile_completion_pct}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={profile.profile_completion_pct} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>About</Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                {profile.description || "No description added. Click Edit Profile to tell your story."}
              </Typography>
              {profile.address && (
                <>
                  <Divider sx={{ my: 2.5 }} />
                  <Typography variant="subtitle2" fontWeight={700} mb={1}>Address</Typography>
                  <Typography variant="body2" color="text.secondary">{profile.address}</Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
