import sliceCreator from '../../sliceCreator';
import { GET_NOTIFICATIONS } from '../../../constants';

const _getNotificationsAction = sliceCreator('GET_NOTIFICATIONS', GET_NOTIFICATIONS, 'get');
const { asyncAction: getNotificationsAction, reducer, clearData: clearGetNotificationsAction } = _getNotificationsAction;

export default reducer;
export { getNotificationsAction, clearGetNotificationsAction };
