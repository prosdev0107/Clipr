import axios from "axios/index";

const paramsReducer = (state = [], action) => {

    switch (action.type) {

        // Init library content calling our API
        case "API_UPDATE_LIBRARY":

            let data = action.data
            if (typeof data.params !== "undefined" && typeof data.params.stickers !== "undefined") {

                // Add css file that include all sticker styles and all filters styles
                [data.params.sticker_css, data.params.img_filters_css].forEach((stylesheetLink) => {
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
                })

                return data.params
            }
            return state


        default:
            return state
    }
}

export default paramsReducer