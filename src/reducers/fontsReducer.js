
const fontsReducer = (state = [], action) => {

    switch (action.type) {

        // Init library content calling our API
        case "API_UPDATE_LIBRARY":

            let data = action.data
            if (typeof data.fonts !== "undefined" ) {
                return data.fonts
            }
            return state

        default:
            return state
    }
}

export default fontsReducer