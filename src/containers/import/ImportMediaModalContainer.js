
import { connect } from 'react-redux'
import ImportMediaModal from '../../components/ImportMediaModal'
import {sendToReducersAction} from "../../actions";

const mapStateToProps = state => ({
    modal_show: state.import_media.show_modal,
    uploading_file: state.import_media.uploading_file,
    uploading_file_progress: state.import_media.uploading_file_progress
})

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(sendToReducersAction("HIDE_IMPORT_MEDIA_MODAL")),
    loadMoreMedias: (data) => dispatch(sendToReducersAction("LIBRARY_SCROLL_LOAD_MORE",data)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaModal)
