import { createStore } from 'redux'
import rootReducer from './reducers'
import initSubscriber from 'redux-subscriber'
import {LivetimeSave,TriggerSave} from "./utilities/API/LivetimeSave"
import {TAB_GENERAL} from "./constants/constants"

// Init state structure
const initialState = {
    // Constants that allow to build the view
    params: {
        stickers: {
            svg: [],
            text: [],
        },
        img_filters: [], // Filters to modify media rendering
        img_filters_css: "", // Link to css file that include all css filters styles
        sticker_fonts: [],
        sticker_css: "", // Link to css file that include all svg styles
        img_animations: [],
        themes: {
            colors: [],
            fonts: [],
            default_font: "",
            default_color: "",
            use_static_color: false
        }
    },
    // Params about loaded content through library tabs
    library_dynamic: {
        stickers_menu_tab: TAB_GENERAL,
        stickers_to_show: [],
        search: {
            // Length and text of each search type (pixabay, giphy, sticker, video...) will be stored there
            // ex :
            // pixabay_sticker : {
            //      text: "boat",
            //      length: 30,
            //      medias: [],
            //      is_loading: true
            // }
        },
    },
    // Live status of some actions
    page_actions: {
        // Is page currently initializing
        page_is_loading: true,
        // 1 means saving in progress, 2 means saving has succeeded. If string, that's an error
        data_saving_status: 0,
        // Should we put drag event listener on library or media panel
        listen_drag_events: false,
        // Host of eb page which is running this editor through iframe
        url_host: "",
        // Switch between editor and preview mode
        is_preview_mode: false
    },
    import_media: {
        // Display new/edit media modal
        show_modal: false,
        // File that has been chosen for import. Could be a file object, or a url
        file_to_upload: null,
        resizer: {
            display: false,
            cropped_zone: {},
            zoom: 1
        },
        // Progress (scale 0-100) of current file uploading to server
        uploading_file_progress: 0,
        uploading_file: false,
    },
    // Basic info about clip (CONSTANT once editor is opened)
    clip: {
        id: "",
        cnv_short_code: "",
        cnv_type: "INPUT",
        url_preview: ""
    },
    // List of all cs_items data, order by display order (DATA WILL VARY)
    cs_items: [], // Check utilities/csItemFromList to get schema of ONE cs item
    // Index of current cs_item being edited
    cs_item_index_editing: 0,
    // Track every change user made to let it undo/redo his actions
    history: {
        past: [],
        present: {},
        future: [],
        sendToServer: false,    // Should data be sent through saving API,
        redoOrUndoAsked: false
    }
}


// Create store
const store = createStore(rootReducer, initialState)

// Subscribe to any change of story_stickers, so we can send new data to our APIs
// https://github.com/ivantsov/redux-subscriber
export const subscriber = initSubscriber(store)
subscriber('cs_items', state => {
    LivetimeSave(state)
})
subscriber('clip', state => {
    LivetimeSave(state)
})
subscriber('history', state => {
    TriggerSave(state)
})


export default store
