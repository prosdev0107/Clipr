
import api_client from "./CliprRequest"
import store from '../../store'
import {sendToReducersAction} from "../../actions";

var apiSaveTimeout
var clearMessageTimeout
// var saveTimeout = 1200 // For saving on live
var saveTimeout = 0 // Instant saving

// Send data directly to API
const LivetimeSave = (new_state) => {

    // Cancel previous API call delay
    if (apiSaveTimeout) {
        clearTimeout(apiSaveTimeout)
    }
    // Program a new API call after a delay of 2 seconds
    apiSaveTimeout = setTimeout(function() {

        updateSaveStatus(1)

        // Step 1 : reformat data from story_stickers
        let template = {
            'story_stickers': new_state.story_stickers,
            'general': new_state.general
        }

        // Step 2 : post data to API
        let cs_item = new_state.cs_item
        if (typeof cs_item.cnv_short_code !== "undefined" && cs_item.cnv_short_code.length > 0) {

            let request = api_client()
            request
                .post("/cnv/clip/"+cs_item.cnv_short_code+"/cs_items/"+cs_item.id+"/update", {'template': template})
                // Get response data and save in store
                .then(response => updateSaveStatus(200))
                .catch(error => updateSaveStatus(404,error.toString()))
        } else {
            updateSaveStatus(404,"wrong short code")
        }

    },saveTimeout)

    return true
}


// Update save status text
const updateSaveStatus = (status, text) => {

    clearTimeout(clearMessageTimeout)

    if (status === 1) {

        store.dispatch(sendToReducersAction("API_UPDATE_SAVING"))

    } else if (status === 200) {

        store.dispatch(sendToReducersAction("API_UPDATE_SAVED"))

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