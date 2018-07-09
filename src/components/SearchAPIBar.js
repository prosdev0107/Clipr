import React from 'react'
import {renderField} from "./form/renderField"
import {reduxForm} from "redux-form";
import axios from "axios/index";
import config from "../config";

const SearchAPIBar = ({search, is_loading_stickers, tab, formChanged, gifsLoaded, preventEnterKeySubmit}) => {


    // TODO : modifier le code en utilisant tab pour appeler la bonne API selon l'onglet
    // TODO : à maj côté reducer du coup
    // Faut donc également dans config.js l'url à appeler pour la recherche, et l'url par défaut appeler si pas de texte

    // Each time the search text changed, this component is reloaded

    let giphy_api_key =  config.api_giphy.API_KEY
    let searchText = search.text || ""
    let alreadyLoadedLength = search.length || 0

    const launchSearch = (apiKey, text, length) => {

        // If no search text, pick random
        let query = text.length > 0 ? "search?q="+text : "trending"
        query = query.indexOf("?") === -1 ? query+"?offset="+length :  query+"&offset="+length
        query += "&api_key="+apiKey

        axios.get(`https://api.giphy.com/v1/stickers/${query}`).then((response) => {

            var gifData = response.data.data
            if (typeof gifData !== "undefined" && gifData != null) {

                let shouldReinitializeContent = alreadyLoadedLength === 0

                // Also need to indicate pagination data here data because of asynchronous calls
                let paginationData = {
                    count: response.data.pagination.count,
                    offset: response.data.pagination.offset,
                }

                gifsLoaded(gifData, paginationData,shouldReinitializeContent)
            }
        })
    }

    // Init with saved params
    if (is_loading_stickers) {
        launchSearch(giphy_api_key, searchText, alreadyLoadedLength)
    }

    return <div className="search-api-bar-container">

        <div className="search-api-bar">

            <form onChange={(event) => formChanged(event.target.value || "")}
                  // Prevent submit on enter key
                  onKeyPress={(event) => preventEnterKeySubmit(event)} >

                { renderField({
                    id: "search_api_bar",
                    nonMaterial: true,
                    placeholder: "Rechercher par mots-clés...",
                    input: {
                        type: "text",
                        value: searchText
                    }
                }) }

                <p className="text-center"><small>Powered By GIPHY</small></p>

            </form>
        </div>

    </div>

}

export default reduxForm({
    form: 'giphyForm'
})(SearchAPIBar)
