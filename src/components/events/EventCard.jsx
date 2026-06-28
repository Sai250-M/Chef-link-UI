import {
  Card, CardContent, CardActionArea, Box, Typography, Chip, Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dayjs from "dayjs";
import { EventBanner } from "./EventBanner";
import { EventStatusBadge } from "./EventStatusBadge";

export const EventCard = ({ event, onClick }) => {
  const spotsLeft = event.max_participants - (event.current_participants ?? 0);
  const isFull = spotsLeft <= 0;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={onClick} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        <EventBanner src={event.banner_url} title={event.title} height={180} />
        <CardContent sx={{ p: 2.5, flex: 1 }}>
          <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={1} mb={1}>
            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.3} sx={{ flex: 1 }}>
              {event.title}
            </Typography>
            {event.status && <EventStatusBadge status={event.status} />}
          </Box>

          {event.event_type && (
            <Typography variant="caption" color="primary.main" fontWeight={600} display="block" mb={1}>
              {event.event_type}
            </Typography>
          )}

          <Stack spacing={0.75} mt={1}>
            <Box display="flex" alignItems="center" gap={0.75}>
              <CalendarMonthIcon sx={{ fontSize: 15, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                {dayjs(event.event_date).format("DD MMM YYYY")} · {event.start_time?.slice(0, 5)} – {event.end_time?.slice(0, 5)}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.75}>
              <LocationOnIcon sx={{ fontSize: 15, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary" noWrap>
                {event.venue}, {event.city}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.75}>
              <PeopleIcon sx={{ fontSize: 15, color: "text.secondary" }} />
              <Typography variant="caption" color={isFull ? "error.main" : "text.secondary"}>
                {isFull ? "Fully Booked" : `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} left`}
              </Typography>
            </Box>
          </Stack>

          <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AttachMoneyIcon sx={{ fontSize: 16, color: "primary.main" }} />
              <Typography variant="subtitle2" fontWeight={700} color="primary.main">
                {Number(event.price) === 0 ? "Free" : `₹${Number(event.price).toLocaleString()}`}
              </Typography>
            </Box>
            {event.restaurant_name && (
              <Typography variant="caption" color="text.secondary" noWrap maxWidth={120}>
                {event.restaurant_name}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
