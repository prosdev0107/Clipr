
import { connect } from 'react-redux'
import MediaPanel from '../../components/MediaPanel'
import {sendToReducersAction} from "../../actions";


const mapStateToProps = state => ({
    cs_item: state.cs_item,
    general: state.general,
    params: state.params,
    data_saving_status: state.page_actions.data_saving_status
})

const mapDispatchToProps = (dispatch) => ({
    buttonClicked: (type, event) => dispatch(sendToReducersAction(type, event)),
})

export default connect(mapStateToProps,mapDispatchToProps)(MediaPanel)