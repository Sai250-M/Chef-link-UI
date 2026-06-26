import sliceCreator from '../../sliceCreator';
import { AUTH_FORGOT_PASSWORD } from '../../../constants';

const _forgotPasswordAction = sliceCreator('AUTH_FORGOT_PASSWORD', AUTH_FORGOT_PASSWORD, 'post');
const { asyncAction: forgotPasswordAction, reducer, clearData: clearForgotPasswordAction } = _forgotPasswordAction;

export default reducer;
export { forgotPasswordAction, clearForgotPasswordAction };
