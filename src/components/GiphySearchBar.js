import React from 'react'
import {renderField} from "./form/renderField"
import {reduxForm} from "redux-form";
import axios from "axios/index";
import config from "../config";

const GiphySearchBar = ({gifsLoaded}) => {

    let giphy_api_key =  config.api_giphy.API_KEY

    // Load data from GiphySearchBar
    const formChanged = (event) => {

        let searchText = event.target.value || ""
        launchSearch(searchText)
    }

    const launchSearch = (text, type) => {

        // Sticker with transparency or gifs
        type = type || "stickers"

        // If no search text, pick random
        let query = text.length > 0 ? "search?q="+text : "trending"
        query = query.indexOf("?") === -1 ? query+"?api_key="+giphy_api_key :  query+"&api_key="+giphy_api_key;

        axios.get(`https://api.giphy.com/v1/${type}/${query}`).then((response) => {

            var gifData = response.data.data
            if (typeof gifData !== "undefined" && gifData != null) {
                gifsLoaded(gifData)
            }
        })
    }

    // Init with trends
    launchSearch("")

    return <div className="giphy-container">

        <div className="giphy-search-bar">

            <form onChange={(event) => formChanged(event)}>

                { renderField({
                    id: "giphy_search_bar",
                    nonMaterial: true,
                    placeholder: "Rechercher par mots-clés...",
                    input: {
                        type: "text",
                    }
                }) }

                <p className="text-center"><small>Powered By GIPHY</small></p>

            </form>
        </div>

    </div>

}

export default reduxForm({
    form: 'giphyForm'
})(GiphySearchBar)
