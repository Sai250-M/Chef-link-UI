import React, { useEffect, useState } from "react";
import {
  Box, Alert, Skeleton, Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { PageHeader } from "../../components/common/PageHeader";
import { BookingCard } from "../../components/events/BookingCard";
import { EmptyState } from "../../components/common/EmptyState";
import { eventBookingApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";

export const MyBookings = () => {
  const { user } = useAuth();
  const isChef = user?.role === "ROLE_CHEF";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [confirmCancelId, setConfirmCancelId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const dashboardRoute = isChef ? ROUTES.CHEF_DASHBOARD : ROUTES.HELPER_DASHBOARD;
  const eventsRoute = isChef ? ROUTES.CHEF_EVENTS : ROUTES.HELPER_EVENTS;

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      // GET /event-bookings/my-bookings
      const res = await eventBookingApi.getMyBookings();
      setBookings(res.data.data ?? []);
    } catch {
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCancel = async () => {
    if (!confirmCancelId) return;
    setCancelling(true);
    try {
      // DELETE /event-bookings/:id
      await eventBookingApi.cancel(confirmCancelId);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === confirmCancelId ? { ...b, booking_status: "CANCELLED" } : b
        )
      );
      setConfirmCancelId(null);
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to cancel booking.");
    } finally {
      setCancelling(false);
    }
  };

  // Filter client-side (API returns all bookings at once)
  const filtered = statusFilter === "ALL"
    ? bookings
    : bookings.filter((b) => b.booking_status === statusFilter);

  return (
    <Box>
      <PageHeader
        title="My Bookings"
        subtitle="Track your event registrations"
        breadcrumbs={[
          { label: "Dashboard", href: dashboardRoute },
          { label: "My Bookings" },
        ]}
        action={
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="ALL">All</MenuItem>
              {["PENDING", "CONFIRMED", "ATTENDED", "CANCELLED"].map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" height={130} sx={{ borderRadius: 3 }} />
          ))}
        </Box>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No bookings found"
          description="You haven't booked any events yet. Browse upcoming events to get started."
          action={{ label: "Browse Events", onClick: () => (window.location.href = eventsRoute) }}
        />
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {filtered.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={(bookingId) => setConfirmCancelId(bookingId)}
            />
          ))}
        </Box>
      )}

      <Dialog open={!!confirmCancelId} onClose={() => setConfirmCancelId(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Cancel Booking?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to cancel this booking? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button variant="outlined" onClick={() => setConfirmCancelId(null)} disabled={cancelling} fullWidth>
            Keep Booking
          </Button>
          <Button variant="contained" color="error" onClick={handleCancel} disabled={cancelling} fullWidth>
            {cancelling ? "Cancelling..." : "Yes, Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
