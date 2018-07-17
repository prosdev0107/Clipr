
const csItemReducer = (state = [], action) => {

    switch (action.type) {

        case 'API_UPDATE_CS_ITEM':

            let data = action.data

            if (typeof data.id !== "undefined" && typeof data.media !== "undefined") {

                return {
                    ...state,
                    id: data.id,
                    cnv_short_code: data.cnv_short_code,
                    cnv_type: data.cnv_type,
                    url: data.url,
                    media: {
                        ...state.media,
                        src: data.media.src,
                        thumbnail: data.media.thumbnail,
                        isVideo: data.media.isVideo,
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