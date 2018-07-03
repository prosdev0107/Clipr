
const pageActionsReducer = (state = [], action) => {

    switch (action.type) {

        case 'LIBRARY_TAB_SELECTED':

            // Navigate through the different stickers category
            let tab = parseInt(action.data) || 0
            return {
                ...state,
                stickers_menu_tab: tab
            }

        case 'LIBRARY_STICKER_DRAG_START':

            // A sticker start to be dragged from library : we need to listen drag over events
            return {
                ...state,
                listen_drag_events: true
            }

        case 'STICKERS_LAYER_DRAG_START':

            // A sticker start to be dragged into the stickers layer
            return {
                ...state,
                listen_drag_events: true
            }

        case 'STICKERS_LAYER_MOUSE_DOWN':

            // A sticker start to be selected into the stickers layer
            return {
                ...state,
                listen_drag_events: true
            }

        case 'STICKERS_LAYER_ON_DROP':

            // Stop listening drag over events
            return {
                ...state,
                listen_drag_events: false
            }

        case 'API_UPDATE_LIBRARY':

            // We can consider page has finished loading
            return {
                ...state,
                page_is_loading: false
            }

        case 'API_UPDATE_URL_HOST':

            // Host url which we can post messages to
            return {
                ...state,
                url_host: action.data
            }

        case 'MEDIA_PANEL_SAVE_BTN_PRESSED':

            // Show user data is currently saving
            if (state.data_saving_status !== 0) {

                // Saving in progress, do nothing
                return state
            }

            // Trigger save action
            return {
                ...state,
                ask_for_data_saving: 1
            }

        case 'MEDIA_PANEL_DONE_BTN_PRESSED':

            // Send a message to parent frame to close the window
            if (state.url_host.length > 0 && window && window.parent) {
                window.parent.postMessage({
                    key: 'CLOSE_WINDOW'
                }, state.url_host)
            }

            return state

        case 'API_UPDATE_CLEAR_MESSAGE':

            return {
                ...state,
                data_saving_status: 0
            }

        case 'API_UPDATE_SAVING':

            // Show user data is currently saving
            return {
                ...state,
                data_saving_status: 1,
                ask_for_data_saving: 0
            }

        case 'API_UPDATE_SAVED':

            // Show user data is successfully saved
            return {
                ...state,
                data_saving_status: 2
            }

        case 'API_UPDATE_FAILED':

            // Show user data there was an error
            return {
                ...state,
                data_saving_status: action.data
            }


        default:
            return state
    }
}

export default pageActionsReducer