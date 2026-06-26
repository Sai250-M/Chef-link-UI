import sliceCreator from '../../sliceCreator';
import { AUTH_LOGOUT } from '../../../constants';

const _logoutAction = sliceCreator('AUTH_LOGOUT', AUTH_LOGOUT, 'post');
const { asyncAction: logoutAction, reducer, clearData: clearLogoutAction } = _logoutAction;

export default reducer;
export { logoutAction, clearLogoutAction };
