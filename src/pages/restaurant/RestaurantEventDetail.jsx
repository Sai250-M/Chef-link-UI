import React, { useEffect, useState } from "react";
import {
  Box, Grid, Card, CardContent, Typography, Button, Alert,
  Divider, Chip, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Select, MenuItem,
  FormControl, Avatar, Skeleton,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../components/common/PageHeader";
import { EventBanner } from "../../components/events/EventBanner";
import { EventStatusBadge } from "../../components/events/EventStatusBadge";
import { EmptyState } from "../../components/common/EmptyState";
import { eventApi, eventBookingApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";

const BOOKING_STATUSES = ["CONFIRMED", "CANCELLED", "ATTENDED"];

export const RestaurantEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    // GET /events/:id (public)
    eventApi
      .getById(id)
      .then((res) => setEvent(res.data.data ?? res.data))
      .catch(() => setError("Failed to load event"))
      .finally(() => setLoading(false));

    // GET /events/:eventId/bookings (restaurant owner)
    eventApi
      .getEventBookings(id)
      .then((res) => setBookings(res.data.data ?? []))
      .catch(() => {})
      .finally(() => setBookingsLoading(false));
  }, [id]);

  const handleStatusChange = async (bookingId, booking_status) => {
    setUpdatingId(bookingId);
    try {
      // PATCH /event-bookings/:id/status
      await eventBookingApi.updateStatus(bookingId, { booking_status });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, booking_status } : b))
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const editPath = ROUTES.RESTAURANT_EDIT_EVENT.replace(":id", id);

  if (loading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 3, mb: 3 }} />
        <Skeleton variant="text" width="50%" height={40} />
        <Skeleton variant="text" width="30%" height={28} sx={{ mt: 1 }} />
      </Box>
    );
  }

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!event) return null;

  const spotsLeft = event.max_participants - (event.current_participants ?? 0);

  return (
    <Box>
      <PageHeader
        title={event.title}
        breadcrumbs={[
          { label: "Dashboard", href: ROUTES.RESTAURANT_DASHBOARD },
          { label: "My Events", href: ROUTES.RESTAURANT_MY_EVENTS },
          { label: event.title },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(editPath)}
          >
            Edit Event
          </Button>
        }
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ mb: 3 }}>
            <EventBanner src={event.banner_url} title={event.title} height={280} />
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={1.5} mb={2} flexWrap="wrap">
                <EventStatusBadge status={event.status} />
                {event.event_type && <Chip label={event.event_type} size="small" />}
                <Chip
                  label={`${event.current_participants ?? 0} / ${event.max_participants} booked`}
                  size="small"
                  color={spotsLeft <= 0 ? "error" : "default"}
                  variant="outlined"
                />
                <Chip
                  label={Number(event.price) === 0 ? "Free" : `₹${Number(event.price).toLocaleString()}`}
                  size="small"
                  color="primary"
                />
              </Box>
              <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                {event.description}
              </Typography>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Bookings ({bookings.length})
              </Typography>

              {bookingsLoading ? (
                <Box display="flex" flexDirection="column" gap={1}>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} variant="rectangular" height={52} sx={{ borderRadius: 1 }} />
                  ))}
                </Box>
              ) : bookings.length === 0 ? (
                <EmptyState
                  title="No bookings yet"
                  description="Bookings will appear here once people register."
                />
              ) : (
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Attendee</TableCell>
                        <TableCell>People</TableCell>
                        <TableCell>Booked On</TableCell>
                        <TableCell>Payment</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id} hover>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1.5}>
                              <Avatar sx={{ width: 32, height: 32, fontSize: "0.8rem" }}>
                                {booking.first_name?.[0]}{booking.last_name?.[0]}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight={600}>
                                  {booking.first_name} {booking.last_name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {booking.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{booking.number_of_people ?? 1}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {dayjs(booking.booking_date ?? booking.created_at).format("DD MMM YYYY")}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={booking.payment_status ?? "PENDING"}
                              size="small"
                              color={booking.payment_status === "PAID" ? "success" : "default"}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <EventStatusBadge status={booking.booking_status} type="booking" />
                          </TableCell>
                          <TableCell>
                            <FormControl
                              size="small"
                              sx={{ minWidth: 130 }}
                              disabled={updatingId === booking.id}
                            >
                              <Select
                                value={booking.booking_status}
                                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                sx={{ fontSize: "0.8125rem" }}
                              >
                                {BOOKING_STATUSES.map((s) => (
                                  <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Event Info</Typography>
              <Stack spacing={2}>
                <Box display="flex" alignItems="flex-start" gap={1.5}>
                  <CalendarMonthIcon sx={{ fontSize: 20, color: "primary.main", mt: 0.2 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>Date & Time</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dayjs(event.event_date).format("DD MMMM YYYY")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.start_time?.slice(0, 5)} – {event.end_time?.slice(0, 5)}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="flex-start" gap={1.5}>
                  <LocationOnIcon sx={{ fontSize: 20, color: "primary.main", mt: 0.2 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>Venue</Typography>
                    <Typography variant="body2" color="text.secondary">{event.venue}</Typography>
                    <Typography variant="body2" color="text.secondary">{event.address}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.city}{event.state ? `, ${event.state}` : ""}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" gap={1.5}>
                  <PeopleIcon sx={{ fontSize: 20, color: "primary.main" }} />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>Capacity</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {spotsLeft} of {event.max_participants} spots remaining
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" gap={1.5}>
                  <AttachMoneyIcon sx={{ fontSize: 20, color: "primary.main" }} />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>Entry Price</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Number(event.price) === 0
                        ? "Free"
                        : `${event.currency ?? "₹"}${Number(event.price).toLocaleString()} per person`}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
