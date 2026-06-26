import sliceCreator from '../../sliceCreator';
import { UNSAVE_PROFILE } from '../../../constants';

const _unsaveProfileAction = sliceCreator('UNSAVE_PROFILE', UNSAVE_PROFILE, 'delete');
const { asyncAction: unsaveProfileAction, reducer, clearData: clearUnsaveProfileAction } = _unsaveProfileAction;

export default reducer;
export { unsaveProfileAction, clearUnsaveProfileAction };
