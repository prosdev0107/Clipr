
const clipReducer = (state = [], action) => {

    switch (action.type) {

        case 'API_UPDATE_CLIP':

            let data = action.data

            if (typeof data.id !== "undefined") {

                return {
                    ...state,
                    id: data.id,
                    cnv_short_code: data.cnv_short_code,
                    cnv_type: data.cnv_type,
                    url_preview: data.url_preview
                }
            }
            return state

        default:
            return state
    }
}

export default clipReducer