import sliceCreator from '../../sliceCreator';
import { MARK_NOTIFICATIONS_READ } from '../../../constants';

const _markNotificationsReadAction = sliceCreator('MARK_NOTIFICATIONS_READ', MARK_NOTIFICATIONS_READ, 'patch');
const { asyncAction: markNotificationsReadAction, reducer, clearData: clearMarkNotificationsReadAction } = _markNotificationsReadAction;

export default reducer;
export { markNotificationsReadAction, clearMarkNotificationsReadAction };
