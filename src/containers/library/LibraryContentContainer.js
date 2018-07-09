
import { connect } from 'react-redux'
import LibraryContent from '../../components/LibraryContent'

const mapStateToProps = state => ({
    tab: state.library_dynamic.stickers_menu_tab,
    stickers: state.params.stickers,
    is_loading_stickers: state.library_dynamic.is_loading_stickers
})

export default connect(mapStateToProps)(LibraryContent)
