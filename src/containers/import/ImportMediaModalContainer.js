
import { connect } from 'react-redux'
import ImportMediaModal from '../../components/ImportMediaModal'
import {sendToReducersAction} from "../../actions";

const mapStateToProps = state => ({
    modal_show: state.import_media.show_modal,
    uploading_file: state.import_media.uploading_file
})

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(sendToReducersAction("HIDE_IMPORT_MEDIA_MODAL")),
})


export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaModal)
