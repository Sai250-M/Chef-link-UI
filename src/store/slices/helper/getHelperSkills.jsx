import sliceCreator from '../../sliceCreator';
import { GET_HELPER_SKILLS } from '../../../constants';

const _getHelperSkillsAction = sliceCreator('GET_HELPER_SKILLS', GET_HELPER_SKILLS, 'get');
const { asyncAction: getHelperSkillsAction, reducer, clearData: clearGetHelperSkillsAction } = _getHelperSkillsAction;

export default reducer;
export { getHelperSkillsAction, clearGetHelperSkillsAction };
