import sliceCreator from '../../sliceCreator';
import { SEARCH_JOBS } from '../../../constants';

const _searchJobsAction = sliceCreator('SEARCH_JOBS', SEARCH_JOBS, 'get');
const { asyncAction: searchJobsAction, reducer, clearData: clearSearchJobsAction } = _searchJobsAction;

export default reducer;
export { searchJobsAction, clearSearchJobsAction };
