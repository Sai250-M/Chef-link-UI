import sliceCreator from '../../sliceCreator';
import { GET_MY_RESTAURANT_PROFILE } from '../../../constants';

const _getMyRestaurantProfileAction = sliceCreator('GET_MY_RESTAURANT_PROFILE', GET_MY_RESTAURANT_PROFILE, 'get');
const { asyncAction: getMyRestaurantProfileAction, reducer, clearData: clearGetMyRestaurantProfileAction } = _getMyRestaurantProfileAction;

export default reducer;
export { getMyRestaurantProfileAction, clearGetMyRestaurantProfileAction };
