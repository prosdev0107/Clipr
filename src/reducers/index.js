
import { combineReducers } from 'redux'
import storyStickersReducer from './storyStickersReducer'
import stickersReducer from './stickersReducer'
import csItemReducer from './csItemReducer'
import listenDragEventsReducer from './listenDragEventsReducer'

export default combineReducers({
    story_stickers: storyStickersReducer,
    stickers: stickersReducer,
    cs_item: csItemReducer,
    listen_drag_events: listenDragEventsReducer
})
