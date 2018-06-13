
// import api_client from './CliprRequest'
import _ from "lodash"

var apiSaveTimeout

// Send data directly to API
const LivetimeSave = (new_state) => {

    console.log("Ask for data save")
    // Cancel previous API call delay
    if (apiSaveTimeout) {
        console.log("Cancel previous call")
        clearTimeout(apiSaveTimeout)
    }

    // Program a new API call after a delay of 2 seconds
    apiSaveTimeout = setTimeout(function() {

        // Step 1 : reformat data from story_stickers
        // TODO : transform story stickers data to what need to save in database
        let template = new_state.story_stickers
        console.log("check if state has changed")

        // Step 2 : check if any change compared to cs_item data
        if (!_.isEqual(template,new_state.cs_item.template)) {

            // Step 3 : post data to API if differences found at step 2
            // TODO : post data with axios
            console.log("saving data : ",template)

        }

    },2000)

    return true
}

export default LivetimeSave