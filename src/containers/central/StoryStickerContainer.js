

import { connect } from 'react-redux'
import StorySticker from '../../components/StorySticker'

const mapStateToProps = (state, ownProps) => (
    state.story_stickers.filter((e) => e.id === ownProps.id)[0]
)

export default connect(
    mapStateToProps
)(StorySticker)