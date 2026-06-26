import sliceCreator from '../../sliceCreator';
import { GET_RESTAURANT_BY_ID } from '../../../constants';

const _getRestaurantByIdAction = sliceCreator('GET_RESTAURANT_BY_ID', GET_RESTAURANT_BY_ID, 'get');
const { asyncAction: getRestaurantByIdAction, reducer, clearData: clearGetRestaurantByIdAction } = _getRestaurantByIdAction;

export default reducer;
export { getRestaurantByIdAction, clearGetRestaurantByIdAction };
