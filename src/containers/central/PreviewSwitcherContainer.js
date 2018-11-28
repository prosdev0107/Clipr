
import { connect } from 'react-redux'
import PreviewSwitcher from "../../components/PreviewSwitcher"
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    is_preview_mode: state.page_actions.is_preview_mode
})

const mapDispatchToProps = (dispatch) => ({
    switchPreviewMode: (positions) => dispatch(sendToReducersAction("MEDIA_SWITCHER_SWITCH_MEDIA", positions)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PreviewSwitcher)
