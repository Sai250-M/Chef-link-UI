import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Button, Alert, Card, CardContent, Typography, Autocomplete, CircularProgress } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "../../components/common/PageHeader";
import { restaurantApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import { INDIAN_CITIES } from "../../constants";

const schema = z.object({
  name: z.string().min(2).max(255).optional(),
  description: z.string().max(2000).optional(),
  cuisine_type: z.string().max(255).optional(),
  address: z.string().max(500).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  website: z.string().optional(),
  established_year: z.coerce.number().int().min(1800).max(2100).optional(),
  seating_capacity: z.coerce.number().int().min(1).optional(),
});

export const RestaurantEditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    restaurantApi.getMyProfile().then((res) => {
      const p = res.data.data;
      reset({ name: p.name ?? "", description: p.description ?? "", cuisine_type: p.cuisine_type ?? "", address: p.address ?? "", city: p.city ?? "", state: p.state ?? "", pincode: p.pincode ?? "", website: p.website ?? "", established_year: p.established_year ?? undefined, seating_capacity: p.seating_capacity ?? undefined });
    }).finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true); setError(""); setSuccess("");
    try {
      await restaurantApi.update(data);
      setSuccess("Profile updated successfully!");
    } catch (err) { setError(err.response?.data?.message ?? "Update failed"); }
    finally { setSaving(false); }
  };

  if (loading) return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;

  return (
    <Box>
      <PageHeader title="Edit Restaurant Profile" breadcrumbs={[{ label: "Dashboard", href: ROUTES.RESTAURANT_DASHBOARD }, { label: "Edit Profile" }]} />
      {success && <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess("")}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>Restaurant Details</Typography>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField {...register("name")} label="Restaurant Name" fullWidth error={!!errors.name} helperText={errors.name?.message} /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField {...register("cuisine_type")} label="Cuisine Type" fullWidth placeholder="e.g. North Indian, Continental" /></Grid>
                  <Grid size={12}><TextField {...register("description")} label="About Your Restaurant" multiline rows={4} fullWidth placeholder="Tell chefs and helpers about your restaurant..." /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField {...register("established_year")} label="Established Year" type="number" fullWidth /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField {...register("seating_capacity")} label="Seating Capacity" type="number" fullWidth /></Grid>
                  <Grid size={12}><TextField {...register("website")} label="Website" fullWidth placeholder="https://yourrestaurant.com" /></Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>Location</Typography>
                <Grid container spacing={2.5}>
                  <Grid size={12}><TextField {...register("address")} label="Full Address" multiline rows={2} fullWidth /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller name="city" control={control} render={({ field }) => (
                      <Autocomplete options={INDIAN_CITIES} value={field.value ?? ""} onChange={(_, v) => field.onChange(v ?? "")} freeSolo renderInput={(params) => <TextField {...params} label="City" />} />
                    )} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField {...register("state")} label="State" fullWidth /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField {...register("pincode")} label="Pincode" fullWidth /></Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button type="submit" variant="contained" size="large" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
