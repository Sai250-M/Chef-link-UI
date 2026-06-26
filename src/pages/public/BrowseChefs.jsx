import React, { useState } from "react";
import {
  Box, Container, Typography, Grid, Card, CardContent, Avatar,
  Chip, Button, TextField, InputAdornment, Stack, Paper,
  Select, MenuItem, FormControl, InputLabel, Divider, alpha,
  Slider,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TuneIcon from "@mui/icons-material/Tune";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BRAND, premiumGradient } from "../../theme";

const MOCK_CHEFS = [
  { id: 1, name: "Arjun Kapoor", avatar: "AK", role: "Executive Chef", cuisine: "French & Continental", location: "Mumbai", rating: 4.9, reviews: 127, exp: 12, rate: 2500, availability: "Available", specialties: ["Michelin-trained", "Top Rated"], bio: "Executive Chef with 12 years of fine dining experience across Europe and India.", verified: true },
  { id: 2, name: "Priya Nair", avatar: "PN", role: "Head Chef", cuisine: "South Indian & Pan-Asian", location: "Bengaluru", rating: 4.8, reviews: 98, exp: 8, rate: 1800, availability: "Available", specialties: ["Award Winner"], bio: "Award-winning chef specializing in South Indian cuisine with contemporary fusion elements.", verified: true },
  { id: 3, name: "Ravi Sharma", avatar: "RS", role: "Pastry Chef", cuisine: "Patisserie & Desserts", location: "Delhi", rating: 5.0, reviews: 204, exp: 15, rate: 3200, availability: "Busy", specialties: ["5-Star", "Celebrity Events"], bio: "Celebrity pastry chef known for elaborate wedding cakes and French patisserie.", verified: true },
  { id: 4, name: "Meera Patel", avatar: "MP", role: "Sous Chef", cuisine: "Mughlai & North Indian", location: "Jaipur", rating: 4.7, reviews: 156, exp: 10, rate: 2000, availability: "Available", specialties: ["Traditional Cuisine"], bio: "Authentic Mughlai specialist trained at Taj Hotels, expert in dum cooking techniques.", verified: true },
  { id: 5, name: "Kabir Singh", avatar: "KS", role: "Chef de Partie", cuisine: "Italian & Mediterranean", location: "Goa", rating: 4.6, reviews: 89, exp: 7, rate: 1600, availability: "Available", specialties: ["European Cuisine"], bio: "Trained in Italy, bringing authentic Mediterranean flavors to Indian kitchens.", verified: false },
  { id: 6, name: "Deepa Menon", avatar: "DM", role: "Executive Pastry Chef", cuisine: "Chocolate & Sugar Art", location: "Mumbai", rating: 4.9, reviews: 178, exp: 13, rate: 2800, availability: "Available", specialties: ["Top Rated", "International"], bio: "Internationally trained pastry chef with expertise in chocolate sculpting and sugar art.", verified: true },
  { id: 7, name: "Vikram Reddy", avatar: "VR", role: "Head Chef", cuisine: "Andhra & Telugu Cuisine", location: "Hyderabad", rating: 4.8, reviews: 114, exp: 9, rate: 1900, availability: "Available", specialties: ["Regional Specialist"], bio: "Expert in traditional Andhra cuisine with focus on authentic spice blends.", verified: true },
  { id: 8, name: "Anjali Gupta", avatar: "AG", role: "Private Chef", cuisine: "Rajasthani & Marwari", location: "Udaipur", rating: 4.7, reviews: 92, exp: 11, rate: 2200, availability: "Available", specialties: ["Private Dining"], bio: "Specializing in elaborate Rajasthani thalis and royal Marwari cuisine for private events.", verified: true },
];

const CUISINES = ["All", "French", "Italian", "South Indian", "North Indian", "Mughlai", "Pan-Asian", "Patisserie", "Mediterranean", "Continental"];
const LOCATIONS = ["All Cities", "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Goa", "Jaipur", "Udaipur"];
const AVAILABILITY_OPTS = ["All", "Available", "Busy"];
const EXPERIENCE_OPTS = ["All", "1-5 years", "5-10 years", "10+ years"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const ChefCard = ({ chef, saved, onSave }) => (
  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
    <Card sx={{ height: "100%", p: 0.5 }}>
      <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
        <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
          <Avatar sx={{ width: 56, height: 56, fontSize: "1.1rem", fontWeight: 800, flexShrink: 0 }}>{chef.avatar}</Avatar>
          <Box flex={1} minWidth={0}>
            <Box display="flex" alignItems="center" gap={0.75} flexWrap="wrap">
              <Typography variant="subtitle1" fontWeight={700} noWrap>{chef.name}</Typography>
              {chef.verified && <VerifiedIcon sx={{ fontSize: 16, color: BRAND.orange }} />}
            </Box>
            <Typography variant="body2" color="text.secondary">{chef.role}</Typography>
            <Box display="flex" alignItems="center" gap={0.75} mt={0.5}>
              <LocationOnIcon sx={{ fontSize: 14, color: BRAND.slate }} />
              <Typography variant="caption" color="text.secondary">{chef.location}</Typography>
            </Box>
          </Box>
          <Box onClick={() => onSave(chef.id)} sx={{ cursor: "pointer", color: saved ? BRAND.orange : BRAND.slateLight, "&:hover": { color: BRAND.orange }, transition: "color 0.2s" }}>
            {saved ? <FavoriteIcon sx={{ fontSize: 20 }} /> : <FavoriteBorderIcon sx={{ fontSize: 20 }} />}
          </Box>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.75}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <StarIcon sx={{ fontSize: 15, color: "#F59E0B" }} />
            <Typography variant="body2" fontWeight={700}>{chef.rating}</Typography>
            <Typography variant="caption" color="text.secondary">({chef.reviews}) · {chef.exp}yr</Typography>
          </Box>
          <Chip label={chef.availability} size="small"
            sx={{ height: 22, fontSize: "0.7rem", fontWeight: 700, bgcolor: chef.availability === "Available" ? alpha("#10B981", 0.1) : alpha("#F59E0B", 0.1), color: chef.availability === "Available" ? "#10B981" : "#D97706" }} />
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1.75}>
          <RestaurantMenuIcon sx={{ fontSize: 14, color: BRAND.slate }} />
          <Typography variant="caption" color="text.secondary">{chef.cuisine}</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: 2, flex: 1 }}>{chef.bio}</Typography>

        <Box display="flex" gap={0.75} flexWrap="wrap" mb={2.5}>
          {chef.specialties.map((s) => (
            <Chip key={s} label={s} size="small" sx={{ height: 22, fontSize: "0.7rem", fontWeight: 700, bgcolor: alpha(BRAND.orange, 0.08), color: BRAND.orangeDark }} />
          ))}
        </Box>

        <Divider sx={{ mb: 2 }} />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="caption" color="text.secondary">Starting from</Typography>
            <Typography variant="h6" fontWeight={800} sx={{ color: BRAND.orange }}>₹{chef.rate.toLocaleString()}/hr</Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" sx={{ fontSize: "0.8rem" }}>Profile</Button>
            <Button variant="contained" size="small" sx={{ fontSize: "0.8rem" }}>Hire Now</Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
);

export const BrowseChefs = () => {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [location, setLocation] = useState("All Cities");
  const [availability, setAvailability] = useState("All");
  const [rateRange, setRateRange] = useState([500, 5000]);
  const [saved, setSaved] = useState(new Set());

  const toggleSave = (id) => setSaved((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = MOCK_CHEFS.filter((chef) => {
    const q = search.toLowerCase();
    if (search && !chef.name.toLowerCase().includes(q) && !chef.cuisine.toLowerCase().includes(q)) return false;
    if (cuisine !== "All" && !chef.cuisine.includes(cuisine)) return false;
    if (location !== "All Cities" && chef.location !== location) return false;
    if (availability !== "All" && chef.availability !== availability) return false;
    if (chef.rate < rateRange[0] || chef.rate > rateRange[1]) return false;
    return true;
  });

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Header */}
      <Box sx={{ background: "linear-gradient(160deg, #0F172A 0%, #1E293B 100%)", py: { xs: 6, md: 9 }, position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "radial-gradient(circle, rgba(224,123,57,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div {...fadeUp(0)}>
            <Typography variant="overline" sx={{ color: BRAND.orange, display: "block", mb: 1 }}>Chef Discovery</Typography>
            <Typography variant="h2" fontWeight={800} sx={{ color: "white", mb: 1.5 }}>Find Your Perfect Chef</Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", mb: 4, maxWidth: 480 }}>
              Browse {MOCK_CHEFS.length}+ verified culinary professionals. Filter by cuisine, location, and rate.
            </Typography>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <Paper sx={{ display: "flex", alignItems: "center", borderRadius: 4, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", maxWidth: 680 }}>
              <TextField
                fullWidth placeholder="Search by name, cuisine, or specialty..." value={search} onChange={(e) => setSearch(e.target.value)}
                variant="standard"
                InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start" sx={{ pl: 2 }}><SearchIcon sx={{ color: BRAND.slate }} /></InputAdornment>, sx: { py: 1.25, px: 1, fontSize: "1rem" } }}
              />
              <Button variant="contained" sx={{ borderRadius: 0, px: 4, py: 1.875, fontSize: "1rem", flexShrink: 0 }}>Search</Button>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {/* Sidebar Filters */}
          <Grid size={{ xs: 12, md: 3 }}>
            <motion.div {...fadeUp(0.1)}>
              <Paper sx={{ borderRadius: 4, p: 3, border: "1px solid #E2E8F0", position: "sticky", top: 100 }}>
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <TuneIcon sx={{ color: BRAND.orange, fontSize: 20 }} />
                  <Typography variant="h6" fontWeight={700}>Filters</Typography>
                </Box>
                <Stack spacing={2.5}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Cuisine</InputLabel>
                    <Select value={cuisine} onChange={(e) => setCuisine(e.target.value)} label="Cuisine">
                      {CUISINES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small">
                    <InputLabel>Location</InputLabel>
                    <Select value={location} onChange={(e) => setLocation(e.target.value)} label="Location">
                      {LOCATIONS.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small">
                    <InputLabel>Availability</InputLabel>
                    <Select value={availability} onChange={(e) => setAvailability(e.target.value)} label="Availability">
                      {AVAILABILITY_OPTS.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <Box>
                    <Typography variant="body2" fontWeight={600} mb={1.5}>
                      Hourly Rate: ₹{rateRange[0].toLocaleString()} – ₹{rateRange[1].toLocaleString()}
                    </Typography>
                    <Slider value={rateRange} onChange={(_, val) => setRateRange(val)} min={500} max={5000} step={100} sx={{ color: BRAND.orange }} />
                  </Box>
                  <Divider />
                  <Button variant="outlined" fullWidth onClick={() => { setSearch(""); setCuisine("All"); setLocation("All Cities"); setAvailability("All"); setRateRange([500, 5000]); }} sx={{ borderColor: "#E2E8F0", color: "text.secondary" }}>
                    Clear Filters
                  </Button>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>

          {/* Chef Grid */}
          <Grid size={{ xs: 12, md: 9 }}>
            <motion.div {...fadeUp(0.15)}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight={700}>{filtered.length} chef{filtered.length !== 1 ? "s" : ""} found</Typography>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel>Sort by</InputLabel>
                  <Select defaultValue="rating" label="Sort by">
                    <MenuItem value="rating">Top Rated</MenuItem>
                    <MenuItem value="rate_low">Rate: Low to High</MenuItem>
                    <MenuItem value="rate_high">Rate: High to Low</MenuItem>
                    <MenuItem value="experience">Most Experienced</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </motion.div>

            {filtered.length > 0 ? (
              <Grid container spacing={3}>
                {filtered.map((chef, i) => (
                  <Grid key={chef.id} size={{ xs: 12, sm: 6, xl: 4 }}>
                    <motion.div {...fadeUp(i * 0.06)}>
                      <ChefCard chef={chef} saved={saved.has(chef.id)} onSave={toggleSave} />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ borderRadius: 4, border: "2px dashed #E2E8F0", py: 10, textAlign: "center" }}>
                <SearchIcon sx={{ fontSize: 56, color: "#CBD5E1", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" mb={1}>No chefs match your filters</Typography>
                <Typography variant="body2" color="text.secondary">Try adjusting your search criteria</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BrowseChefs;
