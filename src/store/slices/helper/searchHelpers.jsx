import sliceCreator from '../../sliceCreator';
import { SEARCH_HELPERS } from '../../../constants';

const _searchHelpersAction = sliceCreator('SEARCH_HELPERS', SEARCH_HELPERS, 'get');
const { asyncAction: searchHelpersAction, reducer, clearData: clearSearchHelpersAction } = _searchHelpersAction;

export default reducer;
export { searchHelpersAction, clearSearchHelpersAction };
