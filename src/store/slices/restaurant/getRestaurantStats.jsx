import sliceCreator from '../../sliceCreator';
import { GET_RESTAURANT_STATS } from '../../../constants';

const _getRestaurantStatsAction = sliceCreator('GET_RESTAURANT_STATS', GET_RESTAURANT_STATS, 'get');
const { asyncAction: getRestaurantStatsAction, reducer, clearData: clearGetRestaurantStatsAction } = _getRestaurantStatsAction;

export default reducer;
export { getRestaurantStatsAction, clearGetRestaurantStatsAction };
