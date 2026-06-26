import sliceCreator from '../../sliceCreator';
import { CREATE_JOB } from '../../../constants';

const _createJobAction = sliceCreator('CREATE_JOB', CREATE_JOB, 'post');
const { asyncAction: createJobAction, reducer, clearData: clearCreateJobAction } = _createJobAction;

export default reducer;
export { createJobAction, clearCreateJobAction };
