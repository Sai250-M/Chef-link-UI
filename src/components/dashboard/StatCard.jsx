import { Box, Card, CardContent, Typography, alpha } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export const StatCard = ({ title, value, icon, color = "#E07B39", trend, subtitle }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent sx={{ p: 3 }}>
      <Box display="flex" alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="h3" fontWeight={800} color="text.primary" sx={{ mt: 0.5, lineHeight: 1.1 }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>{subtitle}</Typography>
          )}
          {trend && (
            <Box display="flex" alignItems="center" gap={0.5} mt={1}>
              <TrendingUpIcon sx={{ fontSize: 16, color: "success.main" }} />
              <Typography variant="caption" color="success.main" fontWeight={600}>
                +{trend.value}% {trend.label}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ width: 52, height: 52, borderRadius: 3, bgcolor: alpha(color, 0.12), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);
