
import { connect } from 'react-redux'
import MediaPanel from '../../components/MediaPanel'
import {sendToReducersAction} from "../../actions";


const mapStateToProps = state => ({
    cs_item: state.cs_item,
    overlay: state.general.overlay,
    data_saving_status: state.page_actions.data_saving_status
})

const mapDispatchToProps = (dispatch) => ({
    buttonClicked: (type, event) => dispatch(sendToReducersAction(type, event)),
})

export default connect(mapStateToProps,mapDispatchToProps)(MediaPanel)