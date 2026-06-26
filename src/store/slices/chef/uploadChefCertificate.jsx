import sliceCreator from '../../sliceCreator';
import { UPLOAD_CHEF_CERTIFICATE } from '../../../constants';

const _uploadChefCertificateAction = sliceCreator('UPLOAD_CHEF_CERTIFICATE', UPLOAD_CHEF_CERTIFICATE, 'post');
const { asyncAction: uploadChefCertificateAction, reducer, clearData: clearUploadChefCertificateAction } = _uploadChefCertificateAction;

export default reducer;
export { uploadChefCertificateAction, clearUploadChefCertificateAction };
