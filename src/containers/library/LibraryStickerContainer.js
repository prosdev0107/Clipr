
import { connect } from 'react-redux'
import Sticker from '../../components/Sticker'

const mapStateToProps = (state, ownProps) => ({sticker: ownProps.sticker})

export default connect(mapStateToProps)(Sticker)
