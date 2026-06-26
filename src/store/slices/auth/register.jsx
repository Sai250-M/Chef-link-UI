import sliceCreator from '../../sliceCreator';
import { AUTH_REGISTER } from '../../../constants';

const _registerAction = sliceCreator('AUTH_REGISTER', AUTH_REGISTER, 'post');
const { asyncAction: registerAction, reducer, clearData: clearRegisterAction } = _registerAction;

export default reducer;
export { registerAction, clearRegisterAction };
