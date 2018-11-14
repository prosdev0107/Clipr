
import { connect } from 'react-redux'
import MediasSwitcher from "../../components/MediasSwitcher"

const mapStateToProps = state => ({
    cs_items: state.cs_items,
    cs_item_index_editing: state.cs_item_index_editing
})


export default connect(mapStateToProps)(MediasSwitcher)
