
import api_client from "./CliprRequest"

var apiSaveTimeout

// Send data directly to API
const LivetimeSave = (new_state) => {

    // Cancel previous API call delay
    if (apiSaveTimeout) {
        clearTimeout(apiSaveTimeout)
    }

    // Program a new API call after a delay of 2 seconds
    apiSaveTimeout = setTimeout(function() {

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
                .then()
                .catch(error => console.log(error))
        }

    },2000)

    return true
}

export default LivetimeSave