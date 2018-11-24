
import { connect } from 'react-redux'
import ClipIframe from '../../components/ClipIframe'


const mapStateToProps = (state, ownProps) => ({
    theme: state.clip.theme,
    params: state.params,
    url_preview: state.clip.url_preview,
    is_preview: ownProps.is_preview // What is this frame displaying : only buttons, or clip preview ?
})


export default connect(mapStateToProps)(ClipIframe)
