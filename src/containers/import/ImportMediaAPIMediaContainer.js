
import { connect } from 'react-redux'
import ImportMediaAPIMedia from '../../components/ImportMediaAPIMedia'

const mapStateToProps = (state,ownProps) => ({
        media: ownProps.media,
    })


export default connect(mapStateToProps)(ImportMediaAPIMedia)