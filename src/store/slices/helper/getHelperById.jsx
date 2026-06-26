import sliceCreator from '../../sliceCreator';
import { GET_HELPER_BY_ID } from '../../../constants';

const _getHelperByIdAction = sliceCreator('GET_HELPER_BY_ID', GET_HELPER_BY_ID, 'get');
const { asyncAction: getHelperByIdAction, reducer, clearData: clearGetHelperByIdAction } = _getHelperByIdAction;

export default reducer;
export { getHelperByIdAction, clearGetHelperByIdAction };
