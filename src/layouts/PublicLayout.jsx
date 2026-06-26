import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navigation/Navbar";
import { Footer } from "../components/navigation/Footer";

export const PublicLayout = () => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Navbar />
    <Box component="main" sx={{ flexGrow: 1, pt: { xs: "68px", md: "76px" } }}>
      <Outlet />
    </Box>
    <Footer />
  </Box>
);
