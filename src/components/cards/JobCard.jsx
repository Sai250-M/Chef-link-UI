import { Card, CardContent, CardActions, Box, Typography, Chip, Button, Avatar, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import { StatusChip } from "../common/StatusChip";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const formatSalary = (job) => {
  if (!job.salary_min && !job.salary_max) return "Salary not specified";
  const currency = job.currency === "INR" ? "₹" : job.currency;
  const type = job.salary_type === "HOURLY" ? "/hr" : job.salary_type === "DAILY" ? "/day" : "/mo";
  if (job.salary_min && job.salary_max) return `${currency}${job.salary_min.toLocaleString()} – ${currency}${job.salary_max.toLocaleString()}${type}`;
  if (job.salary_min) return `From ${currency}${job.salary_min.toLocaleString()}${type}`;
  return `Up to ${currency}${job.salary_max?.toLocaleString()}${type}`;
};

export const JobCard = ({
  job,
  onView,
  onApply,
  showStatus = false,
  showActions = true,
}) => (
  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <CardContent sx={{ p: 3, flexGrow: 1 }}>
      <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
        <Avatar
          src={job.restaurant_logo ?? undefined}
          sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: "primary.main", fontSize: "1.1rem", fontWeight: 700 }}
        >
          {job.restaurant_name?.[0]}
        </Avatar>
        <Box flex={1} minWidth={0}>
          <Typography variant="subtitle1" fontWeight={700} noWrap color="text.primary">
            {job.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>{job.restaurant_name}</Typography>
        </Box>
        {showStatus && <StatusChip status={job.status} type="job" />}
      </Box>

      <Box display="flex" flexWrap="wrap" gap={1.5} mb={2}>
        {(job.city || job.restaurant_city) && (
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocationOnIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">{job.city || job.restaurant_city}</Typography>
          </Box>
        )}
        {job.experience_required !== null && (
          <Box display="flex" alignItems="center" gap={0.5}>
            <WorkIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">{job.experience_required}+ yrs</Typography>
          </Box>
        )}
        <Box display="flex" alignItems="center" gap={0.5}>
          <PeopleIcon sx={{ fontSize: 14, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">{job.openings} opening{job.openings !== 1 ? "s" : ""}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">{dayjs(job.created_at).fromNow()}</Typography>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", mb: 2 }}>
        {job.description}
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="primary.main" fontWeight={700}>{formatSalary(job)}</Typography>
        <Chip
          label={job.role_type === "BOTH" ? "Chef / Helper" : job.role_type}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Box>

      {job.cuisines?.length > 0 && (
        <>
          <Divider sx={{ my: 1.5 }} />
          <Box display="flex" gap={0.75} flexWrap="wrap">
            {job.cuisines.slice(0, 3).map((c) => (
              <Chip key={c.id} label={c.name} size="small" sx={{ fontSize: "0.7rem" }} />
            ))}
            {job.cuisines.length > 3 && (
              <Chip label={`+${job.cuisines.length - 3}`} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
            )}
          </Box>
        </>
      )}
    </CardContent>

    {showActions && (
      <CardActions sx={{ px: 3, pb: 2.5, pt: 0, gap: 1 }}>
        {onView && (
          <Button size="small" variant="outlined" onClick={onView}>View</Button>
        )}
        {onApply && (
          <Button size="small" variant="contained" onClick={onApply} sx={{ ml: "auto" }}>Apply Now</Button>
        )}
      </CardActions>
    )}
  </Card>
);
