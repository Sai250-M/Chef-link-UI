export const APP_NAME = "ChefLink";
export const APP_TAGLINE = "Connecting Culinary Talent with Restaurants";
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
export const API_BASE = BASE_URL;

export const SALARY_TYPES = [
  { value: "HOURLY", label: "Per Hour" },
  { value: "DAILY", label: "Per Day" },
  { value: "MONTHLY", label: "Per Month" },
  { value: "FIXED", label: "Fixed" },
];

export const ROLE_TYPE_OPTIONS = [
  { value: "CHEF", label: "Chef" },
  { value: "HELPER", label: "Helper" },
  { value: "BOTH", label: "Chef or Helper" },
];

export const JOB_STATUS_OPTIONS = [
  { value: "OPEN", label: "Open" },
  { value: "CLOSED", label: "Closed" },
  { value: "FILLED", label: "Filled" },
  { value: "CANCELLED", label: "Cancelled" },
];

export const APPLICATION_STATUS_LABELS = {
  PENDING: { label: "Pending", color: "warning" },
  SHORTLISTED: { label: "Shortlisted", color: "info" },
  HIRED: { label: "Hired", color: "success" },
  REJECTED: { label: "Rejected", color: "error" },
  WITHDRAWN: { label: "Withdrawn", color: "default" },
};

export const JOB_STATUS_LABELS = {
  DRAFT: { label: "Draft", color: "default" },
  OPEN: { label: "Open", color: "success" },
  CLOSED: { label: "Closed", color: "warning" },
  FILLED: { label: "Filled", color: "primary" },
  CANCELLED: { label: "Cancelled", color: "error" },
};

export const PROFICIENCY_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];

export const INDIAN_CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur",
  "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad",
  "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik",
  "Faridabad", "Meerut", "Rajkot", "Varanasi", "Srinagar", "Aurangabad",
  "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah",
  "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada",
];

export const ITEMS_PER_PAGE = 12;
export const ACCESS_TOKEN_KEY = "cl_access_token";
export const REFRESH_TOKEN_KEY = "cl_refresh_token";
export const USER_KEY = "cl_user";

// ── API Endpoint Constants ────────────────────────────────────

// Auth
export const AUTH_LOGIN = 'auth/login';
export const AUTH_REGISTER = 'auth/register';
export const AUTH_LOGOUT = 'auth/logout';
export const AUTH_REFRESH = 'auth/refresh';
export const AUTH_FORGOT_PASSWORD = 'auth/forgot-password';
export const AUTH_RESET_PASSWORD = 'auth/reset-password';
export const AUTH_CHANGE_PASSWORD = 'auth/change-password';
export const AUTH_ME = 'auth/me';

// Chef
export const GET_MY_CHEF_PROFILE = 'chefs';
export const GET_CHEF_BY_ID = 'chefs/:id';
export const UPDATE_CHEF_PROFILE = 'chefs';
export const UPDATE_CHEF_CUISINES = 'chefs/cuisines';
export const UPLOAD_CHEF_CERTIFICATE = 'chefs/certificates';
export const DELETE_CHEF_CERTIFICATE = 'chefs/certificates/:id';
export const SEARCH_CHEFS = 'chefs/search';
export const GET_CUISINES = 'chefs/cuisines';

// Helper
export const GET_MY_HELPER_PROFILE = 'helpers';
export const GET_HELPER_BY_ID = 'helpers/:id';
export const UPDATE_HELPER_PROFILE = 'helpers';
export const UPDATE_HELPER_SKILLS = 'helpers/skills';
export const SEARCH_HELPERS = 'helpers/search';
export const GET_HELPER_SKILLS = 'helpers/skills';

// Restaurant
export const GET_MY_RESTAURANT_PROFILE = 'restaurants';
export const GET_RESTAURANT_BY_ID = 'restaurants/:id';
export const UPDATE_RESTAURANT_PROFILE = 'restaurants';
export const GET_RESTAURANT_STATS = 'restaurants/stats/dashboard';
export const SAVE_PROFILE = 'restaurants/saved-profiles';
export const UNSAVE_PROFILE = 'restaurants/saved-profiles/:id';
export const GET_SAVED_PROFILES = 'restaurants/saved-profiles/list';

// Jobs
export const SEARCH_JOBS = 'jobs/search';
export const GET_JOB_BY_ID = 'jobs/:id';
export const CREATE_JOB = 'jobs';
export const UPDATE_JOB = 'jobs/:id';
export const DELETE_JOB = 'jobs/:id';
export const GET_MY_JOBS = 'jobs/restaurant/mine';
export const GET_JOB_APPLICATIONS = 'jobs/:id/applications';
export const UPDATE_APPLICATION_STATUS = 'jobs/applications/:id/status';
export const APPLY_FOR_JOB = 'jobs/:id/apply';
export const WITHDRAW_APPLICATION = 'jobs/applications/:id/withdraw';

// Notifications
export const GET_NOTIFICATIONS = 'notifications';
export const MARK_NOTIFICATIONS_READ = 'notifications/read';

// Applications
export const GET_MY_APPLICATIONS = 'my-applications';

// Events
export const CREATE_EVENT = 'events';
export const GET_EVENTS = 'events';
export const GET_EVENT_BY_ID = 'events/:id';
export const UPDATE_EVENT = 'events/:id';
export const DELETE_EVENT = 'events/:id';
export const GET_MY_EVENTS = 'events/restaurant/mine';
export const GET_EVENT_BOOKINGS = 'events/:eventId/bookings';
export const BOOK_EVENT = 'events/:eventId/book';

// Event Bookings
export const CANCEL_BOOKING = 'event-bookings/:id';
export const GET_MY_EVENT_BOOKINGS = 'event-bookings/my-bookings';
export const UPDATE_BOOKING_STATUS = 'event-bookings/:id/status';

export const EVENT_BOOKING_STATUS_LABELS = {
  PENDING: { label: "Pending", color: "warning" },
  CONFIRMED: { label: "Confirmed", color: "success" },
  CANCELLED: { label: "Cancelled", color: "error" },
  ATTENDED: { label: "Attended", color: "info" },
};

export const EVENT_STATUS_LABELS = {
  DRAFT: { label: "Draft", color: "default" },
  OPEN: { label: "Open", color: "success" },
  CLOSED: { label: "Closed", color: "warning" },
  CANCELLED: { label: "Cancelled", color: "error" },
};

export const EVENT_TYPE_OPTIONS = [
  "Fine Dining", "Wedding Reception", "Birthday Party", "Corporate Event",
  "Private Dinner", "Anniversary Celebration", "Cocktail Party",
  "Pop-up Dinner", "Baby Shower", "Holiday Party", "Other",
];

