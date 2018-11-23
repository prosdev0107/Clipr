

const pageActionsReducer = (state = [], action) => {

    switch (action.type) {

        case 'SHOW_IMPORT_MEDIA_MODAL':

            // Display a large modal that let user import a media into story
            return {
                ...state,
                show_modal: true
            }

        case 'HIDE_IMPORT_MEDIA_MODAL':

            return {
                ...state,
                show_modal: false
            }

        case 'API_CREATE_CS_ITEM_BEGIN':

            return {
                ...state,
                uploading_file_progress: 0
            }

        case "IMPORT_MEDIA_PROGRESS_PERCENT":

            // Progress status (scale 0-100) of current uploading file
            return {
                ...state,
                uploading_file_progress: action.data
            }

        case "API_CREATE_CS_ITEM_END":

            // Progress status (scale 0-100) of current uploading file
            return {
                ...state,
                uploading_file_progress: 0
            }

        case 'MEDIA_SWITCHER_DELETE_MEDIA':

            // If there is no media left, display media import modal
            if (action.data.items_length <= 1) {
                return {
                    ...state,
                    show_modal: true
                }
            }
            return state

        default:
            return state
    }
}

export default pageActionsReducer