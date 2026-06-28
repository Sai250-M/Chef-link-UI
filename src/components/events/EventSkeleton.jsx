import { Box, Card, CardContent, Skeleton, Grid } from "@mui/material";

export const EventCardSkeleton = () => (
  <Card>
    <Skeleton variant="rectangular" height={180} sx={{ borderRadius: "20px 20px 0 0" }} />
    <CardContent sx={{ p: 2.5 }}>
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" width="40%" height={20} sx={{ mt: 0.5 }} />
      <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
      <Box display="flex" gap={1} mt={2}>
        <Skeleton variant="rounded" width={80} height={28} />
        <Skeleton variant="rounded" width={80} height={28} />
      </Box>
    </CardContent>
  </Card>
);

export const EventListSkeleton = ({ count = 6 }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
        <EventCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

export const EventDetailSkeleton = () => (
  <Box>
    <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 3, mb: 3 }} />
    <Skeleton variant="text" width="50%" height={40} />
    <Skeleton variant="text" width="30%" height={28} sx={{ mt: 1 }} />
    <Box mt={3}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} variant="text" height={22} sx={{ mt: 0.5 }} />
      ))}
    </Box>
  </Box>
);
