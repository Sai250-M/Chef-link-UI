import sliceCreator from '../../sliceCreator';
import { UPDATE_BOOKING_STATUS } from '../../../constants';

const _updateBookingStatus = sliceCreator('UPDATE_BOOKING_STATUS', UPDATE_BOOKING_STATUS, 'patch');
const { asyncAction: updateBookingStatusAction, reducer, clearData: clearUpdateBookingStatus } = _updateBookingStatus;

export default reducer;
export { updateBookingStatusAction, clearUpdateBookingStatus };
