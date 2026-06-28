import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Divider, Stack, TextField,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import dayjs from "dayjs";

export const BookingModal = ({ open, event, loading, onConfirm, onClose }) => {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [specialRequest, setSpecialRequest] = useState("");

  if (!event) return null;

  const spotsLeft = event.max_participants - (event.current_participants ?? 0);

  const handleConfirm = () => {
    onConfirm({ number_of_people: numberOfPeople, special_request: specialRequest || undefined });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Confirm Booking</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" fontWeight={700} mb={2}>{event.title}</Typography>
        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1.5} mb={2.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography variant="body2">
              {dayjs(event.event_date).format("DD MMMM YYYY")} · {event.start_time?.slice(0, 5)} – {event.end_time?.slice(0, 5)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnIcon sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography variant="body2">{event.venue}, {event.city}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <AttachMoneyIcon sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography variant="body2" fontWeight={600}>
              {Number(event.price) === 0 ? "Free" : `₹${Number(event.price).toLocaleString()} per person`}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <PeopleIcon sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography variant="body2">{spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} remaining</Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <TextField
            label="Number of People"
            type="number"
            size="small"
            fullWidth
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(Math.max(1, Math.min(spotsLeft, Number(e.target.value))))}
            inputProps={{ min: 1, max: spotsLeft }}
          />
          <TextField
            label="Special Request (optional)"
            multiline
            rows={2}
            size="small"
            fullWidth
            placeholder="e.g. Vegetarian meals preferred"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          />
        </Stack>

        <Box mt={2} p={1.5} bgcolor="warning.light" borderRadius={2}>
          <Typography variant="caption" color="warning.dark">
            Your booking will be pending until the organizer confirms it.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading} fullWidth>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm} disabled={loading} fullWidth>
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
