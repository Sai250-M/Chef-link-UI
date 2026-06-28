import sliceCreator from '../../sliceCreator';
import { GET_EVENT_BOOKINGS } from '../../../constants';

// urlParams: { eventId }
const _getEventBookings = sliceCreator('GET_EVENT_BOOKINGS', GET_EVENT_BOOKINGS, 'get');
const { asyncAction: getEventBookingsAction, reducer, clearData: clearGetEventBookings } = _getEventBookings;

export default reducer;
export { getEventBookingsAction, clearGetEventBookings };
