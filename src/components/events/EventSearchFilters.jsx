import {
  Box, TextField, Select, MenuItem, FormControl, InputLabel,
  InputAdornment, Button, Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { INDIAN_CITIES } from "../../constants";

export const EventSearchFilters = ({ filters, onChange, onReset }) => {
  const handle = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search events..."
            value={filters.search ?? ""}
            onChange={handle("search")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>City</InputLabel>
            <Select label="City" value={filters.city ?? ""} onChange={handle("city")}>
              <MenuItem value="">All Cities</MenuItem>
              {INDIAN_CITIES.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="From Date"
            type="date"
            value={filters.date_from ?? ""}
            onChange={handle("date_from")}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="To Date"
            type="date"
            value={filters.date_to ?? ""}
            onChange={handle("date_to")}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 1 }}>
          <Button variant="outlined" size="small" fullWidth onClick={onReset} sx={{ height: 40 }}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
