
import { combineReducers } from 'redux'
import storyStickersReducer from './storyStickersReducer'
import stickersReducer from './stickersReducer'
import csItemReducer from './csItemReducer'
import pageActionsReducer from './pageActionsReducer'
import generalReducer from './generalReducer'

export default combineReducers({
    story_stickers: storyStickersReducer,
    general: generalReducer,
    stickers: stickersReducer,
    cs_item: csItemReducer,
    page_actions: pageActionsReducer,
})
