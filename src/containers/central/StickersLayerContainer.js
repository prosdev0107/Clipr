
import { connect } from 'react-redux'
import StickersLayer from '../../components/StickersLayer'
import { transformStoryStickerAction } from "../../actions"


const mapStateToProps = state => ({
    story_stickers: state.story_stickers,
    listen_drag_events: state.listen_drag_events
})

const mapDispatchToProps = (dispatch) => ({
    transformStorySticker: (type, event) => dispatch(transformStoryStickerAction(type, event)),
})

export default connect(mapStateToProps,mapDispatchToProps)(StickersLayer)