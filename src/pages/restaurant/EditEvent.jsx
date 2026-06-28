import React, { useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Alert, Card, CardContent, Typography,
  InputAdornment, CircularProgress, MenuItem, Select, FormControl, InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../components/common/PageHeader";
import { eventApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import { EVENT_TYPE_OPTIONS } from "../../constants";

const schema = z
  .object({
    title: z.string().min(3, "At least 3 characters").max(255),
    description: z.string().min(20, "At least 20 characters").max(5000),
    event_type: z.string().min(1, "Required"),
    venue: z.string().min(2, "Required"),
    address: z.string().min(5, "Required"),
    city: z.string().min(2, "Required"),
    state: z.string().optional(),
    country: z.string().optional(),
    event_date: z.string().min(1, "Required"),
    start_time: z.string().min(1, "Required"),
    end_time: z.string().min(1, "Required"),
    max_participants: z.coerce.number().int().min(1, "Must be at least 1"),
    price: z.coerce.number().min(0, "Cannot be negative"),
    currency: z.string().optional(),
    banner_url: z.string().url("Enter a valid URL").optional().or(z.literal("")),
    status: z.enum(["DRAFT", "OPEN", "CLOSED", "CANCELLED"]),
  })
  .refine((d) => d.end_time > d.start_time, {
    message: "End time must be after start time",
    path: ["end_time"],
  });

export const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    eventApi
      .getById(id)
      .then((res) => {
        const ev = res.data.data ?? res.data;
        reset({
          title: ev.title ?? "",
          description: ev.description ?? "",
          event_type: ev.event_type ?? "",
          venue: ev.venue ?? "",
          address: ev.address ?? "",
          city: ev.city ?? "",
          state: ev.state ?? "",
          country: ev.country ?? "India",
          event_date: ev.event_date?.split("T")[0] ?? "",
          start_time: ev.start_time?.slice(0, 5) ?? "",
          end_time: ev.end_time?.slice(0, 5) ?? "",
          max_participants: ev.max_participants ?? 50,
          price: Number(ev.price ?? 0),
          currency: ev.currency ?? "INR",
          banner_url: ev.banner_url ?? "",
          status: ev.status ?? "OPEN",
        });
      })
      .catch(() => setLoadError("Failed to load event"))
      .finally(() => setFetching(false));
  }, [id, reset]);

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const payload = { ...data };
      if (!payload.banner_url) delete payload.banner_url;
      await eventApi.update(id, payload);
      navigate(ROUTES.RESTAURANT_MY_EVENTS);
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  if (loadError) return <Alert severity="error">{loadError}</Alert>;

  return (
    <Box>
      <PageHeader
        title="Edit Event"
        subtitle="Update the event details"
        breadcrumbs={[
          { label: "Dashboard", href: ROUTES.RESTAURANT_DASHBOARD },
          { label: "My Events", href: ROUTES.RESTAURANT_MY_EVENTS },
          { label: "Edit" },
        ]}
      />

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>Event Details</Typography>
                <Grid container spacing={2.5}>
                  <Grid size={12}>
                    <TextField
                      {...register("title")}
                      label="Event Title"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="event_type"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.event_type}>
                          <InputLabel>Event Type</InputLabel>
                          <Select {...field} label="Event Type">
                            {EVENT_TYPE_OPTIONS.map((t) => (
                              <MenuItem key={t} value={t}>{t}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>Status</InputLabel>
                          <Select {...field} label="Status">
                            <MenuItem value="DRAFT">Draft</MenuItem>
                            <MenuItem value="OPEN">Open</MenuItem>
                            <MenuItem value="CLOSED">Closed</MenuItem>
                            <MenuItem value="CANCELLED">Cancelled</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      {...register("description")}
                      label="Description"
                      multiline
                      rows={5}
                      fullWidth
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      {...register("event_date")}
                      label="Event Date"
                      type="date"
                      fullWidth
                      error={!!errors.event_date}
                      helperText={errors.event_date?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <TextField
                      {...register("start_time")}
                      label="Start Time"
                      type="time"
                      fullWidth
                      error={!!errors.start_time}
                      helperText={errors.start_time?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <TextField
                      {...register("end_time")}
                      label="End Time"
                      type="time"
                      fullWidth
                      error={!!errors.end_time}
                      helperText={errors.end_time?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      {...register("max_participants")}
                      label="Max Participants"
                      type="number"
                      fullWidth
                      error={!!errors.max_participants}
                      helperText={errors.max_participants?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      {...register("price")}
                      label="Entry Price"
                      type="number"
                      fullWidth
                      error={!!errors.price}
                      helperText={errors.price?.message}
                      InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 2 }}>
                    <TextField {...register("currency")} label="Currency" fullWidth />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>Venue & Location</Typography>
                <Grid container spacing={2.5}>
                  <Grid size={12}>
                    <TextField {...register("venue")} label="Venue Name" fullWidth error={!!errors.venue} helperText={errors.venue?.message} />
                  </Grid>
                  <Grid size={12}>
                    <TextField {...register("address")} label="Full Address" fullWidth error={!!errors.address} helperText={errors.address?.message} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField {...register("city")} label="City" fullWidth error={!!errors.city} helperText={errors.city?.message} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField {...register("state")} label="State" fullWidth />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField {...register("country")} label="Country" fullWidth />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={0.5}>Banner Image</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Paste a URL for the banner image.
                </Typography>
                <TextField
                  {...register("banner_url")}
                  label="Banner Image URL"
                  fullWidth
                  size="small"
                  error={!!errors.banner_url}
                  helperText={errors.banner_url?.message ?? "Optional"}
                  placeholder="https://"
                />
              </CardContent>
            </Card>

            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1.5 }}
              onClick={() => navigate(ROUTES.RESTAURANT_MY_EVENTS)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
