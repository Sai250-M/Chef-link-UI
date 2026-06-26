import sliceCreator from '../../sliceCreator';
import { UPDATE_HELPER_SKILLS } from '../../../constants';

const _updateHelperSkillsAction = sliceCreator('UPDATE_HELPER_SKILLS', UPDATE_HELPER_SKILLS, 'put');
const { asyncAction: updateHelperSkillsAction, reducer, clearData: clearUpdateHelperSkillsAction } = _updateHelperSkillsAction;

export default reducer;
export { updateHelperSkillsAction, clearUpdateHelperSkillsAction };
