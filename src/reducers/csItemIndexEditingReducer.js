
const csItemIndexEditingReducer = (state = [], action) => {

    switch (action.type) {

        case 'MEDIA_SWITCHER_CHANGE_INDEX':

            if (typeof action.data !== "undefined") {

                let newSelectedIndex = action.data.new_index

                return newSelectedIndex
            }

            return state

        default:
            return state
    }
}

export default csItemIndexEditingReducer