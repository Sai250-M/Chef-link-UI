import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingSpinner = ({ fullPage = false, message, size = 40 }) => {
  if (fullPage) {
    return (
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          zIndex: 9999,
          gap: 2,
        }}
      >
        <CircularProgress size={size} color="primary" />
        {message && (
          <Typography variant="body2" color="text.secondary">{message}</Typography>
        )}
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={8} gap={2}>
      <CircularProgress size={size} color="primary" />
      {message && (
        <Typography variant="body2" color="text.secondary">{message}</Typography>
      )}
    </Box>
  );
};
