
const csItemReducer = (state = [], action) => {

    switch (action.type) {

        case 'API_UPDATE_CS_ITEM':

            let data = action.data

            if (typeof data.id !== "undefined" && typeof data.media !== "undefined") {

                return {
                    ...state,
                    id: data.id,
                    cnv_short_code: data.cnv_short_code,
                    media: {
                        ...state.media,
                        src: data.media.src,
                        isVideo: data.media.isVideo,
                        fullScreen: data.media.fullScreen,
                        ext: data.media.ext
                    }
                }
            }
            return state

        default:
            return state
    }
}

export default csItemReducer