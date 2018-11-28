
import { connect } from 'react-redux'
import ImportMediaAPIMedia from '../../components/ImportMediaAPIMedia'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = (state,ownProps) => ({
    media: ownProps.media,
})

const mapDispatchToProps = (dispatch) => ({
    showResizer: (file) => dispatch(sendToReducersAction("IMPORT_MEDIA_LAUNCH_RESIZER", {file: file})),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaAPIMedia)