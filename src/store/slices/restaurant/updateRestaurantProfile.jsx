import sliceCreator from '../../sliceCreator';
import { UPDATE_RESTAURANT_PROFILE } from '../../../constants';

const _updateRestaurantProfileAction = sliceCreator('UPDATE_RESTAURANT_PROFILE', UPDATE_RESTAURANT_PROFILE, 'put');
const { asyncAction: updateRestaurantProfileAction, reducer, clearData: clearUpdateRestaurantProfileAction } = _updateRestaurantProfileAction;

export default reducer;
export { updateRestaurantProfileAction, clearUpdateRestaurantProfileAction };
