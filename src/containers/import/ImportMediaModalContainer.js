
import { connect } from 'react-redux'
import ImportMediaModal from '../../components/ImportMediaModal'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    modal_show: state.import_media.show_modal,
    file_to_upload: state.import_media.file_to_upload,
    uploading_file: state.import_media.uploading_file,
    uploading_file_progress: state.import_media.uploading_file_progress,
    display_resizer: state.import_media.resizer.display
})

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(sendToReducersAction("IMPORT_MEDIA_MODAL_HIDE")),
    loadMoreMedias: (data) => dispatch(sendToReducersAction("LIBRARY_SCROLL_LOAD_MORE",data)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaModal)
