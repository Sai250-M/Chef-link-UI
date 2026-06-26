import { Box, Container, Grid, Typography, Link, Divider, Stack, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Logo } from "../common/Logo";
import { ROUTES } from "../../constants/routes";
import { BRAND, premiumGradient } from "../../theme";

const footerLinks = {
  Platform: [
    { label: "Browse Jobs", to: ROUTES.BROWSE_JOBS },
    { label: "Find Chefs", to: ROUTES.BROWSE_CHEFS },
    { label: "Find Helpers", to: ROUTES.BROWSE_HELPERS },
    { label: "Event Booking", to: "/event-booking" },
  ],
  Company: [
    { label: "About Us", to: "/" },
    { label: "Contact", to: "/" },
    { label: "Careers", to: "/" },
    { label: "Blog", to: "/" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/" },
    { label: "Terms of Service", to: "/" },
    { label: "Cookie Policy", to: "/" },
  ],
};

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      background: `linear-gradient(180deg, #080F1D 0%, #030710 100%)`,
      color: "white",
      pt: { xs: 8, md: 10 },
      pb: 4,
      mt: "auto",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={6} mb={6}>
        {/* Brand */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Logo color="white" size="md" />
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mt: 2.5, lineHeight: 1.85, maxWidth: 300 }}>
            India's #1 culinary talent marketplace. Connecting professional chefs, kitchen helpers, restaurants, and event organizers on one premium platform.
          </Typography>
          <Stack direction="row" spacing={1.5} mt={3}>
            {["🍴", "⭐", "🏆"].map((emoji, i) => (
              <Box key={i} sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", cursor: "pointer", "&:hover": { bgcolor: "rgba(255,255,255,0.12)" }, transition: "background 0.2s" }}>
                {emoji}
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Links */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <Grid key={section} size={{ xs: 6, sm: 4, md: 2.67 }}>
            <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.35)", mb: 2.5, display: "block", letterSpacing: "0.12em" }}>
              {section}
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.25}>
              {links.map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.to}
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    width: "fit-content",
                    "&:hover": { color: BRAND.orangeLight },
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Stats bar */}
      <Box
        sx={{
          display: "flex", flexWrap: "wrap", gap: 3, mb: 5, p: 3,
          bgcolor: "rgba(255,255,255,0.03)",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {[
          { val: "10,000+", label: "Registered Chefs" },
          { val: "5,000+", label: "Partner Restaurants" },
          { val: "50,000+", label: "Successful Hires" },
          { val: "4.9★", label: "Average Rating" },
        ].map((item) => (
          <Box key={item.label} flex={1} minWidth={120} textAlign="center">
            <Typography variant="h5" fontWeight={800} sx={{ background: premiumGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {item.val}
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>{item.label}</Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 3.5 }} />
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)" }}>
          © {new Date().getFullYear()} ChefLink Technologies Pvt. Ltd. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)" }}>
            Made with ♥ for the culinary world
          </Typography>
          <Chip label="v2.0" size="small" sx={{ height: 20, fontSize: "0.65rem", bgcolor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }} />
        </Stack>
      </Box>
    </Container>
  </Box>
);
