import sliceCreator from '../../sliceCreator';
import { GET_MY_EVENT_BOOKINGS } from '../../../constants';

const _getMyEventBookings = sliceCreator('GET_MY_EVENT_BOOKINGS', GET_MY_EVENT_BOOKINGS, 'get');
const { asyncAction: getMyEventBookingsAction, reducer, clearData: clearGetMyEventBookings } = _getMyEventBookings;

export default reducer;
export { getMyEventBookingsAction, clearGetMyEventBookings };
