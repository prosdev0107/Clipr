

const pageActionsReducer = (state = [], action) => {

    switch (action.type) {

        case 'SHOW_IMPORT_MEDIA_MODAL':

            // Display a large modal that let user import a media into story
            return {
                ...state,
                show_modal: true
            }

        case 'IMPORT_MEDIA_MODAL_HIDE':

            return {
                ...state,
                show_modal: false,
                resizer: {
                    display: false,
                    crop_zone: {},
                    zoom: 1.2
                },
            }

        case 'IMPORT_MEDIA_SELECT_MEDIA':

            // User has chosen his media to import, just show a thumbnail at modal footer
            return {
                ...state,
                file_to_upload: action.data.file
            }

        case 'IMPORT_MEDIA_LAUNCH_RESIZER':

            // User has validated his media to import, let's suggest him to resize/crop it
            return {
                ...state,
                resizer:  {
                    ...state.resizer,
                    display: true
                }
            }

        case 'IMPORT_MEDIA_RESIZER_UPDATE_CROPPED_ZONE': {

            let new_cropped_zone = action.data
            return {
                ...state,
                resizer:  {
                    ...state.resizer,
                    crop_zone: new_cropped_zone
                }
            }
        }

        case 'IMPORT_MEDIA_CLOSE_RESIZER':

            return {
                ...state,
                resizer:  {
                    ...state.resizer,
                    display: false
                }
            }

        case 'IMPORT_MEDIA_RESIZER_CHANGE_PROPERTY':

            let event = action.data
            let target = event.target
            let fieldName = target.name
            let fieldValue = target.value

            if (typeof fieldName !== "undefined" && typeof fieldName !== "undefined") {

                if (fieldName === "resizer_input_zoom") {

                    return {
                        ...state,
                        resizer: {
                            ...state.resizer,
                            zoom: fieldValue
                        }
                    }
                } else if (fieldName === "resizer_input_cropping") {

                    return {
                        ...state,
                        resizer: {
                            ...state.resizer,
                            cropped_zone: fieldValue
                        }
                    }
                }

            }

            return state

        case 'API_CREATE_CS_ITEM_BEGIN':

            return {
                ...state,
                uploading_file_progress: 0,
                uploading_file: true
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
                uploading_file_progress: 0,
                uploading_file: false,
                resizer: {
                    display: false,
                    crop_zone: {},
                    zoom: 1.2
                },
                file_to_upload: null
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