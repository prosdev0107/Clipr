
import { connect } from 'react-redux'
import ImportMediaContent from '../../components/ImportMediaContent'

const mapStateToProps = (state,ownProps) => {

    let mediasStateKey = ownProps.source+"_"+ownProps.type
    let medias =
        typeof state.library_dynamic.search[mediasStateKey] !== "undefined" ?
            state.library_dynamic.search[mediasStateKey].medias || [] : []

    return {
        medias: medias,
        is_loading_medias: state.library_dynamic.is_loading_medias
    }
}
export default connect(mapStateToProps)(ImportMediaContent)
