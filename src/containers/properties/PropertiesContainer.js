
import { connect } from 'react-redux'
import Properties from '../../components/Properties'
import {sendToReducersAction} from "../../actions";

const mapStateToProps = state => ({
    // Find the selected story sticker
    story_sticker: state.story_stickers.find((obj) => {
        return typeof obj.edit_info !== "undefined" && obj.edit_info.selected === true
    })
})

const mapDispatchToProps = (dispatch) => ({
    propertiesButtonAction: (event) => dispatch(sendToReducersAction(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Properties)
