
import { connect } from 'react-redux'
import ImportMediaDropZone from "../../components/ImportMediaDropZone"
import {sendToReducersAction} from "../../actions"

const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch) => ({
    preselectMedia: (file) => dispatch(sendToReducersAction("IMPORT_MEDIA_SELECT_MEDIA", {file: file})),
})

export default connect(mapStateToProps,mapDispatchToProps)(ImportMediaDropZone)
