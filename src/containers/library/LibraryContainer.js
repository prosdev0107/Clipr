
import { connect } from 'react-redux'
import Library from '../../components/Library'
import {selectFromLibraryAction} from "../../actions";

const mapStateToProps = state => ({
    stickers: state.stickers
})

const mapDispatchToProps = (dispatch) => ({
    selectFromLibrary: (type, event) => dispatch(selectFromLibraryAction(type, event)),
})


export default connect(mapStateToProps,mapDispatchToProps)(Library)
