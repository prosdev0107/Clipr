
import { combineReducers } from 'redux'
import storyStickersReducer from './storyStickersReducer'
import clipReducer from './clipReducer'
import csItemReducer from './csItemReducer'
import csItemsReducer from './csItemsReducer'
import pageActionsReducer from './pageActionsReducer'
import generalReducer from './generalReducer'
import paramsReducer from './paramsReducer'
import libraryDynamicReducer from './libraryDynamicReducer'

export default combineReducers({
    cs_item_edited_story_stickers: storyStickersReducer,
    cs_item_edited_general: generalReducer,
    cs_item_edited: csItemReducer,
    cs_items: csItemsReducer,
    clip: clipReducer,
    params: paramsReducer,
    page_actions: pageActionsReducer,
    library_dynamic: libraryDynamicReducer
})
