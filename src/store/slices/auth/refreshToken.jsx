import sliceCreator from '../../sliceCreator';
import { AUTH_REFRESH } from '../../../constants';

const _refreshTokenAction = sliceCreator('AUTH_REFRESH', AUTH_REFRESH, 'post');
const { asyncAction: refreshTokenAction, reducer, clearData: clearRefreshTokenAction } = _refreshTokenAction;

export default reducer;
export { refreshTokenAction, clearRefreshTokenAction };
