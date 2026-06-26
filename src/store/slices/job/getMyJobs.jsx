import sliceCreator from '../../sliceCreator';
import { GET_MY_JOBS } from '../../../constants';

const _getMyJobsAction = sliceCreator('GET_MY_JOBS', GET_MY_JOBS, 'get');
const { asyncAction: getMyJobsAction, reducer, clearData: clearGetMyJobsAction } = _getMyJobsAction;

export default reducer;
export { getMyJobsAction, clearGetMyJobsAction };
