import sliceCreator from '../../sliceCreator';
import { GET_SAVED_PROFILES } from '../../../constants';

const _getSavedProfilesAction = sliceCreator('GET_SAVED_PROFILES', GET_SAVED_PROFILES, 'get');
const { asyncAction: getSavedProfilesAction, reducer, clearData: clearGetSavedProfilesAction } = _getSavedProfilesAction;

export default reducer;
export { getSavedProfilesAction, clearGetSavedProfilesAction };
