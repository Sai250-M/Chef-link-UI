import React, { useState } from "react";
import {
  Box, Drawer, AppBar, Toolbar, IconButton, Typography, Avatar,
  List, ListItemButton, ListItemIcon, ListItemText, Divider,
  Badge, Menu, MenuItem, useTheme, useMediaQuery, Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Outlet, useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { Logo } from "../components/common/Logo";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";

const DRAWER_WIDTH = 260;
const DRAWER_COLLAPSED = 72;

const getNavItems = (role) => {
  if (role === "ROLE_CHEF") return [
    { label: "Dashboard", icon: <DashboardIcon />, to: ROUTES.CHEF_DASHBOARD },
    { label: "My Profile", icon: <PersonIcon />, to: ROUTES.CHEF_PROFILE },
    { label: "Edit Profile", icon: <SettingsIcon />, to: ROUTES.CHEF_EDIT_PROFILE },
    { label: "Applications", icon: <AssignmentIcon />, to: ROUTES.CHEF_APPLICATIONS },
    { label: "Availability", icon: <CalendarTodayIcon />, to: ROUTES.CHEF_AVAILABILITY },
  ];
  if (role === "ROLE_HELPER") return [
    { label: "Dashboard", icon: <DashboardIcon />, to: ROUTES.HELPER_DASHBOARD },
    { label: "My Profile", icon: <PersonIcon />, to: ROUTES.HELPER_PROFILE },
    { label: "Edit Profile", icon: <SettingsIcon />, to: ROUTES.HELPER_EDIT_PROFILE },
    { label: "Applications", icon: <AssignmentIcon />, to: ROUTES.HELPER_APPLICATIONS },
  ];
  if (role === "ROLE_RESTAURANT") return [
    { label: "Dashboard", icon: <DashboardIcon />, to: ROUTES.RESTAURANT_DASHBOARD },
    { label: "My Profile", icon: <PersonIcon />, to: ROUTES.RESTAURANT_PROFILE },
    { label: "Post a Job", icon: <AddCircleOutlineIcon />, to: ROUTES.RESTAURANT_POST_JOB },
    { label: "Manage Jobs", icon: <WorkIcon />, to: ROUTES.RESTAURANT_MANAGE_JOBS },
    { label: "Candidates", icon: <PeopleIcon />, to: ROUTES.RESTAURANT_CANDIDATES },
    { label: "Shortlisted", icon: <BookmarkIcon />, to: ROUTES.RESTAURANT_SHORTLISTED },
    { label: "Hired Staff", icon: <AssignmentIcon />, to: ROUTES.RESTAURANT_HIRED },
  ];
  if (role === "ROLE_ADMIN") return [
    { label: "Dashboard", icon: <DashboardIcon />, to: ROUTES.ADMIN_DASHBOARD },
    { label: "Users", icon: <PeopleIcon />, to: ROUTES.ADMIN_USERS },
    { label: "Jobs", icon: <WorkIcon />, to: ROUTES.ADMIN_JOBS },
  ];
  return [];
};

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navItems = getNavItems(user?.role ?? "");
  const drawerWidth = collapsed && !isMobile ? DRAWER_COLLAPSED : DRAWER_WIDTH;

  const handleLogout = async () => {
    setAnchorEl(null);
    await logout();
    navigate(ROUTES.LOGIN);
  };

  const DrawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Box sx={{ px: 2, py: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 72 }}>
        {!collapsed || isMobile ? (
          <RouterLink to="/" style={{ textDecoration: "none" }}>
            <Logo size="sm" />
          </RouterLink>
        ) : <Box />}
        {!isMobile && (
          <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeftIcon sx={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "0.2s" }} />
          </IconButton>
        )}
      </Box>

      <Divider />

      {(!collapsed || isMobile) && (
        <Box sx={{ px: 2, py: 2, bgcolor: "background.default", mx: 1.5, borderRadius: 2, mt: 1 }}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar sx={{ width: 40, height: 40, fontSize: "0.9rem" }}>
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </Avatar>
            <Box minWidth={0}>
              <Typography variant="subtitle2" fontWeight={700} noWrap>
                {user?.first_name} {user?.last_name}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user?.role?.replace("ROLE_", "")}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <Box sx={{ flexGrow: 1, overflow: "auto", py: 1 }}>
        <List dense>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Tooltip key={item.label} title={collapsed && !isMobile ? item.label : ""} placement="right">
                <ListItemButton
                  component={RouterLink}
                  to={item.to}
                  onClick={() => isMobile && setMobileOpen(false)}
                  selected={isActive}
                  sx={{
                    mx: 1,
                    justifyContent: collapsed && !isMobile ? "center" : "flex-start",
                    px: collapsed && !isMobile ? 1 : 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed && !isMobile ? 0 : 36,
                      mr: collapsed && !isMobile ? 0 : 1,
                      color: isActive ? "primary.main" : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {(!collapsed || isMobile) && (
                    <ListItemText
                      primary={item.label}
                      slotProps={{ primary: { sx: { fontSize: "0.9rem", fontWeight: isActive ? 600 : 400 } } }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      <Divider />
      <Tooltip title={collapsed && !isMobile ? "Logout" : ""} placement="right">
        <ListItemButton onClick={handleLogout} sx={{ mx: 1, my: 1, color: "error.main", justifyContent: collapsed && !isMobile ? "center" : "flex-start" }}>
          <ListItemIcon sx={{ minWidth: collapsed && !isMobile ? 0 : 36, color: "error.main" }}>
            <LogoutIcon />
          </ListItemIcon>
          {(!collapsed || isMobile) && <ListItemText primary="Logout" slotProps={{ primary: { sx: { fontSize: "0.9rem" } } }} />}
        </ListItemButton>
      </Tooltip>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            transition: "width 0.2s",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              transition: "width 0.2s",
              overflowX: "hidden",
            },
          }}
        >
          {DrawerContent}
        </Drawer>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{ "& .MuiDrawer-paper": { width: DRAWER_WIDTH } }}
        >
          {DrawerContent}
        </Drawer>
      )}

      <Box sx={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="sticky"
          sx={{ bgcolor: "background.paper", color: "text.primary", zIndex: theme.zIndex.appBar }}
        >
          <Toolbar sx={{ gap: 2, minHeight: { xs: 64, md: 72 } }}>
            {isMobile && (
              <IconButton edge="start" onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <Box flex={1} />
            <IconButton size="small">
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
              <Avatar sx={{ width: 36, height: 36, fontSize: "0.875rem" }}>
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              slotProps={{ paper: { sx: { mt: 1, minWidth: 200, borderRadius: 3 } } }}
            >
              <Box px={2} py={1.5}>
                <Typography variant="subtitle2" fontWeight={700}>{user?.first_name} {user?.last_name}</Typography>
                <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <LogoutIcon sx={{ mr: 1.5, fontSize: 18 }} /> Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
