import { createStore } from 'redux'
import rootReducer from './reducers'
import initSubscriber from 'redux-subscriber'
import LivetimeSave from "./utilities/API/LivetimeSave"

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
        sticker_fonts: [],
        sticker_css: "", // link to css file that include all svg styles
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
        stickers_menu_tab: 0,
        stickers_to_show: [],
        is_loading_stickers: false,
        search: {
            text: "",
            length: 0
        }
    },
    // Params depending on chosen media
    cs_item: {
        id: "",
        cnv_short_code: "",
        cnv_type: "INPUT",
        url: "",
        thumbnail: "",
        media: {
            src: "",
            thumbnail: "",
            ext: "",
            isVideo: false
        }
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
    // Fields below define the new custom edition of the media
    story_stickers: [],
    general: {
        overlay: {},
        theme: {},
    }
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
subscriber('general', state => {
    LivetimeSave(state)
})
subscriber('story_stickers', state => {
    LivetimeSave(state)
})


export default store
