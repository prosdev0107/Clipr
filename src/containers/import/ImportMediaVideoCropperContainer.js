
import { connect } from 'react-redux'
import ImportMediaVideoCropper from '../../components/ImportMediaVideoCropper'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    url_poster: state.import_media.preselected_media.source.thumbnail,
    url_video: state.import_media.preselected_media.source === "img" ? "" : state.import_media.preselected_media.source.src
})

const mapDispatchToProps = (dispatch) => ({
    updateDurations: (data) => dispatch(sendToReducersAction("IMPORT_MEDIA_VIDEO_CROPPER_UPDATE_DURATION",data)),
    sendToReducers:  (type, data) => dispatch(sendToReducersAction(type,data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaVideoCropper)
