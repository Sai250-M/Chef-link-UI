import sliceCreator from '../../sliceCreator';
import { GET_JOB_APPLICATIONS } from '../../../constants';

const _getJobApplicationsAction = sliceCreator('GET_JOB_APPLICATIONS', GET_JOB_APPLICATIONS, 'get');
const { asyncAction: getJobApplicationsAction, reducer, clearData: clearGetJobApplicationsAction } = _getJobApplicationsAction;

export default reducer;
export { getJobApplicationsAction, clearGetJobApplicationsAction };
