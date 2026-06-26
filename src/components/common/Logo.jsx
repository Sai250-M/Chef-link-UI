import { Box, Typography } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const sizes = {
  sm: { icon: 22, text: "1.1rem", gap: 0.75 },
  md: { icon: 28, text: "1.3rem", gap: 1 },
  lg: { icon: 36, text: "1.75rem", gap: 1.25 },
};

export const Logo = ({ size = "md", color = "primary", hideText = false }) => {
  const s = sizes[size];
  const iconColor = color === "white" ? "#FFFFFF" : "primary.main";
  const textColor = color === "white" ? "#FFFFFF" : "text.primary";
  const accentColor = color === "white" ? "rgba(255,255,255,0.7)" : "primary.main";

  return (
    <Box display="flex" alignItems="center" gap={s.gap} sx={{ userSelect: "none" }}>
      <Box
        sx={{
          width: s.icon + 10,
          height: s.icon + 10,
          borderRadius: 2.5,
          background: color === "white"
            ? "rgba(255,255,255,0.2)"
            : "linear-gradient(135deg, #E07B39 0%, #B8611F 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <RestaurantIcon sx={{ fontSize: s.icon, color: "#FFFFFF" }} />
      </Box>
      {!hideText && (
        <Typography
          component="span"
          sx={{
            fontSize: s.text,
            fontWeight: 800,
            color: textColor,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Chef
          <Box component="span" sx={{ color: accentColor }}>Link</Box>
        </Typography>
      )}
    </Box>
  );
};
