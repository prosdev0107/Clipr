
import api_client from "./CliprRequest"
import store from '../../store'
import {sendToReducersAction} from "../../actions";
import isEqual from 'lodash/isEqual'

var apiSaveTimeout
var clearMessageTimeout
// var saveTimeout = 1200 // For saving on live
var saveTimeout = 0 // Instant saving

// Send data directly to API
const LivetimeSave = (new_state) => {


    // Extract data to save
    let template = extractDataToSaveFromState(new_state)

    // Should we make save btn appeared ?
    hasDataChanged(new_state,template)

    // If people pressed the button, send to API
    if (new_state.page_actions.ask_for_data_saving) {

        // Cancel previous API call delay
        if (apiSaveTimeout) {
            clearTimeout(apiSaveTimeout)
        }
        // Program a new API call after a delay of 2 seconds
        apiSaveTimeout = setTimeout(function() {

            updateSaveStatus(1)

            // Post data to API
            let cs_item = new_state.cs_item

            if (typeof cs_item.cnv_short_code !== "undefined" && cs_item.cnv_short_code.length > 0) {

                let request = api_client()
                request
                    .post("/cnv/clip/"+cs_item.cnv_short_code+"/cs_items/"+cs_item.id+"/update", {'template': template})
                    // Get response data and save in store
                    .then(response => updateSaveStatus(200,null,template))
                    .catch(error => updateSaveStatus(404,error.toString()))
            } else {
                updateSaveStatus(404,"wrong short code")
            }

        },saveTimeout)
    }

    return true
}

// Clean data before saving
const extractDataToSaveFromState = (state) => ({

    // We always need to save the whole content of general
    general: state.general,

    // Some fields of story stickers are useless, we need to remove them
    story_stickers: state.story_stickers.map(storySticker => ({
        position: {
            maxWidth: storySticker.position.maxWidth || 0,
            ratio: storySticker.position.ratio || 0,
            rotation: storySticker.position.rotation || 0,
            width: storySticker.position.width || 0,
            x: storySticker.position.x || 0,
            y: storySticker.position.y || 0,
        },
        sticker: storySticker.sticker,
        id: storySticker.id
    }))
})


// Test if data to save is different from old one
// We can't do that directly in reducer, else this would be an infinite loop
const hasDataChanged = (state, dataToSave) => {

    let oldData = state.page_actions.last_data_saved

    // If no previous data, that's page initialization. We fill last_data_saved but we don't make save btn appear
    if (state.page_is_loading || typeof oldData === "undefined" || oldData === null) {

        // Just fill data
        if (dataToSave !== null) {
            // Just call reducer if data changed
            store.dispatch(sendToReducersAction("API_RECORD_LAST_SAVED_DATA",{
                last_data_saved: dataToSave,
                data_unsaved: false
            }))
        }

    } else if (!isEqual(oldData,dataToSave)) {

        // Data has changed since last api call, need to show user he should save
        if (state.page_actions.data_unsaved !== true) {
            // Just call reducer if data changed
            store.dispatch(sendToReducersAction("API_RECORD_LAST_SAVED_DATA",{
                data_unsaved: true
            }))
        }

    } else {

        // No edit since last api call
        if (state.page_actions.data_unsaved !== false) {
            // Just call reducer if data changed
            store.dispatch(sendToReducersAction("API_RECORD_LAST_SAVED_DATA",{
                data_unsaved: false
            }))
        }
    }
}


// Update save status text
const updateSaveStatus = (status, text,template) => {

    clearTimeout(clearMessageTimeout)

    if (status === 1) {

        store.dispatch(sendToReducersAction("API_UPDATE_SAVING"))

    } else if (status === 200) {

        // Edit saving status, also record last saved data
        store.dispatch(sendToReducersAction("API_UPDATE_SAVED",template))

        // Hide message after 2 sec
        clearMessageTimeout = setTimeout(function() {
            store.dispatch(sendToReducersAction("API_UPDATE_CLEAR_MESSAGE"))
        },2000)

    } else {

        // Probably an error
        store.dispatch(sendToReducersAction("API_UPDATE_FAILED",text))
        clearMessageTimeout = setTimeout(function() {
            store.dispatch(sendToReducersAction("API_UPDATE_CLEAR_MESSAGE"))
        },2000)
    }
}

export default LivetimeSave