import { Card, CardContent, Box, Typography, Button, Stack, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import dayjs from "dayjs";
import { EventStatusBadge } from "./EventStatusBadge";

export const BookingCard = ({ booking, onCancel }) => {
  const canCancel = ["PENDING", "CONFIRMED"].includes(booking.booking_status);

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} flexWrap="wrap">
          <Box flex={1} minWidth={0}>
            <Box display="flex" alignItems="center" gap={1.5} mb={0.75} flexWrap="wrap">
              <Typography variant="subtitle1" fontWeight={700}>
                {booking.event_title ?? "Event"}
              </Typography>
              <EventStatusBadge status={booking.booking_status} type="booking" />
              {booking.payment_status && (
                <Chip
                  label={booking.payment_status}
                  size="small"
                  variant="outlined"
                  color={booking.payment_status === "PAID" ? "success" : "default"}
                />
              )}
            </Box>

            <Stack spacing={0.5} mt={1}>
              {booking.event_date && (
                <Box display="flex" alignItems="center" gap={0.75}>
                  <CalendarMonthIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {dayjs(booking.event_date).format("DD MMM YYYY")}
                    {booking.start_time ? ` · ${booking.start_time.slice(0, 5)} – ${booking.end_time?.slice(0, 5)}` : ""}
                  </Typography>
                </Box>
              )}
              {booking.venue && (
                <Box display="flex" alignItems="center" gap={0.75}>
                  <LocationOnIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {booking.venue}{booking.event_city ? `, ${booking.event_city}` : ""}
                  </Typography>
                </Box>
              )}
              {booking.number_of_people && (
                <Box display="flex" alignItems="center" gap={0.75}>
                  <PeopleIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {booking.number_of_people} person{booking.number_of_people !== 1 ? "s" : ""}
                  </Typography>
                </Box>
              )}
            </Stack>

            {booking.special_request && (
              <Box mt={1} p={1.5} bgcolor="grey.50" borderRadius={1.5}>
                <Typography variant="caption" color="text.secondary">
                  Note: {booking.special_request}
                </Typography>
              </Box>
            )}

            <Typography variant="caption" color="text.disabled" mt={1} display="block">
              Booked on {dayjs(booking.booking_date).format("DD MMM YYYY")}
            </Typography>
          </Box>

          {canCancel && onCancel && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => onCancel(booking.id)}
              sx={{ flexShrink: 0, alignSelf: "flex-start" }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
