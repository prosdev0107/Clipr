
import { connect } from 'react-redux'
import ImportMediaValidate from '../../components/ImportMediaValidate'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    preselected_media: state.import_media.preselected_media,
    cropped_zone: state.import_media.resizer.crop_zone,
    cropped_time: {
        start: state.import_media.videocrop.start,
        end: state.import_media.videocrop.end,
    },
    display_resizer: state.import_media.resizer.display,
    display_videocrop: state.import_media.videocrop.display
})

const mapDispatchToProps = (dispatch) => ({
    sendToReducers: (type,event) => dispatch(sendToReducersAction(type,event))
})


export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaValidate)
