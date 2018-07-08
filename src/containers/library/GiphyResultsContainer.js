
import { connect } from 'react-redux'
import GiphyResults from "../../components/GiphyResults";
import {sendToReducersAction} from "../../actions";

const mapStateToProps = state => ({
    gifs: state.params.stickers.giphy_stickers || [],
})

const mapDispatchToProps = (dispatch) => ({
    gifSelected: (event) => dispatch(sendToReducersAction("LIBRARY_GIPHY_SELECTED", event)),
})

export default connect(mapStateToProps,mapDispatchToProps)(GiphyResults)
