import sliceCreator from '../../sliceCreator';
import { CANCEL_BOOKING } from '../../../constants';

const _cancelBooking = sliceCreator('CANCEL_BOOKING', CANCEL_BOOKING, 'delete');
const { asyncAction: cancelBookingAction, reducer, clearData: clearCancelBooking } = _cancelBooking;

export default reducer;
export { cancelBookingAction, clearCancelBooking };
