import sliceCreator from '../../sliceCreator';
import { AUTH_CHANGE_PASSWORD } from '../../../constants';

const _changePasswordAction = sliceCreator('AUTH_CHANGE_PASSWORD', AUTH_CHANGE_PASSWORD, 'post');
const { asyncAction: changePasswordAction, reducer, clearData: clearChangePasswordAction } = _changePasswordAction;

export default reducer;
export { changePasswordAction, clearChangePasswordAction };
