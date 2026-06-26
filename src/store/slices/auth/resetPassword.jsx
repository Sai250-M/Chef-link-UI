import sliceCreator from '../../sliceCreator';
import { AUTH_RESET_PASSWORD } from '../../../constants';

const _resetPasswordAction = sliceCreator('AUTH_RESET_PASSWORD', AUTH_RESET_PASSWORD, 'post');
const { asyncAction: resetPasswordAction, reducer, clearData: clearResetPasswordAction } = _resetPasswordAction;

export default reducer;
export { resetPasswordAction, clearResetPasswordAction };
