
import { connect } from 'react-redux'
import GiphySearchBar from '../../components/GiphySearchBar'
import {sendToReducersAction} from "../../actions";

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch) => ({
    gifsLoaded: (gifs) => dispatch(sendToReducersAction("LIBRARY_GIPHY_GIFS_LOADED", gifs)),
})

export default connect(mapStateToProps,mapDispatchToProps)(GiphySearchBar)
