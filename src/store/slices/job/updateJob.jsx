import sliceCreator from '../../sliceCreator';
import { UPDATE_JOB } from '../../../constants';

const _updateJobAction = sliceCreator('UPDATE_JOB', UPDATE_JOB, 'put');
const { asyncAction: updateJobAction, reducer, clearData: clearUpdateJobAction } = _updateJobAction;

export default reducer;
export { updateJobAction, clearUpdateJobAction };
