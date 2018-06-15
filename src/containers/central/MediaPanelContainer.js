
import { connect } from 'react-redux'
import MediaPanel from '../../components/MediaPanel'


const mapStateToProps = state => ({
    cs_item: state.cs_item
})

export default connect(mapStateToProps)(MediaPanel)