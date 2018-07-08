
const paramsReducer = (state = [], action) => {

    switch (action.type) {

        // Init library content calling our API
        case "API_UPDATE_LIBRARY":

            let data = action.data
            if (typeof data.params !== "undefined" && typeof data.params.stickers !== "undefined") {
                return data.params
            }
            return state

        // Suggest GIF when search input changes
        case "LIBRARY_GIPHY_GIFS_LOADED":

            // Let's format gifs data from giphy into our classic sticker data
            // So we can render them as simple sticker

            let giphy_gifs = action.data
            let giphy_stickers = giphy_gifs.map(gif => {

                if (typeof gif.images === "undefined" || typeof gif.images.downsized === "undefined") {
                    return null
                }

                let imageData = gif.images.downsized

                return {
                    id: gif.id,
                    type: 'img',
                    ratio: Math.round(1000*imageData.height / imageData.width)/1000,
                    source: {
                        src: imageData.url,
                    }
                }
            })


            return  {
                ...state,
                stickers: {
                    ...state.stickers,
                    giphy_stickers: giphy_stickers
                }
            }

        default:
            return state
    }
}

export default paramsReducer