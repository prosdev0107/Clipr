
const generalReducer = (state = [], action) => {

    switch (action.type) {

        case 'API_UPDATE_CS_ITEM':

            let data = action.data
            if (typeof data.id !== "undefined" && typeof data.template !== "undefined" && typeof data.template.general !== "undefined") {

                return data.template.general
            }
            return state

        case 'PROPERTIES_FORM_CHANGED':

            const editOverlayFromForm = (initialState, inputName, inputValue) => {

                // First need to deep copy the original object
                // Else we would modify directly the state itself
                // Which is an anti-pattern, React would consider state hasn't changed so no re-rendering

                if (inputName.indexOf('overlay_') === 0) {

                    let overlay = JSON.parse(JSON.stringify(initialState.overlay))

                    switch (inputName) {

                        case "overlay_color":
                            overlay.color = inputValue
                            break
                        case "overlay_opacity":
                            overlay.opacity = parseFloat(inputValue)
                            break
                        default:
                            break
                    }

                    return {
                        ...initialState,
                        overlay: overlay
                    }

                } else if (inputName.indexOf('media_') === 0) {

                    let media = JSON.parse(JSON.stringify(initialState.media))

                    switch (inputName) {

                        case "media_duration":
                            media.duration = inputValue
                            break
                        default:
                            break
                    }

                    return {
                        ...initialState,
                        media: media
                    }
                }
                return initialState
            }

            return editOverlayFromForm(state, action.name, action.value)


        default:
            return state
    }
}

export default generalReducer