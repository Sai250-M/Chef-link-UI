import sliceCreator from '../../sliceCreator';
import { CREATE_EVENT } from '../../../constants';

const _createEvent = sliceCreator('CREATE_EVENT', CREATE_EVENT, 'post');
const { asyncAction: createEventAction, reducer, clearData: clearCreateEvent } = _createEvent;

export default reducer;
export { createEventAction, clearCreateEvent };
