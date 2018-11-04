import { createStore } from 'redux'
import rootReducer from './reducers'
import initSubscriber from 'redux-subscriber'
import LivetimeSave from "./utilities/API/LivetimeSave"
import {TAB_GENERAL} from "./constants/constants"

// Init state structure
const initialState = {
    // Constants that allow to build the view
    params: {
        stickers: {
            pixabay: [],
            svg: [],
            text: [],
            giphy: []
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
        is_loading_stickers: false,
        search: {
            text: "",
            length: 0
        }
    },
    // Basic info about clip
    clip: {
        id: "",
        cnv_short_code: "",
        cnv_type: "INPUT",
        url_preview: ""
    },
    // List of all cs_items data, order by display order
    cs_items: {},
    // State of cs_item currently edited
    cs_item_edited: {
        id: "",
        media: {
            src: "",
            thumbnail: "",
            ext: "",
            isVideo: false
        },
    },
    cs_item_edited_story_stickers: [],
    cs_item_edited_general: {
        overlay: {},
        theme: {},
        img_filter_class: "",
    },
    // Live status of some actions
    page_actions: {
        // Is page currently initializing
        page_is_loading: true,
        // Record which data was sent to API for saving, so we are able to know if we should make save btn appear or not
        last_data_saved: null,
        // Should we make save btn appeared, i.e. has last_data_saved changed
        data_unsaved: false,
        // Should we put drag event listener on library or media panel
        listen_drag_events: false,
        // When true, API is called to save data
        ask_for_data_saving: false,
        // 1 means saving in progress, 2 means saving has succeeded. If string, that's an error
        data_saving_status: 0,
        // Host of eb page which is running this editor through iframe
        url_host: ""
    },

}


// Create store
const store = createStore(rootReducer, initialState)

// Subscribe to any change of story_stickers, so we can send new data to our APIs
// https://github.com/ivantsov/redux-subscriber
export const subscriber = initSubscriber(store)
subscriber('page_actions', state => {
    // Update only if asked for
    if (state.page_actions.ask_for_data_saving) {
        LivetimeSave(state)
    }
})
subscriber('cs_item_edited_general', state => {
    LivetimeSave(state)
})
subscriber('cs_item_edited_story_stickers', state => {
    LivetimeSave(state)
})


export default store
