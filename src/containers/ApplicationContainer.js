
import { connect } from 'react-redux'
import ApplicationWrapper from '../components/ApplicationWrapper'

const mapStateToProps = state => ({
    page_is_loading: state.page_actions.page_is_loading,
    data_saving_status: state.page_actions.data_saving_status
})

export default connect(mapStateToProps)(ApplicationWrapper)
