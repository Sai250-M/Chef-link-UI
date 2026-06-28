import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export const BookingEmptyState = ({
  title = "No results found",
  description = "Try adjusting your filters or search terms",
  action,
  actionLabel = "Clear Filters",
}) => (
  <Box
    sx={{
      textAlign: "center",
      py: 10,
      px: 3,
      border: "2px dashed #E2E8F0",
      borderRadius: 4,
    }}
  >
    <SearchOffIcon sx={{ fontSize: 64, color: "#CBD5E1", mb: 2 }} />
    <Typography variant="h6" color="text.secondary" mb={1}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" mb={action ? 3 : 0}>
      {description}
    </Typography>
    {action && (
      <Button variant="outlined" onClick={action} sx={{ mt: 1 }}>
        {actionLabel}
      </Button>
    )}
  </Box>
);
