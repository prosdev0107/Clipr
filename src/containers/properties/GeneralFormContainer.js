
import { connect } from 'react-redux'
import GeneralForm from '../../components/GeneralForm'
import { propertiesFormChangedAction } from '../../actions'

const mapStateToProps = state => ({
    general: state.general
})

const mapDispatchToProps = (dispatch) => ({
    formChanged: (event) => dispatch(propertiesFormChangedAction(event)),
})

export default connect(mapStateToProps,mapDispatchToProps)(GeneralForm)
