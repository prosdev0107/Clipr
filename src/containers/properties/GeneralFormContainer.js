
import { connect } from 'react-redux'
import GeneralForm from '../../components/GeneralForm'
import {propertiesFormChangedAction, sendToReducersAction} from '../../actions'

const mapStateToProps = state => ({
    general: state.cs_item_edited_general,
    params: state.params
})

const mapDispatchToProps = (dispatch) => ({
    formChanged: (event) => dispatch(propertiesFormChangedAction(event)),
    preventEnterKeySubmit: (event) => dispatch(sendToReducersAction("FORM_PREVENT_ENTER_KEY_SUBMIT", event))
})

export default connect(mapStateToProps,mapDispatchToProps)(GeneralForm)
