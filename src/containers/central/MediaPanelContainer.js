
import { connect } from 'react-redux'
import MediaPanel from '../../components/MediaPanel'
import currentCsItemEdited from "../../utilities/csItemFromList"

const mapStateToProps = state => {

    let cs_item = currentCsItemEdited(state)

    return {
        cs_item_general: cs_item.template.general,
        cs_item_media: cs_item.media,
        is_preview_mode: state.page_actions.is_preview_mode,
        is_importing_media: state.import_media.show_modal,
        listen_drag_events: state.page_actions.listen_drag_events
    }
}

export default connect(mapStateToProps)(MediaPanel)