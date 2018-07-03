import { createStore } from 'redux'
import rootReducer from './reducers'
import initSubscriber from 'redux-subscriber'
import LivetimeSave from "./utilities/API/LivetimeSave"

// Init state structure
const initialState = {
    stickers: [],
    fonts: [],
    page_actions: {
        page_is_loading: 1,
        listen_drag_events: 0,
        ask_for_data_saving: 0,
        data_saving_status: 0,
        stickers_menu_tab: 0,
        url_host: ""
    },
    story_stickers: [],
    general: {
        overlay: {},
    },
    cs_item: {
        id: "",
        cnv_short_code: ""
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
