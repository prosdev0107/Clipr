
import { connect } from 'react-redux'
import ImportMediaContent from '../../components/ImportMediaContent'

const mapStateToProps = (state,ownProps) => {

    let mediasStateKey = ownProps.source+"_"+ownProps.type
    let mediasSearch = state.library_dynamic.search[mediasStateKey] || {}

    return {
        medias: mediasSearch.medias || [],
        is_loading: mediasSearch.is_loading || false
    }
}
export default connect(mapStateToProps)(ImportMediaContent)
