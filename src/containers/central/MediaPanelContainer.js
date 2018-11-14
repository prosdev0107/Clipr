
import { connect } from 'react-redux'
import MediaPanel from '../../components/MediaPanel'
import currentCsItemEdited from "../../utilities/csItemFromList"

const mapStateToProps = state => {

    let cs_item = currentCsItemEdited(state)

    return {
        cs_item_general: cs_item.template.general,
        cs_item_media: cs_item.media,
        listen_drag_events: state.page_actions.listen_drag_events
    }
}

export default connect(mapStateToProps)(MediaPanel)