// All slice actions re-exported from one place.
// Import actions from here instead of from constants to avoid circular deps.

export { loginAction, clearLoginAction } from './slices/auth/login';
export { registerAction, clearRegisterAction } from './slices/auth/register';
export { logoutAction, clearLogoutAction } from './slices/auth/logout';
export { refreshTokenAction, clearRefreshTokenAction } from './slices/auth/refreshToken';
export { forgotPasswordAction, clearForgotPasswordAction } from './slices/auth/forgotPassword';
export { resetPasswordAction, clearResetPasswordAction } from './slices/auth/resetPassword';
export { changePasswordAction, clearChangePasswordAction } from './slices/auth/changePassword';
export { getMeAction, clearGetMeAction } from './slices/auth/getMe';

export { getMyChefProfileAction, clearGetMyChefProfileAction } from './slices/chef/getMyChefProfile';
export { getChefByIdAction, clearGetChefByIdAction } from './slices/chef/getChefById';
export { updateChefProfileAction, clearUpdateChefProfileAction } from './slices/chef/updateChefProfile';
export { updateChefCuisinesAction, clearUpdateChefCuisinesAction } from './slices/chef/updateChefCuisines';
export { uploadChefCertificateAction, clearUploadChefCertificateAction } from './slices/chef/uploadChefCertificate';
export { deleteChefCertificateAction, clearDeleteChefCertificateAction } from './slices/chef/deleteChefCertificate';
export { searchChefsAction, clearSearchChefsAction } from './slices/chef/searchChefs';
export { getCuisinesAction, clearGetCuisinesAction } from './slices/chef/getCuisines';

export { getMyHelperProfileAction, clearGetMyHelperProfileAction } from './slices/helper/getMyHelperProfile';
export { getHelperByIdAction, clearGetHelperByIdAction } from './slices/helper/getHelperById';
export { updateHelperProfileAction, clearUpdateHelperProfileAction } from './slices/helper/updateHelperProfile';
export { updateHelperSkillsAction, clearUpdateHelperSkillsAction } from './slices/helper/updateHelperSkills';
export { searchHelpersAction, clearSearchHelpersAction } from './slices/helper/searchHelpers';
export { getHelperSkillsAction, clearGetHelperSkillsAction } from './slices/helper/getHelperSkills';

export { getMyRestaurantProfileAction, clearGetMyRestaurantProfileAction } from './slices/restaurant/getMyRestaurantProfile';
export { getRestaurantByIdAction, clearGetRestaurantByIdAction } from './slices/restaurant/getRestaurantById';
export { updateRestaurantProfileAction, clearUpdateRestaurantProfileAction } from './slices/restaurant/updateRestaurantProfile';
export { getRestaurantStatsAction, clearGetRestaurantStatsAction } from './slices/restaurant/getRestaurantStats';
export { saveProfileAction, clearSaveProfileAction } from './slices/restaurant/saveProfile';
export { unsaveProfileAction, clearUnsaveProfileAction } from './slices/restaurant/unsaveProfile';
export { getSavedProfilesAction, clearGetSavedProfilesAction } from './slices/restaurant/getSavedProfiles';

export { searchJobsAction, clearSearchJobsAction } from './slices/job/searchJobs';
export { getJobByIdAction, clearGetJobByIdAction } from './slices/job/getJobById';
export { createJobAction, clearCreateJobAction } from './slices/job/createJob';
export { updateJobAction, clearUpdateJobAction } from './slices/job/updateJob';
export { deleteJobAction, clearDeleteJobAction } from './slices/job/deleteJob';
export { getMyJobsAction, clearGetMyJobsAction } from './slices/job/getMyJobs';
export { getJobApplicationsAction, clearGetJobApplicationsAction } from './slices/job/getJobApplications';
export { updateApplicationStatusAction, clearUpdateApplicationStatusAction } from './slices/job/updateApplicationStatus';
export { applyForJobAction, clearApplyForJobAction } from './slices/job/applyForJob';
export { withdrawApplicationAction, clearWithdrawApplicationAction } from './slices/job/withdrawApplication';

export { getNotificationsAction, clearGetNotificationsAction } from './slices/notification/getNotifications';
export { markNotificationsReadAction, clearMarkNotificationsReadAction } from './slices/notification/markNotificationsRead';

export { getMyApplicationsAction, clearGetMyApplicationsAction } from './slices/application/getMyApplications';
