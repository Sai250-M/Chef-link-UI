import React, { useState } from "react";
import {
  Box, Grid, TextField, Button, Alert, Card, CardContent, Typography,
  InputAdornment, MenuItem, Select, FormControl, InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
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
    status: z.enum(["DRAFT", "OPEN"]),
  })
  .refine(
    (d) => dayjs(d.event_date).isSameOrAfter(dayjs().startOf("day")),
    { message: "Date must be today or in the future", path: ["event_date"] }
  )
  .refine((d) => d.end_time > d.start_time, {
    message: "End time must be after start time",
    path: ["end_time"],
  });

export const CreateEvent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      country: "India",
      currency: "INR",
      price: 0,
      max_participants: 50,
      status: "OPEN",
      event_type: "",
      banner_url: "",
    },
  });

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const payload = { ...data };
      if (!payload.banner_url) delete payload.banner_url;
      const res = await eventApi.create(payload);
      const created = res.data.data ?? res.data;
      const newId = created?.id;
      if (newId) {
        navigate(ROUTES.RESTAURANT_EVENT_DETAIL.replace(":id", newId));
      } else {
        navigate(ROUTES.RESTAURANT_MY_EVENTS);
      }
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Create Event"
        subtitle="Fill in the details to publish a new event"
        breadcrumbs={[
          { label: "Dashboard", href: ROUTES.RESTAURANT_DASHBOARD },
          { label: "My Events", href: ROUTES.RESTAURANT_MY_EVENTS },
          { label: "Create" },
        ]}
      />

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          {/* Left column */}
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
                      placeholder="e.g. Chef's Table Gala, Annual Dinner"
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
                          {errors.event_type && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                              {errors.event_type.message}
                            </Typography>
                          )}
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
                          <InputLabel>Publish Status</InputLabel>
                          <Select {...field} label="Publish Status">
                            <MenuItem value="DRAFT">Save as Draft</MenuItem>
                            <MenuItem value="OPEN">Publish Now</MenuItem>
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
                      placeholder="Describe the event, cuisine, dress code, highlights..."
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
                      helperText={errors.price?.message ?? "Set 0 for free"}
                      InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 2 }}>
                    <TextField {...register("currency")} label="Currency" fullWidth defaultValue="INR" />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>Venue & Location</Typography>
                <Grid container spacing={2.5}>
                  <Grid size={12}>
                    <TextField
                      {...register("venue")}
                      label="Venue Name"
                      fullWidth
                      error={!!errors.venue}
                      helperText={errors.venue?.message}
                      placeholder="e.g. The Grand Ballroom, Rooftop Terrace"
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      {...register("address")}
                      label="Full Address"
                      fullWidth
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
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

          {/* Right column */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={0.5}>Banner Image</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Paste a URL to an image for the event banner.
                </Typography>
                <TextField
                  {...register("banner_url")}
                  label="Banner Image URL"
                  fullWidth
                  size="small"
                  error={!!errors.banner_url}
                  helperText={errors.banner_url?.message ?? "Optional — e.g. https://example.com/banner.jpg"}
                  placeholder="https://"
                />
              </CardContent>
            </Card>

            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
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
