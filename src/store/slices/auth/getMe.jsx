import sliceCreator from '../../sliceCreator';
import { AUTH_ME } from '../../../constants';

const _getMeAction = sliceCreator('AUTH_ME', AUTH_ME, 'get');
const { asyncAction: getMeAction, reducer, clearData: clearGetMeAction } = _getMeAction;

export default reducer;
export { getMeAction, clearGetMeAction };
