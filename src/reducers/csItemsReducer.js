
const csItemsReducer = (state = [], action) => {

    switch (action.type) {

        case 'API_UPDATE_CS_ITEMS':

            let data = action.data

            if (typeof data !== "undefined") {

                return data
            }
            return state

        default:
            return state
    }
}

export default csItemsReducer