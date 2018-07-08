
import { connect } from 'react-redux'
import ClipIframe from '../../components/ClipIframe'

const mapStateToProps = state => ({
    theme: state.general.theme,
    params: state.params,
    url_clip: state.cs_item.url,
})


export default connect(mapStateToProps)(ClipIframe)
