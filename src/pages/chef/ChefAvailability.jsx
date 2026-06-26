import React from "react";
import { Box, Card, CardContent, Typography, Button, Alert } from "@mui/material";
import { PageHeader } from "../../components/common/PageHeader";
import { ROUTES } from "../../constants/routes";

export const ChefAvailability = () => (
  <Box>
    <PageHeader
      title="Availability"
      subtitle="Manage your availability schedule"
      breadcrumbs={[{ label: "Dashboard", href: ROUTES.CHEF_DASHBOARD }, { label: "Availability" }]}
    />
    <Alert severity="info" sx={{ mb: 3 }}>
      Granular availability scheduling (calendar view) is coming soon. For now, toggle your general availability status from your profile edit page.
    </Alert>
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight={700} mb={3}>General Availability</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Toggle your availability to let restaurants know you're open to new opportunities.
        </Typography>
        <Button variant="contained" href={ROUTES.CHEF_EDIT_PROFILE}>
          Set Availability in Profile
        </Button>
      </CardContent>
    </Card>
  </Box>
);
