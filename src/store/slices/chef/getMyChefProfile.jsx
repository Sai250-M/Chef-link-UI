import sliceCreator from '../../sliceCreator';
import { GET_MY_CHEF_PROFILE } from '../../../constants';

const _getMyChefProfileAction = sliceCreator('GET_MY_CHEF_PROFILE', GET_MY_CHEF_PROFILE, 'get');
const { asyncAction: getMyChefProfileAction, reducer, clearData: clearGetMyChefProfileAction } = _getMyChefProfileAction;

export default reducer;
export { getMyChefProfileAction, clearGetMyChefProfileAction };
