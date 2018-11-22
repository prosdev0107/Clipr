
import api_client from "./CliprRequest"
import store from '../../store'
import {sendToReducersAction} from "../../actions"
import data_providers from '../../api_endpoints.js'


// Create a CS Item from uploaded file
const createCSItemFromFile = (file) => {

    let cnvShortCode = store.getState().clip.cnv_short_code

    // When creating a new media, we must submit file to server
    // So we can generate compressed media and create a new cs_item
    var postData = new FormData()
    postData.append('file', file)

    // Call create API asynchronously
    let request = api_client()
    request
        .post(data_providers.cs_item.create(cnvShortCode), postData)
        .then(response => {
            console.log(response)

            // Server returns the news cs_item, we just need to append it to our cs_items array
            store.dispatch(sendToReducersAction("API_CREATE_CS_ITEM",response.data))

            // Also close media import modal
            store.dispatch(sendToReducersAction("HIDE_IMPORT_MEDIA_MODAL",response.data))

        })
        .catch(error => console.log(error.toString()))
}

export default createCSItemFromFile