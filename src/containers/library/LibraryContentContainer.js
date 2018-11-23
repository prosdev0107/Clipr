
import { connect } from 'react-redux'
import LibraryContent from '../../components/LibraryContent'
import {TAB_GIF, TAB_IMAGE, TAB_TEXT} from "../../constants/constants";

const mapStateToProps = (state,ownProps) => {

    let selected_tab = state.library_dynamic.stickers_menu_tab

    if (selected_tab === TAB_GIF || selected_tab === TAB_IMAGE) {

        // Content is stored in library_dynamic state

        let mediasStateKey = ownProps.source+"_"+ownProps.type
        let medias =
            typeof state.library_dynamic.search[mediasStateKey] !== "undefined" ?
                state.library_dynamic.search[mediasStateKey].medias || [] : []

        return {
            tab: selected_tab,
            stickers: medias,
            is_loading_medias: state.library_dynamic.is_loading_medias
        }

    }

    // Svg (texte or pure svg) : content stored in params state
    let stickersStateKey = selected_tab === TAB_TEXT ? "text" : "svg"

    return {
        tab: selected_tab,
        stickers: state.params.stickers[stickersStateKey] || [],
        is_loading_medias: state.library_dynamic.is_loading_medias
    }
}

export default connect(mapStateToProps)(LibraryContent)
