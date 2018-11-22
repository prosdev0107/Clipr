
import { connect } from 'react-redux'
import ImportMediaResizer from '../../components/ImportMediaResizer'
import {sendToReducersAction} from "../../actions";

const mapStateToProps = state => ({
})

const mapDispatchToProps = (dispatch) => ({
    // closeModal: () => dispatch(sendToReducersAction("HIDE_IMPORT_MEDIA_MODAL")),
})


export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaResizer)
