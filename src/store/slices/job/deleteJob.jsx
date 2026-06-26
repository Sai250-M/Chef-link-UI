import sliceCreator from '../../sliceCreator';
import { DELETE_JOB } from '../../../constants';

const _deleteJobAction = sliceCreator('DELETE_JOB', DELETE_JOB, 'delete');
const { asyncAction: deleteJobAction, reducer, clearData: clearDeleteJobAction } = _deleteJobAction;

export default reducer;
export { deleteJobAction, clearDeleteJobAction };
