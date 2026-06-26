import sliceCreator from '../../sliceCreator';
import { GET_CUISINES } from '../../../constants';

const _getCuisinesAction = sliceCreator('GET_CUISINES', GET_CUISINES, 'get');
const { asyncAction: getCuisinesAction, reducer, clearData: clearGetCuisinesAction } = _getCuisinesAction;

export default reducer;
export { getCuisinesAction, clearGetCuisinesAction };
