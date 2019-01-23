
import { connect } from 'react-redux'
import ClipIframe from '../../components/ClipIframe'


const mapStateToProps = (state, ownProps) => ({
    url_preview: state.clip.url_preview,
    is_preview: ownProps.is_preview, // What is this frame displaying : only buttons, or clip preview ?
    randomized: state.params.iFrameRandomized // allows us to refresh iframe content each time appearance of theme or timer is modified
})


export default connect(mapStateToProps)(ClipIframe)
