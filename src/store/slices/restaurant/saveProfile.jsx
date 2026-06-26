import sliceCreator from '../../sliceCreator';
import { SAVE_PROFILE } from '../../../constants';

const _saveProfileAction = sliceCreator('SAVE_PROFILE', SAVE_PROFILE, 'post');
const { asyncAction: saveProfileAction, reducer, clearData: clearSaveProfileAction } = _saveProfileAction;

export default reducer;
export { saveProfileAction, clearSaveProfileAction };
