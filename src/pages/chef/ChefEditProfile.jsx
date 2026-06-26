import React, { useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Alert, Card, CardContent,
  Typography, Switch, FormControlLabel, Autocomplete, Chip, Divider,
  CircularProgress, InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "../../components/common/PageHeader";
import { chefApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import { INDIAN_CITIES } from "../../constants";

const schema = z.object({
  bio: z.string().max(1000).optional(),
  years_experience: z.coerce.number().int().min(0).max(60).optional(),
  specialization: z.string().max(255).optional(),
  hourly_rate: z.coerce.number().min(0).optional(),
  is_available: z.boolean().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const ChefEditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [allCuisines, setAllCuisines] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingCuisines, setSavingCuisines] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, cuisinesRes] = await Promise.all([
          chefApi.getMyProfile(),
          chefApi.getCuisines(),
        ]);
        const p = profileRes.data.data;
        setProfile(p);
        setAllCuisines(cuisinesRes.data.data ?? []);
        setSelectedCuisines(p.cuisines ?? []);
        reset({
          bio: p.bio ?? "",
          years_experience: p.years_experience ?? undefined,
          specialization: p.specialization ?? "",
          hourly_rate: p.hourly_rate ?? undefined,
          is_available: p.is_available,
          city: p.city ?? "",
          state: p.state ?? "",
          country: p.country ?? "India",
        });
      } finally { setLoading(false); }
    };
    load();
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true); setError(""); setSuccess("");
    try {
      await chefApi.update(data);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message ?? "Update failed");
    } finally { setSaving(false); }
  };

  const handleSaveCuisines = async () => {
    setSavingCuisines(true);
    try {
      await chefApi.updateCuisines(selectedCuisines.map((c) => c.id));
      setSuccess("Cuisines updated!");
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to update cuisines");
    } finally { setSavingCuisines(false); }
  };

  if (loading) return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;

  return (
    <Box>
      <PageHeader
        title="Edit Profile"
        subtitle="Keep your profile up to date to attract more opportunities"
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.CHEF_DASHBOARD }, { label: "Edit Profile" }]}
      />

      {success && <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess("")}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>{error}</Alert>}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={700} mb={3}>Basic Information</Typography>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2.5}>
                  <Grid size={12}>
                    <TextField {...register("bio")} label="Bio / About Me" multiline rows={4} fullWidth placeholder="Tell restaurants about your culinary journey..." error={!!errors.bio} helperText={errors.bio?.message} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField {...register("specialization")} label="Specialization" fullWidth placeholder="e.g. Pan-Asian, Tandoor, Pastry" error={!!errors.specialization} helperText={errors.specialization?.message} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField {...register("years_experience")} label="Years of Experience" type="number" fullWidth error={!!errors.years_experience} helperText={errors.years_experience?.message} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField {...register("hourly_rate")} label="Hourly Rate" type="number" fullWidth InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} error={!!errors.hourly_rate} helperText={errors.hourly_rate?.message ?? "Your expected rate per hour"} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller name="city" control={control} render={({ field }) => (
                      <Autocomplete options={INDIAN_CITIES} value={field.value ?? ""} onChange={(_, v) => field.onChange(v ?? "")} freeSolo renderInput={(params) => (
                        <TextField {...params} label="City" error={!!errors.city} helperText={errors.city?.message} />
                      )} />
                    )} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField {...register("state")} label="State" fullWidth />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField {...register("country")} label="Country" fullWidth />
                  </Grid>
                  <Grid size={12}>
                    <Controller name="is_available" control={control} render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} color="success" />}
                        label={
                          <Box>
                            <Typography variant="subtitle2">Available for Work</Typography>
                            <Typography variant="caption" color="text.secondary">Toggle to show/hide your availability on the platform</Typography>
                          </Box>
                        }
                      />
                    )} />
                  </Grid>
                </Grid>
                <Box mt={4}>
                  <Button type="submit" variant="contained" size="large" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>Cuisines</Typography>
              <Typography variant="body2" color="text.secondary" mb={2.5}>Select the cuisines you specialize in.</Typography>
              <Autocomplete
                multiple
                options={allCuisines}
                getOptionLabel={(o) => o.name}
                value={selectedCuisines}
                onChange={(_, v) => setSelectedCuisines(v)}
                isOptionEqualToValue={(a, b) => a.id === b.id}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option.name} {...getTagProps({ index })} color="primary" size="small" />
                  ))
                }
                renderInput={(params) => <TextField {...params} label="Select Cuisines" placeholder="Search cuisines..." />}
              />
              <Button variant="outlined" sx={{ mt: 2 }} onClick={handleSaveCuisines} disabled={savingCuisines}>
                {savingCuisines ? "Saving..." : "Save Cuisines"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Profile Tips</Typography>
              <Box display="flex" flexDirection="column" gap={1.5}>
                {[
                  "A detailed bio gets 3x more views",
                  "Upload your certificates to build trust",
                  "Set your rate accurately to attract the right clients",
                  "Keep your availability up to date",
                  "Add all cuisines you can cook",
                ].map((tip, i) => (
                  <Box key={i} display="flex" gap={1.5} alignItems="flex-start">
                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0, mt: 0.75 }} />
                    <Typography variant="body2" color="text.secondary">{tip}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
