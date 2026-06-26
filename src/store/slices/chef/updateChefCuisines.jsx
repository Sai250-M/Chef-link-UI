import sliceCreator from '../../sliceCreator';
import { UPDATE_CHEF_CUISINES } from '../../../constants';

const _updateChefCuisinesAction = sliceCreator('UPDATE_CHEF_CUISINES', UPDATE_CHEF_CUISINES, 'put');
const { asyncAction: updateChefCuisinesAction, reducer, clearData: clearUpdateChefCuisinesAction } = _updateChefCuisinesAction;

export default reducer;
export { updateChefCuisinesAction, clearUpdateChefCuisinesAction };
