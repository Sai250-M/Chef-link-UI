import sliceCreator from '../../sliceCreator';
import { DELETE_CHEF_CERTIFICATE } from '../../../constants';

const _deleteChefCertificateAction = sliceCreator('DELETE_CHEF_CERTIFICATE', DELETE_CHEF_CERTIFICATE, 'delete');
const { asyncAction: deleteChefCertificateAction, reducer, clearData: clearDeleteChefCertificateAction } = _deleteChefCertificateAction;

export default reducer;
export { deleteChefCertificateAction, clearDeleteChefCertificateAction };
