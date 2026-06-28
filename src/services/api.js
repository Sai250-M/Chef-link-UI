import axios from "axios";
import { API_BASE, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from "../constants";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

      if (!refreshToken) {
        processQueue(error, null);
        isRefreshing = false;
        clearAuthStorage();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = res.data.data;
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
        processQueue(null, accessToken);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (err) {
        processQueue(err, null);
        clearAuthStorage();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const clearAuthStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const authApi = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: (refreshToken) => api.post("/auth/logout", { refreshToken }),
  refresh: (refreshToken) => api.post("/auth/refresh", { refreshToken }),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) => api.post("/auth/reset-password", { token, password }),
  changePassword: (currentPassword, newPassword) =>
    api.post("/auth/change-password", { currentPassword, newPassword }),
  me: () => api.get("/auth/me"),
};

export const chefApi = {
  getMyProfile: () => api.get("/chefs"),
  getById: (id) => api.get(`/chefs/${id}`),
  update: (data) => api.put("/chefs", data),
  updateCuisines: (cuisine_ids) => api.put("/chefs/cuisines", { cuisine_ids }),
  uploadCertificate: (formData) =>
    api.post("/chefs/certificates", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  deleteCertificate: (certId) => api.delete(`/chefs/certificates/${certId}`),
  search: (params) => api.get("/chefs/search", { params }),
  getCuisines: () => api.get("/chefs/cuisines"),
};

export const helperApi = {
  getMyProfile: () => api.get("/helpers"),
  getById: (id) => api.get(`/helpers/${id}`),
  update: (data) => api.put("/helpers", data),
  updateSkills: (skills) => api.put("/helpers/skills", { skills }),
  search: (params) => api.get("/helpers/search", { params }),
  getSkills: () => api.get("/helpers/skills"),
};

export const restaurantApi = {
  getMyProfile: () => api.get("/restaurants"),
  getById: (id) => api.get(`/restaurants/${id}`),
  update: (data) => api.put("/restaurants", data),
  getStats: () => api.get("/restaurants/stats/dashboard"),
  saveProfile: (profile_id, profile_role) =>
    api.post("/restaurants/saved-profiles", { profile_id, profile_role }),
  unsaveProfile: (profileId) => api.delete(`/restaurants/saved-profiles/${profileId}`),
  getSavedProfiles: () => api.get("/restaurants/saved-profiles/list"),
};

export const jobApi = {
  search: (params) => api.get("/jobs/search", { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post("/jobs", data),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
  getMyJobs: (status) => api.get("/jobs/restaurant/mine", { params: status ? { status } : {} }),
  getApplications: (jobId, params) => api.get(`/jobs/${jobId}/applications`, { params }),
  updateApplicationStatus: (applicationId, status) =>
    api.patch(`/jobs/applications/${applicationId}/status`, { status }),
  apply: (jobId, cover_letter) => api.post(`/jobs/${jobId}/apply`, { cover_letter }),
  withdrawApplication: (applicationId) => api.patch(`/jobs/applications/${applicationId}/withdraw`),
};

export const notificationApi = {
  getAll: () => api.get("/notifications"),
  markRead: (notification_ids) => api.patch("/notifications/read", { notification_ids }),
};

export const applicationApi = {
  getMy: (params) => api.get("/my-applications", { params }),
};

export const eventApi = {
  // Public
  getAll: (params) => api.get("/events", { params }),
  getById: (id) => api.get(`/events/${id}`),
  // Restaurant
  create: (data) => api.post("/events", data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  getMyEvents: (params) => api.get("/events/restaurant/mine", { params }),
  getEventBookings: (eventId) => api.get(`/events/${eventId}/bookings`),
  // Chef / Helper
  book: (eventId, data) => api.post(`/events/${eventId}/book`, data),
};

export const eventBookingApi = {
  // Chef / Helper
  cancel: (id) => api.delete(`/event-bookings/${id}`),
  getMyBookings: () => api.get("/event-bookings/my-bookings"),
  // Restaurant
  updateStatus: (id, data) => api.patch(`/event-bookings/${id}/status`, data),
};

export const publicApi = {
  getChefs: (params) => api.get("/public/chefs", { params }),
  getChefById: (id) => api.get(`/public/chefs/${id}`),
  getHelpers: (params) => api.get("/public/helpers", { params }),
  getHelperById: (id) => api.get(`/public/helpers/${id}`),
  submitBooking: (data) => api.post("/public/bookings", data),
};

export default api;
