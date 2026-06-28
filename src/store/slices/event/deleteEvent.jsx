import sliceCreator from '../../sliceCreator';
import { DELETE_EVENT } from '../../../constants';

const _deleteEvent = sliceCreator('DELETE_EVENT', DELETE_EVENT, 'delete');
const { asyncAction: deleteEventAction, reducer, clearData: clearDeleteEvent } = _deleteEvent;

export default reducer;
export { deleteEventAction, clearDeleteEvent };
