
import { connect } from 'react-redux'
import Library from '../../components/Library'
import {selectFromLibraryAction,sendToReducersAction} from "../../actions";

const mapStateToProps = state => ({
    stickers: state.stickers,
    stickers_menu_tab: state.page_actions.stickers_menu_tab
})

const mapDispatchToProps = (dispatch) => ({
    selectFromLibrary: (type, event) => dispatch(selectFromLibraryAction(type, event)),
    changeTab: (tab) => dispatch(sendToReducersAction("LIBRARY_TAB_SELECTED", tab)),
})


export default connect(mapStateToProps,mapDispatchToProps)(Library)
