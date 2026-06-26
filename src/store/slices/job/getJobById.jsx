import sliceCreator from '../../sliceCreator';
import { GET_JOB_BY_ID } from '../../../constants';

const _getJobByIdAction = sliceCreator('GET_JOB_BY_ID', GET_JOB_BY_ID, 'get');
const { asyncAction: getJobByIdAction, reducer, clearData: clearGetJobByIdAction } = _getJobByIdAction;

export default reducer;
export { getJobByIdAction, clearGetJobByIdAction };
