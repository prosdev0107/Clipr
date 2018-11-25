
import api_client from "./CliprRequest"
import store from '../../store'
import {sendToReducersAction} from "../../actions"
import data_providers from '../../api_endpoints.js'


// Create a CS Item from uploaded file
const createCSItemFromFile = (file, cropped_zone) => {

    let cnvShortCode = store.getState().clip.cnv_short_code
    let postData

    // Initialize state
    store.dispatch(sendToReducersAction("API_CREATE_CS_ITEM_BEGIN"))

    // When creating a new media, we must submit file to server
    // So we can generate compressed media and create a new cs_item
    if (typeof file === "string") {
        // That's a URL string. Server will download it by itself
        postData = {file: file, cropped_zone: cropped_zone}
    } else {
        postData = new FormData()
        postData.append('file', file)
        postData.append('cropped_zone', JSON.stringify(cropped_zone))
    }

    // Get and store progress status of upload
    let config = {
        onUploadProgress: progressEvent => {
            // Store progress status in global state
            let percentCompleted = Math.min(100,Math.max(0,Math.floor((progressEvent.loaded * 100) / progressEvent.total)));
            store.dispatch(sendToReducersAction("IMPORT_MEDIA_PROGRESS_PERCENT",percentCompleted))
        }
    }

    // Call create API asynchronously
    let request = api_client()
    request
        .post(data_providers.cs_item.create(cnvShortCode), postData, config)
        .then(response => {

            // Server returns the new cs_item, we just need to append it to our cs_items array
            store.dispatch(sendToReducersAction("API_CREATE_CS_ITEM_END",{
                ...response.data,
                new_items_length: store.getState().cs_items.length +1
            }))

            // Also close media import modal
            store.dispatch(sendToReducersAction("HIDE_IMPORT_MEDIA_MODAL",response.data))

        })
        .catch(error => console.log(error.toString()))
}

export default createCSItemFromFile