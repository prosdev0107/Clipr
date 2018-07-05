import { createStore } from 'redux'
import rootReducer from './reducers'
import initSubscriber from 'redux-subscriber'
import LivetimeSave from "./utilities/API/LivetimeSave"

// Init state structure
const initialState = {
    // Constants that allow to build the view
    params: {
        stickers: [],
        sticker_fonts: [],
        img_animations: [],
        themes: {
            colors: [],
            fonts: [],
            default_font: "",
            default_color: ""
        },
    },
    // Params depending on chosen media
    cs_item: {
        id: "",
        cnv_short_code: "",
        cnv_type: "INPUT",
        media: {}
    },
    // Live status of some actions
    page_actions: {
        page_is_loading: 1,
        listen_drag_events: 0,
        ask_for_data_saving: 0,
        data_saving_status: 0,
        stickers_menu_tab: 0,
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
export const subscriber = initSubscriber(store)
subscriber('page_actions', state => {
    // Update only if asked for
    if (state.page_actions.ask_for_data_saving) {
        LivetimeSave(state)
    }
})

export default store
