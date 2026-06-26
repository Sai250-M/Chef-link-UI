import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink } from "react-router-dom";

export const PageHeader = ({ title, subtitle, breadcrumbs, action }) => (
  <Box
    display="flex"
    alignItems={{ xs: "flex-start", sm: "center" }}
    justifyContent="space-between"
    flexDirection={{ xs: "column", sm: "row" }}
    gap={2}
    mb={3}
  >
    <Box>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 0.5, "& .MuiBreadcrumbs-ol": { flexWrap: "nowrap" } }}
        >
          {breadcrumbs.map((crumb, i) =>
            crumb.href ? (
              <Link
                key={i}
                component={RouterLink}
                to={crumb.href}
                underline="hover"
                color="text.secondary"
                sx={{ fontSize: "0.8125rem" }}
              >
                {crumb.label}
              </Link>
            ) : (
              <Typography key={i} color="text.primary" sx={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                {crumb.label}
              </Typography>
            )
          )}
        </Breadcrumbs>
      )}
      <Typography variant="h4" fontWeight={700} color="text.primary">{title}</Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" mt={0.5}>{subtitle}</Typography>
      )}
    </Box>
    {action && <Box flexShrink={0}>{action}</Box>}
  </Box>
);
