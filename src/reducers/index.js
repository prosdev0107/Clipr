
import { combineReducers } from 'redux'
import storyStickersReducer from './storyStickersReducer'
import csItemReducer from './csItemReducer'
import pageActionsReducer from './pageActionsReducer'
import generalReducer from './generalReducer'
import paramsReducer from './paramsReducer'
import libraryDynamicReducer from './libraryDynamicReducer'

export default combineReducers({
    story_stickers: storyStickersReducer,
    general: generalReducer,
    params: paramsReducer,
    cs_item: csItemReducer,
    page_actions: pageActionsReducer,
    library_dynamic: libraryDynamicReducer
})
