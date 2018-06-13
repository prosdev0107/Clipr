
import { connect } from 'react-redux'
import Library from '../../components/Library'

const mapStateToProps = state => ({
    stickers: state.stickers
})

export default connect(mapStateToProps)(Library)
