import { createStore } from 'redux'
import rootReducer from './reducers'
import initSubscriber from 'redux-subscriber'
import LivetimeSave from "./utilities/API/LivetimeSave"
import {sendToReducersAction} from "./actions";

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
        media: {
            src: "",
            thumbnail: "",
            ext: "",
            isVideo: false
        }
    },
    // Live status of some actions
    page_actions: {
        data_unsaved: false,
        page_is_loading: true,
        listen_drag_events: false,
        ask_for_data_saving: false,
        data_saving_status: 0,
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
    if (!state.page_actions.page_is_loading && !state.page_actions.data_unsaved) {
        store.dispatch(sendToReducersAction("API_DATA_UNSAVED"))
    }
})
subscriber('story_stickers', state => {
    if (!state.page_actions.page_is_loading && !state.page_actions.data_unsaved) {
        store.dispatch(sendToReducersAction("API_DATA_UNSAVED"))
    }
})


export default store
