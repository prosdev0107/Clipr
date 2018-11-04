
import { connect } from 'react-redux'
import ClipIframe from '../../components/ClipIframe'

const mapStateToProps = state => ({
    theme: state.cs_item_edited_general.theme,
    params: state.params,
    url_preview: state.clip.url_preview,
})


export default connect(mapStateToProps)(ClipIframe)
