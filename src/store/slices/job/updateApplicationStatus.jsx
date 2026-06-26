import sliceCreator from '../../sliceCreator';
import { UPDATE_APPLICATION_STATUS } from '../../../constants';

const _updateApplicationStatusAction = sliceCreator('UPDATE_APPLICATION_STATUS', UPDATE_APPLICATION_STATUS, 'patch');
const { asyncAction: updateApplicationStatusAction, reducer, clearData: clearUpdateApplicationStatusAction } = _updateApplicationStatusAction;

export default reducer;
export { updateApplicationStatusAction, clearUpdateApplicationStatusAction };
