export const ROUTES = {
  // Public
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Chef
  CHEF_DASHBOARD: "/chef/dashboard",
  CHEF_PROFILE: "/chef/profile",
  CHEF_EDIT_PROFILE: "/chef/profile/edit",
  CHEF_APPLICATIONS: "/chef/applications",
  CHEF_AVAILABILITY: "/chef/availability",

  // Helper
  HELPER_DASHBOARD: "/helper/dashboard",
  HELPER_PROFILE: "/helper/profile",
  HELPER_EDIT_PROFILE: "/helper/profile/edit",
  HELPER_APPLICATIONS: "/helper/applications",

  // Restaurant
  RESTAURANT_DASHBOARD: "/restaurant/dashboard",
  RESTAURANT_PROFILE: "/restaurant/profile",
  RESTAURANT_EDIT_PROFILE: "/restaurant/profile/edit",
  RESTAURANT_POST_JOB: "/restaurant/jobs/new",
  RESTAURANT_MANAGE_JOBS: "/restaurant/jobs",
  RESTAURANT_CANDIDATES: "/restaurant/candidates",
  RESTAURANT_SHORTLISTED: "/restaurant/shortlisted",
  RESTAURANT_HIRED: "/restaurant/hired",

  // Admin
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_JOBS: "/admin/jobs",

  // Public browse
  BROWSE_CHEFS: "/browse/chefs",
  BROWSE_HELPERS: "/browse/helpers",
  BROWSE_JOBS: "/browse/jobs",

  // New pages
  EVENT_BOOKING: "/event-booking",
  CHAT: "/chat",
  NOTIFICATIONS: "/notifications",
};

export const getDashboardRoute = (role) => {
  switch (role) {
    case "ROLE_CHEF": return ROUTES.CHEF_DASHBOARD;
    case "ROLE_HELPER": return ROUTES.HELPER_DASHBOARD;
    case "ROLE_RESTAURANT": return ROUTES.RESTAURANT_DASHBOARD;
    case "ROLE_ADMIN": return ROUTES.ADMIN_DASHBOARD;
    default: return ROUTES.HOME;
  }
};
