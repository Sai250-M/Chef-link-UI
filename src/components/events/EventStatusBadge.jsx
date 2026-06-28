import { Chip } from "@mui/material";
import { EVENT_BOOKING_STATUS_LABELS, EVENT_STATUS_LABELS } from "../../constants";

export const EventStatusBadge = ({ status, type = "event", size = "small" }) => {
  const map = type === "booking" ? EVENT_BOOKING_STATUS_LABELS : EVENT_STATUS_LABELS;
  const config = map[status] ?? { label: status, color: "default" };
  return <Chip label={config.label} color={config.color} size={size} sx={{ fontWeight: 600 }} />;
};
