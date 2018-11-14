
import { connect } from 'react-redux'
import ClipIframe from '../../components/ClipIframe'


const mapStateToProps = state => ({
    theme: state.clip.theme,
    params: state.params,
    url_preview: state.clip.url_preview,
})


export default connect(mapStateToProps)(ClipIframe)
