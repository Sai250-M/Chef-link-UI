import sliceCreator from '../../sliceCreator';
import { GET_EVENTS } from '../../../constants';

const _getEvents = sliceCreator('GET_EVENTS', GET_EVENTS, 'get');
const { asyncAction: getEventsAction, reducer, clearData: clearGetEvents } = _getEvents;

export default reducer;
export { getEventsAction, clearGetEvents };
