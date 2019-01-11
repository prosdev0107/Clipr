

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

            if (typeof action.data === "undefined"
                || action.data === null
                || typeof action.data.source === "undefined" ) {
                return state
            }

            // User has chosen his media to import, just show a thumbnail at modal footer
            // Also reinitialize video cropper and image resizer
            return {
                ...state,
                preselected_media: action.data,
                resizer: {
                    zoom: 1.2
                },
                videocrop: {
                    start: 0,
                    end: 0
                }
            }

        case 'IMPORT_MEDIA_LAUNCH_VIDEO_CROPPER':

            // User has validated his media to import, let's suggest him to resize/crop it
            return {
                ...state,
                videocrop:  {
                    ...state.videocrop,
                    display: true
                },
                resizer:  {
                    ...state.resizer,
                    display: false
                }
            }

        case 'IMPORT_MEDIA_CLOSE_CROPPER_AND_RESIZER':

            return {
                ...state,
                videocrop:  {
                    ...state.videocrop,
                    display: false
                },
                resizer:  {
                    ...state.resizer,
                    display: false
                }
            }

        case 'IMPORT_MEDIA_VIDEO_CROPPER_UPDATE_DURATION':

            // User has validated his media to import, let's suggest him to resize/crop it
            let new_time_limits = action.data
            return {
                ...state,
                videocrop:  {
                    ...state.videocrop,
                    start: new_time_limits.start,
                    end: new_time_limits.end
                }
            }

        case 'IMPORT_MEDIA_LAUNCH_RESIZER':

            // User has validated his media to import, let's suggest him to resize/crop it
            return {
                ...state,
                videocrop:  {
                    ...state.videocrop,
                    display: false
                },
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

        case 'IMPORT_MEDIA_UPDATE_VIDEO_THUMBNAIL':

            return {
                ...state,
                preselected_media: {
                    ...state.preselected_media,
                    source: {
                        ...state.preselected_media.source,
                        thumbnail: action.data
                    }

                }
            }

        case 'API_CREATE_CS_MEDIA_BEGIN':

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

        case 'API_CREATE_CS_MEDIA_END':

            if (typeof action.data === "undefined"
                || action.data === null
                || typeof action.data.source === "undefined" ) {
                return {
                    ...state,
                    uploading_file_progress: 0,
                    uploading_file: false,
                }
            }

            return {
                ...state,
                uploading_file_progress: 0,
                uploading_file: false,
                preselected_media: action.data
            }

        case 'API_CREATE_CS_ITEM_BEGIN':

            return {
                ...state,
                creating_final_item: true
            }

        case "API_CREATE_CS_ITEM_END":

            // Progress status (scale 0-100) of current uploading file
            return {
                ...state,
                creating_final_item: false,
                resizer: {
                    display: false,
                    crop_zone: {},
                    zoom: 1.2
                },
                preselected_media: {
                    id: null,
                    type: null,
                    source: {}
                }
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