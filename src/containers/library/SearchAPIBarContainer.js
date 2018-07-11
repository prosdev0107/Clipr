
import { connect } from 'react-redux'
import SearchAPIBar from '../../components/SearchAPIBar'
import {sendToReducersAction} from "../../actions";

const mapStateToProps = state => ({
    search: state.library_dynamic.search,
    tab: state.library_dynamic.stickers_menu_tab,
    is_loading_stickers: state.library_dynamic.is_loading_stickers
})

const mapDispatchToProps = (dispatch) => ({
    formChanged: (text) => dispatch(sendToReducersAction("LIBRARY_API_SEARCH_BAR_CHANGED", text)),
    stickersLoaded: (stickers,api_source,pagination, reinitialize) => dispatch(sendToReducersAction("LIBRARY_EXTERNAL_CONTENT_LOADED", {
        stickers,
        api_source,
        pagination,
        reinitialize
    })),
    preventEnterKeySubmit: (event) => dispatch(sendToReducersAction("FORM_PREVENT_ENTER_KEY_SUBMIT", event))
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchAPIBar)
