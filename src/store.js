import { createStore } from 'redux'
import rootReducer from './reducers'
import initSubscriber from 'redux-subscriber'
import LivetimeSave from "./utilities/API/LivetimeSave"

// Init state structure
const initialState = {
    "stickers" : [],
    'story_stickers' : [],
    "cs_item" : {
        'cnv_short_code' : "",
        "cs_item_id" : ""
    }
}

// Create store
const store = createStore(rootReducer, initialState)

// Subscribe to any change of story_stickers, so we can send new data to our APIs
export const subscriber = initSubscriber(store)
subscriber('story_stickers', state => {
    LivetimeSave(state)
})

export default store
