
import { connect } from 'react-redux'
import MediasSwitcher from "../../components/MediasSwitcher"
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    cs_items: state.cs_items,
    cs_item_index_editing: state.cs_item_index_editing
})

const mapDispatchToProps = (dispatch) => ({
    sendToReducers: (type, new_cs_items) => dispatch(sendToReducersAction(type, new_cs_items)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MediasSwitcher)
