import React from "react";
import { Grid, Card, CardContent, Skeleton, Box } from "@mui/material";

const LoadingCard = () => (
  <Card sx={{ p: 0.5 }}>
    <CardContent sx={{ p: 3 }}>
      <Box display="flex" gap={2} mb={2} alignItems="flex-start">
        <Skeleton variant="circular" width={56} height={56} />
        <Box flex={1}>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="40%" height={18} />
          <Skeleton variant="text" width="30%" height={18} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={1.75}>
        <Skeleton variant="text" width="30%" height={18} />
        <Skeleton variant="rounded" width={64} height={22} />
      </Box>
      <Skeleton variant="text" width="70%" height={18} sx={{ mb: 1.75 }} />
      <Skeleton variant="text" width="95%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
      <Box display="flex" gap={0.75} mb={2.5}>
        <Skeleton variant="rounded" width={60} height={22} />
        <Skeleton variant="rounded" width={72} height={22} />
        <Skeleton variant="rounded" width={56} height={22} />
      </Box>
      <Skeleton variant="text" width="100%" height={1} sx={{ mb: 2 }} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Skeleton variant="text" width={60} height={14} />
          <Skeleton variant="text" width={80} height={28} />
        </Box>
        <Box display="flex" gap={1}>
          <Skeleton variant="rounded" width={72} height={32} />
          <Skeleton variant="rounded" width={82} height={32} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export const BookingLoadingCards = ({ count = 6 }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid key={i} size={{ xs: 12, sm: 6, xl: 4 }}>
        <LoadingCard />
      </Grid>
    ))}
  </Grid>
);
