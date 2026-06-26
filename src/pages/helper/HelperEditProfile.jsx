import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Button, Alert, Card, CardContent, Typography, Switch, FormControlLabel, Autocomplete, Chip, CircularProgress, InputAdornment } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "../../components/common/PageHeader";
import { helperApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import { INDIAN_CITIES } from "../../constants";

const schema = z.object({
  bio: z.string().max(1000).optional(),
  years_experience: z.coerce.number().int().min(0).max(60).optional(),
  hourly_rate: z.coerce.number().min(0).optional(),
  is_available: z.boolean().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const HelperEditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingSkills, setSavingSkills] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    Promise.all([helperApi.getMyProfile(), helperApi.getSkills()]).then(([profileRes, skillsRes]) => {
      const p = profileRes.data.data;
      setProfile(p);
      setAllSkills(skillsRes.data.data ?? []);
      setSelectedSkills(p.skills ?? []);
      reset({ bio: p.bio ?? "", years_experience: p.years_experience ?? undefined, hourly_rate: p.hourly_rate ?? undefined, is_available: p.is_available, city: p.city ?? "", state: p.state ?? "", country: p.country ?? "India" });
    }).finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true); setError(""); setSuccess("");
    try {
      await helperApi.update(data);
      setSuccess("Profile updated successfully!");
    } catch (err) { setError(err.response?.data?.message ?? "Update failed"); }
    finally { setSaving(false); }
  };

  const handleSaveSkills = async () => {
    setSavingSkills(true);
    try {
      await helperApi.updateSkills(selectedSkills.map((s) => ({ skill_id: s.id })));
      setSuccess("Skills updated!");
    } catch (err) { setError(err.response?.data?.message ?? "Failed to update skills"); }
    finally { setSavingSkills(false); }
  };

  if (loading) return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;

  return (
    <Box>
      <PageHeader title="Edit Profile" breadcrumbs={[{ label: "Dashboard", href: ROUTES.HELPER_DASHBOARD }, { label: "Edit Profile" }]} />
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
                    <TextField {...register("bio")} label="Bio / About Me" multiline rows={4} fullWidth placeholder="Tell restaurants about yourself..." error={!!errors.bio} helperText={errors.bio?.message} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField {...register("years_experience")} label="Years of Experience" type="number" fullWidth error={!!errors.years_experience} helperText={errors.years_experience?.message} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField {...register("hourly_rate")} label="Hourly Rate" type="number" fullWidth InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} error={!!errors.hourly_rate} helperText={errors.hourly_rate?.message} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller name="city" control={control} render={({ field }) => (
                      <Autocomplete options={INDIAN_CITIES} value={field.value ?? ""} onChange={(_, v) => field.onChange(v ?? "")} freeSolo renderInput={(params) => <TextField {...params} label="City" />} />
                    )} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField {...register("state")} label="State" fullWidth />
                  </Grid>
                  <Grid size={12}>
                    <Controller name="is_available" control={control} render={({ field }) => (
                      <FormControlLabel control={<Switch checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} color="success" />} label={<Typography variant="subtitle2">Available for Work</Typography>} />
                    )} />
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" size="large" disabled={saving} sx={{ mt: 4 }}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>Skills</Typography>
              <Typography variant="body2" color="text.secondary" mb={2.5}>Select the skills you possess to help restaurants find you.</Typography>
              <Autocomplete
                multiple
                options={allSkills}
                getOptionLabel={(o) => o.name}
                value={selectedSkills}
                onChange={(_, v) => setSelectedSkills(v)}
                isOptionEqualToValue={(a, b) => a.id === b.id}
                groupBy={(o) => o.category ?? "General"}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => <Chip label={option.name} {...getTagProps({ index })} size="small" />)
                }
                renderInput={(params) => <TextField {...params} label="Select Skills" placeholder="Search skills..." />}
              />
              <Button variant="outlined" sx={{ mt: 2 }} onClick={handleSaveSkills} disabled={savingSkills}>
                {savingSkills ? "Saving..." : "Save Skills"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
