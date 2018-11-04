
import { connect } from 'react-redux'
import MediaPanel from '../../components/MediaPanel'

const mapStateToProps = state => ({
    cs_item: state.cs_item_edited,
    general: state.cs_item_edited_general,
    listen_drag_events: state.page_actions.listen_drag_events
})

export default connect(mapStateToProps)(MediaPanel)