import React, { useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Alert, Card, CardContent, Typography,
  Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel,
  Autocomplete, Chip, InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/common/PageHeader";
import { jobApi, chefApi, helperApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import { SALARY_TYPES, ROLE_TYPE_OPTIONS, INDIAN_CITIES } from "../../constants";

const schema = z.object({
  title: z.string().min(5, "At least 5 characters").max(255),
  description: z.string().min(20, "At least 20 characters").max(5000),
  role_type: z.enum(["CHEF", "HELPER", "BOTH"]),
  salary_min: z.coerce.number().min(0).optional(),
  salary_max: z.coerce.number().min(0).optional(),
  salary_type: z.enum(["HOURLY", "DAILY", "MONTHLY", "FIXED"]),
  city: z.string().optional(),
  location: z.string().optional(),
  is_remote: z.boolean(),
  experience_required: z.coerce.number().int().min(0).optional(),
  openings: z.coerce.number().int().min(1),
  status: z.enum(["DRAFT", "OPEN"]),
  deadline: z.string().optional(),
});

export const PostJob = () => {
  const navigate = useNavigate();
  const [allCuisines, setAllCuisines] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role_type: "BOTH", salary_type: "MONTHLY", is_remote: false, openings: 1, status: "OPEN" },
  });

  const isRemote = watch("is_remote");
  const roleType = watch("role_type");

  useEffect(() => {
    Promise.all([chefApi.getCuisines(), helperApi.getSkills()])
      .then(([c, s]) => { setAllCuisines(c.data.data ?? []); setAllSkills(s.data.data ?? []); });
  }, []);

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      await jobApi.create({ ...data, cuisine_ids: selectedCuisines.map((c) => c.id), skill_ids: selectedSkills.map((s) => s.id) });
      navigate(ROUTES.RESTAURANT_MANAGE_JOBS);
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to create job post");
    } finally { setLoading(false); }
  };

  return (
    <Box>
      <PageHeader title="Post a Job" subtitle="Fill in the details to attract the right talent"
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.RESTAURANT_DASHBOARD }, { label: "Post Job" }]} />
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>Job Details</Typography>
                <Grid container spacing={2.5}>
                  <Grid size={12}>
                    <TextField {...register("title")} label="Job Title" fullWidth error={!!errors.title} helperText={errors.title?.message} placeholder="e.g. Head Chef, Sous Chef, Kitchen Helper" />
                  </Grid>
                  <Grid size={12}>
                    <TextField {...register("description")} label="Job Description" multiline rows={6} fullWidth error={!!errors.description} helperText={errors.description?.message} placeholder="Describe the role, responsibilities, requirements..." />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth error={!!errors.role_type}>
                      <InputLabel>Role Type</InputLabel>
                      <Controller name="role_type" control={control} render={({ field }) => (
                        <Select {...field} label="Role Type">
                          {ROLE_TYPE_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                        </Select>
                      )} />
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField {...register("experience_required")} label="Min. Experience (years)" type="number" fullWidth />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField {...register("openings")} label="Number of Openings" type="number" fullWidth error={!!errors.openings} helperText={errors.openings?.message} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField {...register("deadline")} label="Application Deadline" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>Compensation</Typography>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth>
                      <InputLabel>Salary Type</InputLabel>
                      <Controller name="salary_type" control={control} render={({ field }) => (
                        <Select {...field} label="Salary Type">
                          {SALARY_TYPES.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                        </Select>
                      )} />
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField {...register("salary_min")} label="Min. Salary" type="number" fullWidth InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField {...register("salary_max")} label="Max. Salary" type="number" fullWidth InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>Location</Typography>
                <Grid container spacing={2.5}>
                  <Grid size={12}>
                    <Controller name="is_remote" control={control} render={({ field }) => (
                      <FormControlLabel control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />} label="Remote / Flexible Location" />
                    )} />
                  </Grid>
                  {!isRemote && (
                    <>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller name="city" control={control} render={({ field }) => (
                          <Autocomplete options={INDIAN_CITIES} value={field.value ?? ""} onChange={(_, v) => field.onChange(v ?? "")} freeSolo renderInput={(params) => <TextField {...params} label="City" />} />
                        )} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField {...register("location")} label="Specific Location / Area" fullWidth />
                      </Grid>
                    </>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={1}>Publish Status</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>Save as draft or publish immediately.</Typography>
                <Controller name="status" control={control} render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      <MenuItem value="DRAFT">Save as Draft</MenuItem>
                      <MenuItem value="OPEN">Publish Now</MenuItem>
                    </Select>
                  </FormControl>
                )} />
              </CardContent>
            </Card>

            {(roleType === "CHEF" || roleType === "BOTH") && (
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={700} mb={1}>Required Cuisines</Typography>
                  <Autocomplete multiple options={allCuisines} getOptionLabel={(o) => o.name} value={selectedCuisines} onChange={(_, v) => setSelectedCuisines(v)} isOptionEqualToValue={(a, b) => a.id === b.id}
                    renderTags={(value, getTagProps) => value.map((option, index) => <Chip label={option.name} {...getTagProps({ index })} size="small" color="primary" />)}
                    renderInput={(params) => <TextField {...params} label="Cuisines" placeholder="Search..." />}
                  />
                </CardContent>
              </Card>
            )}

            {(roleType === "HELPER" || roleType === "BOTH") && (
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={700} mb={1}>Required Skills</Typography>
                  <Autocomplete multiple options={allSkills} getOptionLabel={(o) => o.name} value={selectedSkills} onChange={(_, v) => setSelectedSkills(v)} isOptionEqualToValue={(a, b) => a.id === b.id}
                    renderTags={(value, getTagProps) => value.map((option, index) => <Chip label={option.name} {...getTagProps({ index })} size="small" />)}
                    renderInput={(params) => <TextField {...params} label="Skills" placeholder="Search..." />}
                  />
                </CardContent>
              </Card>
            )}

            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
              {loading ? "Posting..." : "Post Job"}
            </Button>
            <Button variant="outlined" fullWidth sx={{ mt: 1.5 }} onClick={() => navigate(ROUTES.RESTAURANT_MANAGE_JOBS)}>Cancel</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
