import { combineReducers } from 'redux';

import loginReducer from './slices/auth/login';
import registerReducer from './slices/auth/register';
import logoutReducer from './slices/auth/logout';
import refreshTokenReducer from './slices/auth/refreshToken';
import forgotPasswordReducer from './slices/auth/forgotPassword';
import resetPasswordReducer from './slices/auth/resetPassword';
import changePasswordReducer from './slices/auth/changePassword';
import getMeReducer from './slices/auth/getMe';

import getMyChefProfileReducer from './slices/chef/getMyChefProfile';
import getChefByIdReducer from './slices/chef/getChefById';
import updateChefProfileReducer from './slices/chef/updateChefProfile';
import updateChefCuisinesReducer from './slices/chef/updateChefCuisines';
import uploadChefCertificateReducer from './slices/chef/uploadChefCertificate';
import deleteChefCertificateReducer from './slices/chef/deleteChefCertificate';
import searchChefsReducer from './slices/chef/searchChefs';
import getCuisinesReducer from './slices/chef/getCuisines';

import getMyHelperProfileReducer from './slices/helper/getMyHelperProfile';
import getHelperByIdReducer from './slices/helper/getHelperById';
import updateHelperProfileReducer from './slices/helper/updateHelperProfile';
import updateHelperSkillsReducer from './slices/helper/updateHelperSkills';
import searchHelpersReducer from './slices/helper/searchHelpers';
import getHelperSkillsReducer from './slices/helper/getHelperSkills';

import getMyRestaurantProfileReducer from './slices/restaurant/getMyRestaurantProfile';
import getRestaurantByIdReducer from './slices/restaurant/getRestaurantById';
import updateRestaurantProfileReducer from './slices/restaurant/updateRestaurantProfile';
import getRestaurantStatsReducer from './slices/restaurant/getRestaurantStats';
import saveProfileReducer from './slices/restaurant/saveProfile';
import unsaveProfileReducer from './slices/restaurant/unsaveProfile';
import getSavedProfilesReducer from './slices/restaurant/getSavedProfiles';

import searchJobsReducer from './slices/job/searchJobs';
import getJobByIdReducer from './slices/job/getJobById';
import createJobReducer from './slices/job/createJob';
import updateJobReducer from './slices/job/updateJob';
import deleteJobReducer from './slices/job/deleteJob';
import getMyJobsReducer from './slices/job/getMyJobs';
import getJobApplicationsReducer from './slices/job/getJobApplications';
import updateApplicationStatusReducer from './slices/job/updateApplicationStatus';
import applyForJobReducer from './slices/job/applyForJob';
import withdrawApplicationReducer from './slices/job/withdrawApplication';

import getNotificationsReducer from './slices/notification/getNotifications';
import markNotificationsReadReducer from './slices/notification/markNotificationsRead';

import getMyApplicationsReducer from './slices/application/getMyApplications';

import createEventReducer from './slices/event/createEvent';
import getEventsReducer from './slices/event/getEvents';
import getEventByIdReducer from './slices/event/getEventById';
import updateEventReducer from './slices/event/updateEvent';
import deleteEventReducer from './slices/event/deleteEvent';
import getMyEventsReducer from './slices/event/getMyEvents';

import bookEventReducer from './slices/eventBooking/bookEvent';
import cancelBookingReducer from './slices/eventBooking/cancelBooking';
import getMyEventBookingsReducer from './slices/eventBooking/getMyEventBookings';
import getEventBookingsReducer from './slices/eventBooking/getEventBookings';
import updateBookingStatusReducer from './slices/eventBooking/updateBookingStatus';

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  logoutReducer,
  refreshTokenReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  changePasswordReducer,
  getMeReducer,

  getMyChefProfileReducer,
  getChefByIdReducer,
  updateChefProfileReducer,
  updateChefCuisinesReducer,
  uploadChefCertificateReducer,
  deleteChefCertificateReducer,
  searchChefsReducer,
  getCuisinesReducer,

  getMyHelperProfileReducer,
  getHelperByIdReducer,
  updateHelperProfileReducer,
  updateHelperSkillsReducer,
  searchHelpersReducer,
  getHelperSkillsReducer,

  getMyRestaurantProfileReducer,
  getRestaurantByIdReducer,
  updateRestaurantProfileReducer,
  getRestaurantStatsReducer,
  saveProfileReducer,
  unsaveProfileReducer,
  getSavedProfilesReducer,

  searchJobsReducer,
  getJobByIdReducer,
  createJobReducer,
  updateJobReducer,
  deleteJobReducer,
  getMyJobsReducer,
  getJobApplicationsReducer,
  updateApplicationStatusReducer,
  applyForJobReducer,
  withdrawApplicationReducer,

  getNotificationsReducer,
  markNotificationsReadReducer,

  getMyApplicationsReducer,

  createEventReducer,
  getEventsReducer,
  getEventByIdReducer,
  updateEventReducer,
  deleteEventReducer,
  getMyEventsReducer,

  bookEventReducer,
  cancelBookingReducer,
  getMyEventBookingsReducer,
  getEventBookingsReducer,
  updateBookingStatusReducer,
});

export default rootReducer;
