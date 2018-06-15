import { createStore } from 'redux'
import rootReducer from './reducers'
import initSubscriber from 'redux-subscriber'
import LivetimeSave from "./utilities/API/LivetimeSave"

// Init state structure
const initialState = {
    stickers: [],
    story_stickers: [{
        id: "SSBox_1",
        sticker: {
            type: 'img',
            ratio: 1,
            source: {
                src: 'https://www.vectorportal.com/thumb_new/logo-elements-44.jpg',
            }
        },
        position: {
            x: 0.03,
            y: 0.24,
            width: 0.2,
            ratio: 1.5
        }
    }],
    cs_item: {
        id: "",
        cnv_short_code: ""
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
