

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

        case "IMPORT_MEDIA_CREATE_FROM_FILE":

            let file = action.data

            return {
                ...state,
                uploaded_file: file.name
            }


        default:
            return state
    }
}

export default pageActionsReducer