import sliceCreator from '../../sliceCreator';
import { BOOK_EVENT } from '../../../constants';

// urlParams: { eventId }  — data: { number_of_people, special_request }
const _bookEvent = sliceCreator('BOOK_EVENT', BOOK_EVENT, 'post');
const { asyncAction: bookEventAction, reducer, clearData: clearBookEvent } = _bookEvent;

export default reducer;
export { bookEventAction, clearBookEvent };
