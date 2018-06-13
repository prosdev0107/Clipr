
import { combineReducers } from 'redux'
import storyStickersReducer from './storyStickersReducer'
import stickersReducer from './stickersReducer'
import csItemReducer from './csItemReducer'

export default combineReducers({
    story_stickers: storyStickersReducer,
    stickers: stickersReducer,
    cs_item: csItemReducer
})
