import sliceCreator from '../../sliceCreator';
import { UPDATE_HELPER_PROFILE } from '../../../constants';

const _updateHelperProfileAction = sliceCreator('UPDATE_HELPER_PROFILE', UPDATE_HELPER_PROFILE, 'put');
const { asyncAction: updateHelperProfileAction, reducer, clearData: clearUpdateHelperProfileAction } = _updateHelperProfileAction;

export default reducer;
export { updateHelperProfileAction, clearUpdateHelperProfileAction };
