import React from "react";
import {
  Card, CardContent, Avatar, Typography, Box, Chip,
  Button, Stack, Divider, alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkIcon from "@mui/icons-material/Work";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useNavigate } from "react-router-dom";
import { BRAND } from "../../../theme";
import { ROUTES } from "../../../constants/routes";

export const PublicChefCard = ({ chef }) => {
  const navigate = useNavigate();
  const initials = `${chef.first_name?.[0] || ""}${chef.last_name?.[0] || ""}`.toUpperCase();
  const fullName = `${chef.first_name} ${chef.last_name}`;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card sx={{ height: "100%", p: 0.5 }}>
        <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
            <Avatar
              src={chef.avatar_url || undefined}
              sx={{ width: 56, height: 56, fontSize: "1.1rem", fontWeight: 800, flexShrink: 0 }}
            >
              {initials}
            </Avatar>
            <Box flex={1} minWidth={0}>
              <Box display="flex" alignItems="center" gap={0.75} flexWrap="wrap">
                <Typography variant="subtitle1" fontWeight={700} noWrap>{fullName}</Typography>
                <VerifiedIcon sx={{ fontSize: 15, color: BRAND.orange }} />
              </Box>
              {chef.specialization && (
                <Typography variant="body2" color="text.secondary" noWrap>{chef.specialization}</Typography>
              )}
              <Box display="flex" alignItems="center" gap={0.75} mt={0.5}>
                <LocationOnIcon sx={{ fontSize: 13, color: BRAND.slate }} />
                <Typography variant="caption" color="text.secondary">{chef.city}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Stats Row */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.75}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <WorkIcon sx={{ fontSize: 13, color: BRAND.slate }} />
              <Typography variant="caption" color="text.secondary">{chef.years_experience} yrs exp</Typography>
            </Box>
            <Chip
              label={chef.is_available ? "Available" : "Busy"}
              size="small"
              sx={{
                height: 22, fontSize: "0.7rem", fontWeight: 700,
                bgcolor: chef.is_available ? alpha("#10B981", 0.1) : alpha("#F59E0B", 0.1),
                color: chef.is_available ? "#10B981" : "#D97706",
              }}
            />
          </Box>

          {/* Cuisine line */}
          {(chef.specialization || chef.cuisines?.length > 0) && (
            <Box display="flex" alignItems="center" gap={1} mb={1.75}>
              <RestaurantMenuIcon sx={{ fontSize: 13, color: BRAND.slate }} />
              <Typography variant="caption" color="text.secondary" noWrap>
                {chef.cuisines?.map((c) => c.name).join(", ") || chef.specialization}
              </Typography>
            </Box>
          )}

          {/* Bio */}
          {chef.bio && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.65, mb: 2, flex: 1,
                display: "-webkit-box", WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical", overflow: "hidden",
              }}
            >
              {chef.bio}
            </Typography>
          )}

          {/* Cuisine Tags */}
          {chef.cuisines?.length > 0 && (
            <Box display="flex" gap={0.75} flexWrap="wrap" mb={2.5}>
              {chef.cuisines.slice(0, 3).map((c) => (
                <Chip
                  key={c.id}
                  label={c.name}
                  size="small"
                  sx={{ height: 22, fontSize: "0.7rem", fontWeight: 700, bgcolor: alpha(BRAND.orange, 0.08), color: BRAND.orangeDark }}
                />
              ))}
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />

          {/* Price + Actions */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="caption" color="text.secondary">Starting from</Typography>
              <Typography variant="h6" fontWeight={800} sx={{ color: BRAND.orange }}>
                ₹{Number(chef.hourly_rate).toLocaleString("en-IN")}/hr
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                sx={{ fontSize: "0.8rem" }}
                onClick={() => navigate(ROUTES.PUBLIC_CHEF_DETAIL.replace(":id", chef.id))}
              >
                Profile
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{ fontSize: "0.8rem" }}
                onClick={() => navigate(ROUTES.PUBLIC_BOOK_CHEF.replace(":id", chef.id))}
              >
                Book Now
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
