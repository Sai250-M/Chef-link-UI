import { Box, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { BRAND } from "../../theme";

export const EventBanner = ({ src, title, height = 280 }) => {
  if (src) {
    return (
      <Box
        component="img"
        src={src}
        alt={title}
        sx={{
          width: "100%",
          height,
          objectFit: "cover",
          borderRadius: 3,
          display: "block",
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.navyLight} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        color: "rgba(255,255,255,0.6)",
      }}
    >
      <EventIcon sx={{ fontSize: 56, color: BRAND.orange }} />
      {title && (
        <Typography variant="h6" color="white" fontWeight={700} textAlign="center" px={2}>
          {title}
        </Typography>
      )}
    </Box>
  );
};
