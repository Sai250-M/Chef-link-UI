import React from "react";
import { Box, Alert } from "@mui/material";
import { PageHeader } from "../../components/common/PageHeader";
import { ROUTES } from "../../constants/routes";

export const HiredStaff = () => (
  <Box>
    <PageHeader title="Hired Staff" subtitle="Manage your active hires"
      breadcrumbs={[{ label: "Dashboard", href: ROUTES.RESTAURANT_DASHBOARD }, { label: "Hired Staff" }]} />
    <Alert severity="info">
      The Hired Staff management module (assignments, contracts, work tracking) is coming soon. For now, manage hires by updating application statuses to "HIRED" from the job applications page.
    </Alert>
  </Box>
);
