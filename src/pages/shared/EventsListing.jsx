import React, { useEffect, useState, useCallback } from "react";
import { Box, Grid, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PageHeader } from "../../components/common/PageHeader";
import { EventCard } from "../../components/events/EventCard";
import { EventSearchFilters } from "../../components/events/EventSearchFilters";
import { EventListSkeleton } from "../../components/events/EventSkeleton";
import { EventPagination } from "../../components/events/EventPagination";
import { EmptyState } from "../../components/common/EmptyState";
import { eventApi } from "../../services/api";
import { ROUTES } from "../../constants/routes";
import { useDebounce } from "../../hooks/useDebounce";

const DEFAULT_FILTERS = { search: "", city: "", date_from: "", date_to: "" };
const LIMIT = 9;

export const EventsListing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const debouncedSearch = useDebounce(filters.search, 400);

  const isChef = user?.role === "ROLE_CHEF";
  const dashboardRoute = isChef ? ROUTES.CHEF_DASHBOARD : ROUTES.HELPER_DASHBOARD;
  const detailBasePath = isChef ? "/chef/events" : "/helper/events";

  const fetchEvents = useCallback(async (currentPage, currentFilters, search) => {
    setLoading(true);
    setError("");
    try {
      const params = {
        page: currentPage,
        limit: LIMIT,
        status: "OPEN",                     // Only show open events to bookers
        sortBy: "event_date",
        sortDir: "ASC",
        ...(search ? { search } : {}),
        ...(currentFilters.city ? { city: currentFilters.city } : {}),
        ...(currentFilters.date_from ? { event_date: currentFilters.date_from } : {}),
      };
      // GET /events (public)
      const res = await eventApi.getAll(params);
      // API returns: { data: [...], meta: { total, page, limit, totalPages } }
      const rawData = res.data.data;
      const meta = res.data.meta;
      setEvents(Array.isArray(rawData) ? rawData : []);
      setTotal(meta?.total ?? (Array.isArray(rawData) ? rawData.length : 0));
    } catch {
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(page, filters, debouncedSearch);
  }, [page, filters.city, filters.date_from, debouncedSearch, fetchEvents]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  return (
    <Box>
      <PageHeader
        title="Browse Events"
        subtitle="Discover and book culinary events near you"
        breadcrumbs={[{ label: "Dashboard", href: dashboardRoute }, { label: "Events" }]}
      />

      <EventSearchFilters
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleReset}
      />

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <EventListSkeleton count={LIMIT} />
      ) : events.length === 0 ? (
        <EmptyState
          title="No events found"
          description="Try adjusting your filters or check back later for upcoming events."
        />
      ) : (
        <>
          <Box mb={2}>
            <Typography variant="body2" color="text.secondary">
              {total} event{total !== 1 ? "s" : ""} found
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid key={event.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <EventCard
                  event={event}
                  onClick={() => navigate(`${detailBasePath}/${event.id}`)}
                />
              </Grid>
            ))}
          </Grid>
          <EventPagination total={total} page={page} limit={LIMIT} onChange={setPage} />
        </>
      )}
    </Box>
  );
};
