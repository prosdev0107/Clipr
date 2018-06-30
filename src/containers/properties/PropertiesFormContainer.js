
import { connect } from 'react-redux'
import PropertiesForm from '../../components/PropertiesForm'
import { propertiesFormChangedAction } from '../../actions'

const mapStateToProps = (state,ownProps) => ({
    ...ownProps,
    fonts: state.fonts
})

const mapDispatchToProps = (dispatch) => ({
    formChanged: (event) => dispatch(propertiesFormChangedAction(event)),
})

export default connect(mapStateToProps,mapDispatchToProps)(PropertiesForm)
