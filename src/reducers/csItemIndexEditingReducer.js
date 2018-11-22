
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

        case 'PROPERTIES_FORM_CHANGED':

            if (action.name === "media_display_order") {

                // User asks to change media position, so current cs item index needs to be switched

                // Now let's change array items order
                return action.value
            }
            break

        case "IMPORT_MEDIA_CREATE_FROM_FILE":

            // This allow MediaSwitcher to switch to new media once created
            return action.new_item_index

        default:
            return state
    }
}

export default csItemIndexEditingReducer