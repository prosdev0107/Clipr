
import { connect } from 'react-redux'
import ImportMediaAPIMedia from '../../components/ImportMediaAPIMedia'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = (state,ownProps) => {

    // Before defining state, let's determinate if this media is the one currently pre-selected by user
    let media = ownProps.media
    let mediaUrl = media.source.src
    let selected_file = typeof state.import_media.file_to_upload === "string" ? state.import_media.file_to_upload : ""
    let isCurrentlyPreselected = mediaUrl === selected_file

    return {
        media: ownProps.media,
        isCurrentlyPreselected: isCurrentlyPreselected
    }
}

const mapDispatchToProps = (dispatch) => ({
    preselectMedia: (file) => dispatch(sendToReducersAction("IMPORT_MEDIA_SELECT_MEDIA", {file: file})),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaAPIMedia)