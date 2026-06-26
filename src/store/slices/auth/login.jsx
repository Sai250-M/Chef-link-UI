import sliceCreator from '../../sliceCreator';
import { AUTH_LOGIN } from '../../../constants';

const _loginAction = sliceCreator('AUTH_LOGIN', AUTH_LOGIN, 'post');
const { asyncAction: loginAction, reducer, clearData: clearLoginAction } = _loginAction;

export default reducer;
export { loginAction, clearLoginAction };
