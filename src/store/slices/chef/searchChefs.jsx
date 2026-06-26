import sliceCreator from '../../sliceCreator';
import { SEARCH_CHEFS } from '../../../constants';

const _searchChefsAction = sliceCreator('SEARCH_CHEFS', SEARCH_CHEFS, 'get');
const { asyncAction: searchChefsAction, reducer, clearData: clearSearchChefsAction } = _searchChefsAction;

export default reducer;
export { searchChefsAction, clearSearchChefsAction };
