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

  // Restaurant Events
  RESTAURANT_MY_EVENTS: "/restaurant/events",
  RESTAURANT_CREATE_EVENT: "/restaurant/events/new",
  RESTAURANT_EVENT_DETAIL: "/restaurant/events/:id",
  RESTAURANT_EDIT_EVENT: "/restaurant/events/:id/edit",

  // Chef Events
  CHEF_EVENTS: "/chef/events",
  CHEF_EVENT_DETAIL: "/chef/events/:id",
  CHEF_MY_BOOKINGS: "/chef/bookings",

  // Helper Events
  HELPER_EVENTS: "/helper/events",
  HELPER_EVENT_DETAIL: "/helper/events/:id",
  HELPER_MY_BOOKINGS: "/helper/bookings",

  // Guest Booking (no login required)
  PUBLIC_CHEFS: "/public/chefs",
  PUBLIC_HELPERS: "/public/helpers",
  PUBLIC_CHEF_DETAIL: "/public/chef/:id",
  PUBLIC_HELPER_DETAIL: "/public/helper/:id",
  PUBLIC_BOOK_CHEF: "/public/book-chef/:id",
  PUBLIC_BOOK_HELPER: "/public/book-helper/:id",
  PUBLIC_BOOKING_SUCCESS: "/public/booking-success",
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
