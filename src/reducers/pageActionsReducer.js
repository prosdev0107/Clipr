

const pageActionsReducer = (state = [], action) => {

    let nowTime = new Date().getTime()

    switch (action.type) {

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

        case 'API_LOADING_ENDED':

            // We can consider page has finished loading
            return {
                ...state,
                page_is_loading: false,
                last_save_time: nowTime
            }

        case 'API_UPDATE_URL_HOST':

            // Host url which we can post messages to
            return {
                ...state,
                url_host: action.data
            }

        case 'SAVE_MENU_CLOSE_BTN_PRESSED':

            // Send a message to parent frame to close the window
            if (state.url_host.length > 0 && window && window.parent) {
                window.parent.postMessage({
                    key: 'CLOSE_WINDOW'
                }, state.url_host)
            }

            return state

        case 'API_RECORD_LAST_SAVED_DATA':

            return {
                ...state,
                data_unsaved: action.data.data_unsaved,
                last_data_saved: action.data.last_data_saved || state.last_data_saved
            }

        case 'API_UPDATE_CLEAR_MESSAGE':

            return {
                ...state,
                data_saving_status: 0,
            }

        case 'API_UPDATE_SAVING':

            // Show user data is currently saving
            return {
                ...state,
                data_saving_status: 1,
                last_save_time: nowTime
            }

        case 'API_UPDATE_SAVED':

            // Last data sent to server ?
            let lastDataSaved = action.data

            // Show user data is successfully saved
            return {
                ...state,
                data_saving_status: 2,
                data_unsaved: false,
                last_data_saved: lastDataSaved
            }

        case 'API_UPDATE_FAILED':

            // Show user data there was an error
            return {
                ...state,
                data_saving_status: action.data,
            }

        case 'PREVIEW_SWITCHER_CHANGE_PREVIEW_MODE':

            // Switch between editor and simulator mode
            return {
                ...state,
                is_preview_mode: action.data === true,
            }

        default:
            return state
    }
}

export default pageActionsReducer