import React from 'react'
import {renderField} from "./form/renderField"
import {reduxForm} from "redux-form";
import {vectorSourcing} from "../utilities/API/VectorSourcing";

const SearchAPIBar = ({api_source, type, searchText, searchResultsLength, is_loading, formChanged, stickersLoaded, preventEnterKeySubmit}) => {

    // Each time the search text changed, this component is reloaded

    // Init with saved params
    if (is_loading) {
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
                    id: "search_api_bar",
                    nonMaterial: true,
                    placeholder: "Rechercher par mots-clés...",
                    input: {
                        type: "text",
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
