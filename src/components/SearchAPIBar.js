import React from 'react'
import {renderField} from "./form/renderField"
import {reduxForm} from "redux-form"
import {vectorSourcing} from "../utilities/API/VectorSourcing"

const SearchAPIBar = ({api_source, type, searchText, searchResultsLength, is_loading, formChanged, stickersLoaded, preventEnterKeySubmit}) => {

    // Each time the search text changed, this component is reloaded

    // Launch search with current text
    console.log(searchText.length,searchResultsLength)
    if (is_loading || (searchText.length === 0 && searchResultsLength === 0)) {
        vectorSourcing(
            api_source,
            type,
            searchText,
            searchResultsLength,
            stickersLoaded
        )
    }

    return <div className="search-api-bar-container">

        <div className="search-api-bar">

            <form onChange={(event) => formChanged({
                        text: event.target.value || "",
                        source: api_source,
                        type: type
                    })}
                  // Prevent submit on enter key
                  onKeyPress={(event) => preventEnterKeySubmit(event)} >

                { renderField({
                    id: api_source+"_"+type+"_searchBar",
                    nonMaterial: true,
                    placeholder: "Rechercher par mots-clés...",
                    input: {
                        type: "text",
                        name: api_source+"_"+type+"_search",
                        value: searchText || ""
                    }
                }) }

                <p className="text-center"><small>Powered By <span className="uppercase">{ api_source }</span></small></p>

            </form>
        </div>

    </div>

}

export default reduxForm({
    form: 'searchMediaForm'
})(SearchAPIBar)
