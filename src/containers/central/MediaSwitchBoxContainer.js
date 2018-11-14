
import { connect } from 'react-redux'
import MediaSwitchBox from "../../components/MediaSwitchBox";
import {sendToReducersAction} from "../../actions";

const mapStateToProps = (state, ownProps) => ({
    index: ownProps.index,
    selected: ownProps.selected,
    cs_item: ownProps.cs_item
})

const mapDispatchToProps = (dispatch) => ({
    mediasSwitchBoxAction: (type, cs_item) => dispatch(sendToReducersAction(type, cs_item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MediaSwitchBox)
