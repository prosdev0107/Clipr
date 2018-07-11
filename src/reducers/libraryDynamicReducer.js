
const libraryDynamicReducer = (state = [], action) => {

    switch (action.type) {

        case 'LIBRARY_TAB_SELECTED':

            let tab = parseInt(action.data,10) || 0
            // API call needed ?
            let willLoadData = (tab === 4 || tab === 1)

            return {
                ...state,
                stickers_menu_tab: parseInt(action.data,10) || 0,
                is_loading_stickers: willLoadData,
                search: {
                    ...state.search,
                    // Reinit content
                    text: "",
                    length: 0
                }
            }

        case 'LIBRARY_API_SEARCH_BAR_CHANGED':

            return {
                ...state,
                is_loading_stickers: true,
                search: {
                    ...state.search,
                    text: action.data,
                    // Reinit content
                    length: 0
                }
            }

        case 'LIBRARY_SCROLL_LOAD_MORE':

            // Load more content into library when scrolling down
            // We already know what have been loaded, so just need to pass is_loading_stickers to true
            // And SearchApiBar component will launch the load more process
            return {
                ...state,
                is_loading_stickers: true
            }

        case 'LIBRARY_EXTERNAL_CONTENT_LOADED':

            let pagination = action.data.pagination || {}
            let new_length = (pagination.count || 0) + (pagination.offset || 0)

            return {
                ...state,
                is_loading_stickers: false,
                search: {
                    ...state.search,
                    // Update total length of elements already updated
                    length: new_length
                }
            }

        default:
            return state
    }
}

export default libraryDynamicReducer