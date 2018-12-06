
import { connect } from 'react-redux'
import ImportMediaDropZone from "../../components/ImportMediaDropZone"

const mapStateToProps = (state) => ({
    uploading_file: state.import_media.uploading_file,
    uploading_file_progress: state.import_media.uploading_file_progress,
})


export default connect(mapStateToProps)(ImportMediaDropZone)
