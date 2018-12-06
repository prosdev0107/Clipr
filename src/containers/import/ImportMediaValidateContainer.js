
import { connect } from 'react-redux'
import ImportMediaValidate from '../../components/ImportMediaValidate'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    preselected_media: state.import_media.preselected_media,
    cropped_zone: state.import_media.resizer.crop_zone,
    display_resizer: state.import_media.resizer.display
})

const mapDispatchToProps = (dispatch) => ({
    confirmMedia: (event) => dispatch(sendToReducersAction("IMPORT_MEDIA_LAUNCH_RESIZER",event)),
    cancelResize: (event) => dispatch(sendToReducersAction("IMPORT_MEDIA_CLOSE_RESIZER",event)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaValidate)
