import React, { useEffect, useState } from "react";
import {
  Box, Card, CardContent, Typography, Button, Grid, Skeleton,
  Select, MenuItem, FormControl, InputLabel, IconButton,
  Menu, MenuItem as MuiMenuItem, Chip,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { PageHeader } from "../../components/common/PageHeader";
import { EmptyState } from "../../components/common/EmptyState";
import { EventStatusBadge } from "../../components/events/EventStatusBadge";
import { eventApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";

export const MyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadEvents = async (status) => {
    setLoading(true);
    try {
      const params = status && status !== "ALL" ? { status } : {};
      // GET /events/restaurant/mine
      const res = await eventApi.getMyEvents(params);
      setEvents(res.data.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEvents(); }, []);

  const handleDelete = async (eventId) => {
    setMenuAnchor(null);
    setDeleteLoading(true);
    try {
      await eventApi.delete(eventId);
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } finally {
      setDeleteLoading(false);
    }
  };

  const detailPath = (id) => ROUTES.RESTAURANT_EVENT_DETAIL.replace(":id", id);
  const editPath = (id) => ROUTES.RESTAURANT_EDIT_EVENT.replace(":id", id);

  return (
    <Box>
      <PageHeader
        title="My Events"
        subtitle="Manage your events and view bookings"
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.RESTAURANT_DASHBOARD }, { label: "Events" }]}
        action={
          <Box display="flex" gap={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); loadEvents(e.target.value); }}
              >
                <MenuItem value="ALL">All</MenuItem>
                {["DRAFT", "OPEN", "CLOSED", "CANCELLED"].map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate(ROUTES.RESTAURANT_CREATE_EVENT)}
            >
              Create Event
            </Button>
          </Box>
        }
      />

      {loading ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={110} sx={{ borderRadius: 3 }} />
          ))}
        </Box>
      ) : events.length === 0 ? (
        <EmptyState
          title="No events yet"
          description="Create your first event to start accepting bookings from chefs and helpers."
          action={{ label: "Create Event", onClick: () => navigate(ROUTES.RESTAURANT_CREATE_EVENT) }}
        />
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} flexWrap="wrap">
                  <Box flex={1} minWidth={0}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={0.75} flexWrap="wrap">
                      <Typography variant="subtitle1" fontWeight={700}>{event.title}</Typography>
                      <EventStatusBadge status={event.status} />
                      {event.event_type && (
                        <Chip label={event.event_type} size="small" variant="outlined" />
                      )}
                      <Chip
                        label={`${event.current_participants ?? 0} / ${event.max_participants} booked`}
                        size="small"
                        color={(event.current_participants ?? 0) >= event.max_participants ? "error" : "default"}
                        variant="outlined"
                      />
                    </Box>
                    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <CalendarMonthIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {dayjs(event.event_date).format("DD MMM YYYY")} · {event.start_time?.slice(0, 5)}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <LocationOnIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.venue}, {event.city}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(detailPath(event.id))}
                    >
                      Bookings
                    </Button>
                    <IconButton
                      size="small"
                      onClick={(e) => setMenuAnchor({ el: e.currentTarget, eventId: event.id })}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Menu
        anchorEl={menuAnchor?.el}
        open={!!menuAnchor}
        onClose={() => setMenuAnchor(null)}
        slotProps={{ paper: { sx: { borderRadius: 2 } } }}
      >
        <MuiMenuItem onClick={() => { navigate(editPath(menuAnchor.eventId)); setMenuAnchor(null); }}>
          Edit
        </MuiMenuItem>
        <MuiMenuItem
          sx={{ color: "error.main" }}
          disabled={deleteLoading}
          onClick={() => menuAnchor && handleDelete(menuAnchor.eventId)}
        >
          Delete
        </MuiMenuItem>
      </Menu>
    </Box>
  );
};
