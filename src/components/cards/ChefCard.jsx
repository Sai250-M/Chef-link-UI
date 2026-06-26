import { Card, CardContent, CardActions, Box, Typography, Chip, Button, Avatar, LinearProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";

export const ChefCard = ({ chef, onView, onSave, isSaved }) => {
  const fullName = `${chef.first_name} ${chef.last_name}`;
  const initials = `${chef.first_name?.[0] ?? ""}${chef.last_name?.[0] ?? ""}`.toUpperCase();

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Box display="flex" gap={2} mb={2}>
          <Avatar
            src={chef.avatar_url ?? undefined}
            sx={{ width: 56, height: 56, fontSize: "1.25rem", fontWeight: 700 }}
          >
            {initials}
          </Avatar>
          <Box flex={1} minWidth={0}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="subtitle1" fontWeight={700} noWrap>{fullName}</Typography>
              {chef.is_available && (
                <VerifiedIcon sx={{ fontSize: 16, color: "success.main" }} />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" noWrap>
              {chef.specialization || "Chef"}
            </Typography>
            {chef.city && (
              <Box display="flex" alignItems="center" gap={0.5} mt={0.25}>
                <LocationOnIcon sx={{ fontSize: 13, color: "text.disabled" }} />
                <Typography variant="caption" color="text.secondary">{chef.city}</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {chef.bio && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", mb: 2 }}
          >
            {chef.bio}
          </Typography>
        )}

        <Box display="flex" gap={2} mb={2}>
          {chef.years_experience !== null && (
            <Box>
              <Typography variant="h6" fontWeight={800} color="text.primary">{chef.years_experience}</Typography>
              <Typography variant="caption" color="text.secondary">Yrs Exp</Typography>
            </Box>
          )}
          {chef.hourly_rate !== null && (
            <Box>
              <Typography variant="h6" fontWeight={800} color="primary.main">
                ₹{chef.hourly_rate}
              </Typography>
              <Typography variant="caption" color="text.secondary">/hr</Typography>
            </Box>
          )}
          <Box>
            <Typography variant="h6" fontWeight={800} color="text.primary">{chef.certificates?.length ?? 0}</Typography>
            <Typography variant="caption" color="text.secondary">Certs</Typography>
          </Box>
        </Box>

        <Box mb={1.5}>
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption" color="text.secondary">Profile Strength</Typography>
            <Typography variant="caption" fontWeight={600} color={chef.profile_completion_pct >= 80 ? "success.main" : "warning.main"}>
              {chef.profile_completion_pct}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={chef.profile_completion_pct}
            color={chef.profile_completion_pct >= 80 ? "success" : "warning"}
          />
        </Box>

        {chef.cuisines?.length > 0 && (
          <Box display="flex" gap={0.75} flexWrap="wrap" mt={1.5}>
            {chef.cuisines.slice(0, 3).map((c) => (
              <Chip key={c.id} label={c.name} size="small" color="primary" variant="outlined" sx={{ fontSize: "0.7rem" }} />
            ))}
            {chef.cuisines.length > 3 && (
              <Chip label={`+${chef.cuisines.length - 3}`} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
            )}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ px: 3, pb: 2.5, pt: 0, gap: 1 }}>
        <Chip
          label={chef.is_available ? "Available" : "Unavailable"}
          size="small"
          color={chef.is_available ? "success" : "default"}
          sx={{ mr: "auto" }}
        />
        {onSave && (
          <Button size="small" variant="outlined" onClick={onSave}>
            {isSaved ? "Saved" : "Save"}
          </Button>
        )}
        {onView && (
          <Button size="small" variant="contained" onClick={onView}>View Profile</Button>
        )}
      </CardActions>
    </Card>
  );
};
