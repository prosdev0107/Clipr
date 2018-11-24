
import { connect } from 'react-redux'
import PreviewSwitcher from "../../components/PreviewSwitcher"
import {sendToReducersAction} from "../../actions";

const mapStateToProps = state => ({
    is_preview_mode: state.page_actions.is_preview_mode
})

const mapDispatchToProps = (dispatch) => ({
    switchPreviewMode: (new_preview_mode) => dispatch(sendToReducersAction("PREVIEW_SWITCHER_CHANGE_PREVIEW_MODE", new_preview_mode)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PreviewSwitcher)
