
const stickersReducer = (state = [], action) => {

    switch (action.type) {

        // Init library content calling our API
        case "API_UPDATE_LIBRARY":

            let data = action.data
            if (typeof data.stickers !== "undefined" && typeof data.stickers.img !== "undefined") {
                return data.stickers
            }
            break

        default:
            return state
    }
}

export default stickersReducer