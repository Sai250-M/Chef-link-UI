import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ROUTES } from "../constants/routes";

const HomePage = lazy(() => import("../pages/public/HomePage").then((m) => ({ default: m.HomePage })));
const LoginPage = lazy(() => import("../pages/public/LoginPage").then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("../pages/public/RegisterPage").then((m) => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import("../pages/public/ForgotPasswordPage").then((m) => ({ default: m.ForgotPasswordPage })));
const BrowseJobs = lazy(() => import("../pages/public/BrowseJobs").then((m) => ({ default: m.BrowseJobs })));
const BrowseChefs = lazy(() => import("../pages/public/BrowseChefs").then((m) => ({ default: m.BrowseChefs })));
const EventBooking = lazy(() => import("../pages/public/EventBooking").then((m) => ({ default: m.EventBooking })));
const ChatPage = lazy(() => import("../pages/shared/ChatPage").then((m) => ({ default: m.ChatPage })));
const NotificationsPage = lazy(() => import("../pages/shared/NotificationsPage").then((m) => ({ default: m.NotificationsPage })));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

const ChefDashboard = lazy(() => import("../pages/chef/ChefDashboard").then((m) => ({ default: m.ChefDashboard })));
const ChefProfile = lazy(() => import("../pages/chef/ChefProfile").then((m) => ({ default: m.ChefProfile })));
const ChefEditProfile = lazy(() => import("../pages/chef/ChefEditProfile").then((m) => ({ default: m.ChefEditProfile })));
const ChefApplications = lazy(() => import("../pages/chef/ChefApplications").then((m) => ({ default: m.ChefApplications })));
const ChefAvailability = lazy(() => import("../pages/chef/ChefAvailability").then((m) => ({ default: m.ChefAvailability })));

const HelperDashboard = lazy(() => import("../pages/helper/HelperDashboard").then((m) => ({ default: m.HelperDashboard })));
const HelperProfile = lazy(() => import("../pages/helper/HelperProfile").then((m) => ({ default: m.HelperProfile })));
const HelperEditProfile = lazy(() => import("../pages/helper/HelperEditProfile").then((m) => ({ default: m.HelperEditProfile })));
const HelperApplications = lazy(() => import("../pages/helper/HelperApplications").then((m) => ({ default: m.HelperApplications })));

const RestaurantDashboard = lazy(() => import("../pages/restaurant/RestaurantDashboard").then((m) => ({ default: m.RestaurantDashboard })));
const RestaurantProfile = lazy(() => import("../pages/restaurant/RestaurantProfile").then((m) => ({ default: m.RestaurantProfile })));
const RestaurantEditProfile = lazy(() => import("../pages/restaurant/RestaurantEditProfile").then((m) => ({ default: m.RestaurantEditProfile })));
const PostJob = lazy(() => import("../pages/restaurant/PostJob").then((m) => ({ default: m.PostJob })));
const ManageJobs = lazy(() => import("../pages/restaurant/ManageJobs").then((m) => ({ default: m.ManageJobs })));
const Candidates = lazy(() => import("../pages/restaurant/Candidates").then((m) => ({ default: m.Candidates })));
const ShortlistedCandidates = lazy(() => import("../pages/restaurant/ShortlistedCandidates").then((m) => ({ default: m.ShortlistedCandidates })));
const HiredStaff = lazy(() => import("../pages/restaurant/HiredStaff").then((m) => ({ default: m.HiredStaff })));

const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard").then((m) => ({ default: m.AdminDashboard })));

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingSpinner fullPage />}>{children}</Suspense>
);

export const AppRoutes = () => (
  <SuspenseWrapper>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.BROWSE_JOBS} element={<BrowseJobs />} />
        <Route path={ROUTES.BROWSE_CHEFS} element={<BrowseChefs />} />
        <Route path={ROUTES.BROWSE_HELPERS} element={<BrowseChefs />} />
        <Route path="/event-booking" element={<EventBooking />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ROLE_CHEF"]}><DashboardLayout /></ProtectedRoute>}>
        <Route path={ROUTES.CHEF_DASHBOARD} element={<ChefDashboard />} />
        <Route path={ROUTES.CHEF_PROFILE} element={<ChefProfile />} />
        <Route path={ROUTES.CHEF_EDIT_PROFILE} element={<ChefEditProfile />} />
        <Route path={ROUTES.CHEF_APPLICATIONS} element={<ChefApplications />} />
        <Route path={ROUTES.CHEF_AVAILABILITY} element={<ChefAvailability />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ROLE_HELPER"]}><DashboardLayout /></ProtectedRoute>}>
        <Route path={ROUTES.HELPER_DASHBOARD} element={<HelperDashboard />} />
        <Route path={ROUTES.HELPER_PROFILE} element={<HelperProfile />} />
        <Route path={ROUTES.HELPER_EDIT_PROFILE} element={<HelperEditProfile />} />
        <Route path={ROUTES.HELPER_APPLICATIONS} element={<HelperApplications />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ROLE_RESTAURANT"]}><DashboardLayout /></ProtectedRoute>}>
        <Route path={ROUTES.RESTAURANT_DASHBOARD} element={<RestaurantDashboard />} />
        <Route path={ROUTES.RESTAURANT_PROFILE} element={<RestaurantProfile />} />
        <Route path={ROUTES.RESTAURANT_EDIT_PROFILE} element={<RestaurantEditProfile />} />
        <Route path={ROUTES.RESTAURANT_POST_JOB} element={<PostJob />} />
        <Route path={ROUTES.RESTAURANT_MANAGE_JOBS} element={<ManageJobs />} />
        <Route path={ROUTES.RESTAURANT_CANDIDATES} element={<Candidates />} />
        <Route path={ROUTES.RESTAURANT_SHORTLISTED} element={<ShortlistedCandidates />} />
        <Route path={ROUTES.RESTAURANT_HIRED} element={<HiredStaff />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><DashboardLayout /></ProtectedRoute>}>
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </SuspenseWrapper>
);
