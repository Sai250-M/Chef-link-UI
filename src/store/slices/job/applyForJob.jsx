import sliceCreator from '../../sliceCreator';
import { APPLY_FOR_JOB } from '../../../constants';

const _applyForJobAction = sliceCreator('APPLY_FOR_JOB', APPLY_FOR_JOB, 'post');
const { asyncAction: applyForJobAction, reducer, clearData: clearApplyForJobAction } = _applyForJobAction;

export default reducer;
export { applyForJobAction, clearApplyForJobAction };
