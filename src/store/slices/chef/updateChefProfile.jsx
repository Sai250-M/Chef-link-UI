import sliceCreator from '../../sliceCreator';
import { UPDATE_CHEF_PROFILE } from '../../../constants';

const _updateChefProfileAction = sliceCreator('UPDATE_CHEF_PROFILE', UPDATE_CHEF_PROFILE, 'put');
const { asyncAction: updateChefProfileAction, reducer, clearData: clearUpdateChefProfileAction } = _updateChefProfileAction;

export default reducer;
export { updateChefProfileAction, clearUpdateChefProfileAction };
