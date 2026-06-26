import { Box, Paper, Container } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { Logo } from "../components/common/Logo";
import { ROUTES } from "../constants/routes";

export const AuthLayout = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      bgcolor: "background.default",
      backgroundImage: "radial-gradient(ellipse at 60% 0%, rgba(224,123,57,0.08) 0%, transparent 60%)",
    }}
  >
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        flex: "0 0 420px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(160deg, #1E293B 0%, #0F172A 100%)",
        p: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(224,123,57,0.2) 0%, transparent 70%)",
          top: "10%",
          left: "-30%",
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <Logo size="lg" color="white" />
        <Box mt={4}>
          <Box
            component="blockquote"
            sx={{
              borderLeft: "3px solid",
              borderColor: "primary.main",
              pl: 2,
              mt: 4,
              textAlign: "left",
            }}
          >
            <Box component="p" sx={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.8, m: 0 }}>
              "The platform that changed how we find culinary talent. We hired our head chef within a week."
            </Box>
            <Box component="footer" sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", mt: 1.5 }}>
              — The Spice Route, Mumbai
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>

    <Box flex={1} display="flex" alignItems="center" justifyContent="center" p={{ xs: 2, sm: 4 }}>
      <Container maxWidth="sm">
        <Box sx={{ display: { lg: "none" }, mb: 4, textAlign: "center" }}>
          <RouterLink to={ROUTES.HOME} style={{ textDecoration: "none" }}>
            <Logo size="lg" />
          </RouterLink>
        </Box>
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, border: "1px solid", borderColor: "divider", borderRadius: 4 }}>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  </Box>
);
