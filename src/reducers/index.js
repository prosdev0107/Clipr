
import { combineReducers } from 'redux'
import storyStickersReducer from './storyStickersReducer'
import stickersReducer from './stickersReducer'
import csItemReducer from './csItemReducer'
import pageActionsReducer from './pageActionsReducer'
import generalReducer from './generalReducer'
import fontsReducer from './fontsReducer'

export default combineReducers({
    story_stickers: storyStickersReducer,
    general: generalReducer,
    stickers: stickersReducer,
    fonts: fontsReducer,
    cs_item: csItemReducer,
    page_actions: pageActionsReducer,
})
