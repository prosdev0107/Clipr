
import { connect } from 'react-redux'
import SaveMenu from "../components/SaveMenu";
import {sendToReducersAction} from "../actions";

const mapStateToProps = state => ({
    data_saving_status: state.page_actions.data_saving_status
})

const mapDispatchToProps = (dispatch) => ({
    buttonClicked: (type, event) => dispatch(sendToReducersAction(type, event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SaveMenu)
