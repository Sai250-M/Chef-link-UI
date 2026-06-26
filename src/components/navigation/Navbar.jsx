import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Box, Button, IconButton, Container,
  Drawer, List, ListItemButton, ListItemText, Divider,
  alpha, Stack, Chip,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { Logo } from "../common/Logo";
import { ROUTES } from "../../constants/routes";
import { BRAND, premiumGradient } from "../../theme";

const NAV_LINKS = [
  { label: "Find Jobs", to: ROUTES.BROWSE_JOBS },
  { label: "Browse Chefs", to: ROUTES.BROWSE_CHEFS },
  { label: "Event Booking", to: "/event-booking", badge: "New" },
];

export const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? "rgba(8,15,29,0.94)" : "rgba(8,15,29,0.72)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 76 }, gap: 4 }}>
            {/* Logo */}
            <RouterLink to={ROUTES.HOME} style={{ textDecoration: "none", display: "flex" }}>
              <Logo size="sm" />
            </RouterLink>

            {/* Desktop Nav Links */}
            <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5, flex: 1, ml: 1 }}>
              {NAV_LINKS.map((link) => (
                <Box key={link.to} position="relative">
                  <Button
                    component={RouterLink}
                    to={link.to}
                    sx={{
                      color: isActive(link.to) ? BRAND.orangeLight : "rgba(255,255,255,0.75)",
                      fontWeight: isActive(link.to) ? 700 : 500,
                      fontSize: "0.9375rem",
                      px: 2, py: 1,
                      borderRadius: 2.5,
                      "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.06)" },
                    }}
                  >
                    {link.label}
                    {link.badge && (
                      <Chip
                        label={link.badge}
                        size="small"
                        sx={{ ml: 1, height: 18, fontSize: "0.65rem", fontWeight: 800, background: premiumGradient, color: "white" }}
                      />
                    )}
                  </Button>
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: "absolute", bottom: -2, left: "50%",
                        transform: "translateX(-50%)", width: 28, height: 3,
                        borderRadius: 2, background: premiumGradient,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>

            <Box flex={1} />

            {/* Desktop CTA */}
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                component={RouterLink}
                to={ROUTES.LOGIN}
                sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "0.9375rem", px: 2.5, "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.06)" } }}
              >
                Sign In
              </Button>
              <Button
                component={RouterLink}
                to={ROUTES.REGISTER}
                variant="contained"
                endIcon={<ArrowForwardIcon sx={{ fontSize: "1rem !important" }} />}
                sx={{ fontSize: "0.9375rem", px: 3, py: 1.125 }}
              >
                Get Started
              </Button>
            </Stack>

            {/* Mobile hamburger */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: "flex", md: "none" }, color: "white", bgcolor: "rgba(255,255,255,0.07)", borderRadius: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.12)" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 300, background: "#0F172A", borderLeft: "1px solid rgba(255,255,255,0.08)" } }}
      >
        <Box sx={{ p: 2.5 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Logo size="sm" />
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "rgba(255,255,255,0.7)", bgcolor: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List disablePadding>
            {NAV_LINKS.map((link) => (
              <ListItemButton
                key={link.to}
                component={RouterLink}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                selected={isActive(link.to)}
                sx={{
                  borderRadius: 2.5, mb: 0.5,
                  "&.Mui-selected": { bgcolor: alpha(BRAND.orange, 0.12), color: BRAND.orange },
                  "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                }}
              >
                <ListItemText
                  primary={link.label}
                  slotProps={{ primary: { sx: { color: isActive(link.to) ? BRAND.orange : "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "1rem" } } }}
                />
                {link.badge && (
                  <Chip label={link.badge} size="small" sx={{ height: 20, fontSize: "0.65rem", fontWeight: 800, background: premiumGradient, color: "white" }} />
                )}
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 2.5 }} />

          <Stack spacing={1.5}>
            <Button component={RouterLink} to={ROUTES.LOGIN} onClick={() => setMobileOpen(false)} variant="outlined" fullWidth
              sx={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", py: 1.25 }}>
              Sign In
            </Button>
            <Button component={RouterLink} to={ROUTES.REGISTER} onClick={() => setMobileOpen(false)} variant="contained" fullWidth endIcon={<ArrowForwardIcon />} sx={{ py: 1.25 }}>
              Get Started Free
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
