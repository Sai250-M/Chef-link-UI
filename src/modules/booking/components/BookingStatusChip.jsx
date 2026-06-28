import React from "react";
import { Chip } from "@mui/material";
import { BOOKING_STATUS_CONFIG } from "../validation/booking.validation";

export const BookingStatusChip = ({ status, size = "small" }) => {
  const config = BOOKING_STATUS_CONFIG[status] || { label: status, color: "default" };
  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      sx={{ fontWeight: 700 }}
    />
  );
};
