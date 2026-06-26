import sliceCreator from '../../sliceCreator';
import { GET_CHEF_BY_ID } from '../../../constants';

const _getChefByIdAction = sliceCreator('GET_CHEF_BY_ID', GET_CHEF_BY_ID, 'get');
const { asyncAction: getChefByIdAction, reducer, clearData: clearGetChefByIdAction } = _getChefByIdAction;

export default reducer;
export { getChefByIdAction, clearGetChefByIdAction };
