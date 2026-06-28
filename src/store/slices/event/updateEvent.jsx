import sliceCreator from '../../sliceCreator';
import { UPDATE_EVENT } from '../../../constants';

const _updateEvent = sliceCreator('UPDATE_EVENT', UPDATE_EVENT, 'put');
const { asyncAction: updateEventAction, reducer, clearData: clearUpdateEvent } = _updateEvent;

export default reducer;
export { updateEventAction, clearUpdateEvent };
