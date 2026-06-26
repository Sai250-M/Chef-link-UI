import { Box, Typography, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export const NotFoundPage = () => (
  <Container maxWidth="sm">
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="70vh" textAlign="center" gap={2}>
      <Typography variant="h1" sx={{ fontSize: "8rem", fontWeight: 900, color: "primary.main", lineHeight: 1, opacity: 0.2 }}>
        404
      </Typography>
      <Typography variant="h4" fontWeight={700}>Page not found</Typography>
      <Typography variant="body1" color="text.secondary" maxWidth={380}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button component={RouterLink} to={ROUTES.HOME} variant="contained" size="large" sx={{ mt: 2, px: 4 }}>
        Back to Home
      </Button>
    </Box>
  </Container>
);
