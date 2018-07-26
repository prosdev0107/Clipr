
import { connect } from 'react-redux'
import LibraryImgFilters from "../../components/LibraryImgFilters";
import {sendToReducersAction} from "../../actions";

const mapStateToProps = state => ({
    img_filters: state.params.img_filters,
    current_filter_class: state.general.img_filter_class,
    media_thumbnail: state.cs_item.media.thumbnail
})

const mapDispatchToProps = (dispatch) => ({
    changeFilter: (filter_className) => dispatch(sendToReducersAction("LIBRARY_CHANGE_FILTER_CLASS",filter_className))
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryImgFilters)
