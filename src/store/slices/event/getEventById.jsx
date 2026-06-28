import sliceCreator from '../../sliceCreator';
import { GET_EVENT_BY_ID } from '../../../constants';

const _getEventById = sliceCreator('GET_EVENT_BY_ID', GET_EVENT_BY_ID, 'get');
const { asyncAction: getEventByIdAction, reducer, clearData: clearGetEventById } = _getEventById;

export default reducer;
export { getEventByIdAction, clearGetEventById };
