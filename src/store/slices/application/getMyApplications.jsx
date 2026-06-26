import sliceCreator from '../../sliceCreator';
import { GET_MY_APPLICATIONS } from '../../../constants';

const _getMyApplicationsAction = sliceCreator('GET_MY_APPLICATIONS', GET_MY_APPLICATIONS, 'get');
const { asyncAction: getMyApplicationsAction, reducer, clearData: clearGetMyApplicationsAction } = _getMyApplicationsAction;

export default reducer;
export { getMyApplicationsAction, clearGetMyApplicationsAction };
