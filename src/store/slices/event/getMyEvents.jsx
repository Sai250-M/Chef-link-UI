import sliceCreator from '../../sliceCreator';
import { GET_MY_EVENTS } from '../../../constants';

const _getMyEvents = sliceCreator('GET_MY_EVENTS', GET_MY_EVENTS, 'get');
const { asyncAction: getMyEventsAction, reducer, clearData: clearGetMyEvents } = _getMyEvents;

export default reducer;
export { getMyEventsAction, clearGetMyEvents };
