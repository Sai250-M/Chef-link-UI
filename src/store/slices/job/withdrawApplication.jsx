import sliceCreator from '../../sliceCreator';
import { WITHDRAW_APPLICATION } from '../../../constants';

const _withdrawApplicationAction = sliceCreator('WITHDRAW_APPLICATION', WITHDRAW_APPLICATION, 'patch');
const { asyncAction: withdrawApplicationAction, reducer, clearData: clearWithdrawApplicationAction } = _withdrawApplicationAction;

export default reducer;
export { withdrawApplicationAction, clearWithdrawApplicationAction };
