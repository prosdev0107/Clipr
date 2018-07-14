import axios from "axios/index";

const paramsReducer = (state = [], action) => {

    switch (action.type) {

        // Init library content calling our API
        case "API_UPDATE_LIBRARY":

            let data = action.data
            if (typeof data.params !== "undefined" && typeof data.params.stickers !== "undefined") {

                // Add css file that include all svg styles
                let stylesheetLink = data.params.sticker_css
                if (stylesheetLink.length > 0) {

                    axios.get(stylesheetLink).then((response) => {

                        let fileContent = response.data

                        if (fileContent.length > 0) {
                            // Create stylesheet
                            let svg_style = document.createElement("style")
                            svg_style.type = "text/css"
                            svg_style.appendChild(document.createTextNode(fileContent))

                            // Add to DOM
                            let head = document.head || document.getElementsByTagName('head')[0]
                            head.appendChild(svg_style)
                        }
                    })
                }

                return data.params
            }
            return state


        // Suggest GIF when search input changes
        case "LIBRARY_EXTERNAL_CONTENT_LOADED":

            let api_source = action.data.api_source

            // Let's format gifs data from giphy into our classic sticker data
            // So we can render them as simple sticker
            let stickers = action.data.stickers
            let old_stickers = typeof state.stickers[api_source] === "undefined" ? [] : state.stickers[api_source]

            // If no reinitialize, append to previous data
            let new_stickers = action.data.reinitialize || typeof old_stickers === "undefined" ?  stickers : [
                ...old_stickers,
                ...stickers
            ]

            return  {
                ...state,
                stickers: {
                    ...state.stickers,
                    giphy: api_source === "giphy" ? new_stickers : state.stickers.giphy,
                    pixabay: api_source === "pixabay" ? new_stickers : state.stickers.pixabay
                }
            }

        default:
            return state
    }
}

export default paramsReducer