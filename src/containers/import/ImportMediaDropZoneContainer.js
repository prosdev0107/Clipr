
import { connect } from 'react-redux'
import ImportMediaDropZone from "../../components/ImportMediaDropZone"
import {sendToReducersAction} from "../../actions"

const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch) => ({
    showResizer: (file) => dispatch(sendToReducersAction("IMPORT_MEDIA_LAUNCH_RESIZER", {file: file})),
})

export default connect(mapStateToProps,mapDispatchToProps)(ImportMediaDropZone)
