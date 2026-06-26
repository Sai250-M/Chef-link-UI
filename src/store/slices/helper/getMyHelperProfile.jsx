import sliceCreator from '../../sliceCreator';
import { GET_MY_HELPER_PROFILE } from '../../../constants';

const _getMyHelperProfileAction = sliceCreator('GET_MY_HELPER_PROFILE', GET_MY_HELPER_PROFILE, 'get');
const { asyncAction: getMyHelperProfileAction, reducer, clearData: clearGetMyHelperProfileAction } = _getMyHelperProfileAction;

export default reducer;
export { getMyHelperProfileAction, clearGetMyHelperProfileAction };
