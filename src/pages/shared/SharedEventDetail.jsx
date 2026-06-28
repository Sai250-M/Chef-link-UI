import React, { useEffect, useState } from "react";
import {
  Box, Grid, Card, CardContent, Typography, Button,
  Alert, Divider, Chip, Stack, Skeleton,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PageHeader } from "../../components/common/PageHeader";
import { EventBanner } from "../../components/events/EventBanner";
import { EventStatusBadge } from "../../components/events/EventStatusBadge";
import { BookingModal } from "../../components/events/BookingModal";
import { eventApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";

export const SharedEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isChef = user?.role === "ROLE_CHEF";

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingError, setBookingError] = useState("");

  const eventsRoute = isChef ? ROUTES.CHEF_EVENTS : ROUTES.HELPER_EVENTS;
  const myBookingsRoute = isChef ? ROUTES.CHEF_MY_BOOKINGS : ROUTES.HELPER_MY_BOOKINGS;
  const dashboardRoute = isChef ? ROUTES.CHEF_DASHBOARD : ROUTES.HELPER_DASHBOARD;

  useEffect(() => {
    // GET /events/:id (public, no auth required)
    eventApi
      .getById(id)
      .then((res) => setEvent(res.data.data ?? res.data))
      .catch(() => setError("Failed to load event details"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async ({ number_of_people, special_request }) => {
    setBookingLoading(true);
    setBookingError("");
    try {
      // POST /events/:eventId/book
      const res = await eventApi.book(id, { number_of_people, special_request });
      setBookingResult(res.data.data ?? res.data);
      setModalOpen(false);
      setEvent((prev) =>
        prev ? { ...prev, current_participants: (prev.current_participants ?? 0) + (number_of_people ?? 1) } : prev
      );
    } catch (err) {
      setBookingError(err.response?.data?.message ?? "Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3, mb: 3 }} />
        <Skeleton variant="text" width="50%" height={40} />
        <Skeleton variant="text" width="30%" height={28} sx={{ mt: 1 }} />
        {[1, 2, 3].map((i) => <Skeleton key={i} variant="text" height={22} sx={{ mt: 0.5 }} />)}
      </Box>
    );
  }

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!event) return null;

  const spotsLeft = event.max_participants - (event.current_participants ?? 0);
  const isFull = spotsLeft <= 0;
  const isPast = dayjs(event.event_date).isBefore(dayjs(), "day");
  const isOpen = event.status === "OPEN";
  const alreadyBooked = !!bookingResult;
  const canBook = isOpen && !isFull && !isPast && !alreadyBooked;

  return (
    <Box>
      <PageHeader
        title={event.title}
        breadcrumbs={[
          { label: "Dashboard", href: dashboardRoute },
          { label: "Events", href: eventsRoute },
          { label: event.title },
        ]}
      />

      {bookingResult && (
        <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mb: 3 }}>
          Booking submitted successfully! Status: <strong>{bookingResult.booking_status}</strong>.{" "}
          <Typography
            component="span"
            variant="body2"
            sx={{ color: "inherit", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate(myBookingsRoute)}
          >
            View My Bookings →
          </Typography>
        </Alert>
      )}

      {bookingError && <Alert severity="error" sx={{ mb: 3 }}>{bookingError}</Alert>}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ mb: 3 }}>
            <EventBanner src={event.banner_url} title={event.title} height={300} />
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={1.5} mb={2.5} flexWrap="wrap">
                {event.status && <EventStatusBadge status={event.status} />}
                {event.event_type && <Chip label={event.event_type} size="small" />}
                <Chip
                  label={isFull ? "Fully Booked" : `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} left`}
                  size="small"
                  color={isFull ? "error" : "success"}
                  variant="outlined"
                />
                <Chip
                  label={Number(event.price) === 0 ? "Free" : `₹${Number(event.price).toLocaleString()}`}
                  size="small"
                  color="primary"
                />
              </Box>

              {event.restaurant_name && (
                <Typography variant="body2" color="text.secondary" mb={2} fontStyle="italic">
                  Hosted by {event.restaurant_name}
                </Typography>
              )}

              <Typography variant="h6" fontWeight={700} mb={1.5}>About this Event</Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.85} whiteSpace="pre-line">
                {event.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Booking sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ position: { md: "sticky" }, top: { md: 90 } }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight={800} color="primary.main" mb={0.5}>
                {Number(event.price) === 0 ? "Free" : `₹${Number(event.price).toLocaleString()}`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {event.currency ?? "INR"} · per person
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.5} mb={2.5}>
                <Box display="flex" alignItems="flex-start" gap={1.5}>
                  <CalendarMonthIcon sx={{ fontSize: 18, color: "primary.main", mt: 0.2 }} />
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
                <Box display="flex" alignItems="flex-start" gap={1.5}>
                  <LocationOnIcon sx={{ fontSize: 18, color: "primary.main", mt: 0.2 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>Venue</Typography>
                    <Typography variant="body2" color="text.secondary">{event.venue}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.city}{event.state ? `, ${event.state}` : ""}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <PeopleIcon sx={{ fontSize: 18, color: "primary.main" }} />
                  <Typography variant="body2" color={isFull ? "error.main" : "text.secondary"}>
                    {isFull
                      ? "No spots remaining"
                      : `${spotsLeft} of ${event.max_participants} spots left`}
                  </Typography>
                </Box>
              </Stack>

              {alreadyBooked ? (
                <Box>
                  <Box p={2} bgcolor="success.light" borderRadius={2} mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CheckCircleIcon fontSize="small" color="success" />
                      <Typography variant="body2" fontWeight={600} color="success.dark">
                        You&apos;re registered!
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="success.dark">
                      Status: {bookingResult.booking_status}
                    </Typography>
                  </Box>
                  <Button variant="outlined" fullWidth onClick={() => navigate(myBookingsRoute)}>
                    View My Bookings
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={!canBook || bookingLoading}
                  onClick={() => setModalOpen(true)}
                >
                  {isFull ? "Fully Booked" : !isOpen ? "Not Accepting Bookings" : isPast ? "Event Ended" : "Book Now"}
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <BookingModal
        open={modalOpen}
        event={event}
        loading={bookingLoading}
        onConfirm={handleBook}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};
