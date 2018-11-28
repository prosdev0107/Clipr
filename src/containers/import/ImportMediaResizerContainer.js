
import { connect } from 'react-redux'
import ImportMediaResizer from '../../components/ImportMediaResizer'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    file: state.import_media.file_to_upload,
    zoom: state.import_media.resizer.zoom
})

const mapDispatchToProps = (dispatch) => ({
    formChanged: (event) => dispatch(sendToReducersAction("IMPORT_MEDIA_RESIZER_CHANGE_PROPERTY",event)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaResizer)
