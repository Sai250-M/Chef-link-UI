import React, { useEffect, useState } from "react";
import {
  Box, Grid, Card, CardContent, Typography, Chip, Avatar, Button,
  Divider, LinearProgress, CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/common/PageHeader";
import { chefApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";

export const ChefProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    chefApi.getMyProfile().then((res) => setProfile(res.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;
  if (!profile) return null;

  return (
    <Box>
      <PageHeader
        title="My Profile"
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.CHEF_DASHBOARD }, { label: "Profile" }]}
        action={<Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate(ROUTES.CHEF_EDIT_PROFILE)}>Edit Profile</Button>}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <Avatar sx={{ width: 96, height: 96, fontSize: "2rem", fontWeight: 700, mx: "auto", mb: 2 }}>
                {profile.first_name?.[0]}{profile.last_name?.[0]}
              </Avatar>
              <Typography variant="h5" fontWeight={700}>{profile.first_name} {profile.last_name}</Typography>
              <Typography variant="body2" color="text.secondary">{profile.specialization || "Chef"}</Typography>
              {profile.city && (
                <Box display="flex" alignItems="center" justifyContent="center" gap={0.5} mt={1}>
                  <LocationOnIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary">{profile.city}, {profile.country}</Typography>
                </Box>
              )}
              <Chip label={profile.is_available ? "Available" : "Not Available"} color={profile.is_available ? "success" : "default"} sx={{ mt: 2 }} />
              <Divider sx={{ my: 2.5 }} />
              <Box display="flex" justifyContent="space-around">
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight={800}>{profile.years_experience ?? 0}</Typography>
                  <Typography variant="caption" color="text.secondary">Years Exp.</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight={800}>₹{profile.hourly_rate ?? 0}</Typography>
                  <Typography variant="caption" color="text.secondary">Per Hour</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight={800}>{profile.certificates?.length ?? 0}</Typography>
                  <Typography variant="caption" color="text.secondary">Certs</Typography>
                </Box>
              </Box>
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
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>About</Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                {profile.bio || "No bio added yet. Click Edit Profile to add your story."}
              </Typography>
            </CardContent>
          </Card>

          {profile.cuisines?.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>Cuisines</Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {profile.cuisines.map((c) => (
                    <Chip key={c.id} label={c.name} color="primary" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {profile.certificates?.length > 0 && (
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>Certificates</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {profile.certificates.map((cert) => (
                    <Box key={cert.id} display="flex" alignItems="center" gap={2} sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
                      <VerifiedIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>{cert.title}</Typography>
                        {cert.issuer && (
                          <Typography variant="caption" color="text.secondary">{cert.issuer} {cert.issued_year ? `(${cert.issued_year})` : ""}</Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
