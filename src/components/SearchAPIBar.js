import React from 'react'
import {renderField} from "./form/renderField"
import {reduxForm} from "redux-form";
import {vectorSourcing} from "../utilities/API/VectorSourcing";

const SearchAPIBar = ({search, is_loading_stickers, tab, formChanged, stickersLoaded, preventEnterKeySubmit}) => {

    // Each time the search text changed, this component is reloaded

    // Which api should we call ?
    let api_source = tab === 4 ? "giphy" : "pixabay"

    // Init with saved params
    if (is_loading_stickers) {
        vectorSourcing(
            api_source,
            search.text || "",
            search.length || 0,
            stickersLoaded
        )
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
                        value: search.text || ""
                    }
                }) }

                <p className="text-center"><small>Powered By <span className="uppercase">{ api_source }</span></small></p>

            </form>
        </div>

    </div>

}

export default reduxForm({
    form: 'giphyForm'
})(SearchAPIBar)
