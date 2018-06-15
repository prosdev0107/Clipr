
import { connect } from 'react-redux'
import StickersLayer from '../../components/StickersLayer'
// import { transformSSBoxAction } from "../../actions"


const mapStateToProps = state => ({
    story_stickers: state.story_stickers
})

/*const mapDispatchToProps = (dispatch) => ({
    // What to do cursor is dragging a box inside storyStickerBoxes
    transformSSBox: (type, event) => dispatch(transformSSBoxAction(type, event)),
})*/

export default connect(mapStateToProps)(StickersLayer)