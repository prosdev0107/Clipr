
const csItemIndexEditingReducer = (state = [], action) => {

    switch (action.type) {

        case 'MEDIA_SWITCHER_CHANGE_INDEX':

            if (typeof action.data !== "undefined") {

                let newSelectedIndex = action.data.new_index

                return newSelectedIndex
            }

            return state

        case 'MEDIA_SWITCHER_DELETE_MEDIA':

            // Every time a media is deleted, we switch index back to 0
            // in order to avoid an index bigger than number of medias after removal
            return 0


        case 'MEDIA_SWITCHER_SWITCH_MEDIA':

            if (action.name === "media_display_order") {

                // User asks to change media position
                let positions = action.data

                if (positions !== 2) {
                    // There must be exactly two media to switch
                    return state
                }

                // If one of this position is equals to current index being editing, switch this index too
                if (action.cs_item_index_editing === positions[0]) {
                    return positions[1]
                }
                if (action.cs_item_index_editing === positions[1]) {
                    return positions[0]
                }

                return state
            }
            break

        case "API_CREATE_CS_ITEM_END":

            // This allow MediaSwitcher to switch to new media once created
            return action.data.new_items_length - 1

        default:
            return state
    }
}

export default csItemIndexEditingReducer