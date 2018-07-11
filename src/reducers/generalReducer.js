
const generalReducer = (state = [], action) => {

    switch (action.type) {

        case 'API_UPDATE_CS_ITEM':

            let data = action.data
            if (typeof data.id !== "undefined" && typeof data.template !== "undefined" && typeof data.template.general !== "undefined") {

                return data.template.general
            }
            return state

        case "FORM_PREVENT_ENTER_KEY_SUBMIT":

            // Disable form submit when enter key is pressed
            let event = action.data
            let keyCode = event.which || event.keyCode || event.code || 0
            if (keyCode === 13) {
                // That's enter key !
                event.preventDefault()
                event.stopPropagation()
            }
            return state

        case 'PROPERTIES_FORM_CHANGED':

            const editOverlayFromForm = (initialState, inputName, inputValue, target) => {

                // First need to deep copy the original object
                // Else we would modify directly the state itself
                // Which is an anti-pattern, React would consider state hasn't changed so no re-rendering

                if (inputName.indexOf('theme_') === 0) {

                    let theme = JSON.parse(JSON.stringify(initialState.theme || {}))

                    switch (inputName) {

                        case "theme_color":

                            // Need to find the full info about the color (inputValue is the color id)
                            let params_colors = action.params.themes.colors
                            let full_color_info = params_colors.find((obj) => { return obj.id === inputValue })

                            theme.color = full_color_info
                            break

                        case "theme_color_is_gradient":

                            // Should we now use static or gradient color for backgrounds ?
                            theme.use_static_color = !target.checked

                            break

                        case "theme_font":
                            theme.font = inputValue
                            break

                        default:
                            break
                    }

                    return {
                        ...initialState,
                        theme: theme
                    }

                } else if (inputName.indexOf('overlay_') === 0) {

                    let overlay = JSON.parse(JSON.stringify(initialState.overlay || {}))

                    switch (inputName) {

                        case "overlay_color":
                            overlay.color = inputValue
                            break
                        case "overlay_opacity":
                            overlay.opacity = Math.round(parseFloat(inputValue))/100
                            break
                        default:
                            break
                    }

                    return {
                        ...initialState,
                        overlay: overlay
                    }

                } else if (inputName.indexOf('media_') === 0) {

                    let media = JSON.parse(JSON.stringify(initialState.media || {}))

                    switch (inputName) {

                        case "media_duration":
                            media.duration = inputValue
                            break
                        case "media_animation":
                            media.animation = inputValue
                            break
                        case "media_fit_screen":
                            // We are showing a checkbox as "enable full screen", the opposite of fit_screen value
                            media.fit_screen = !target.checked
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

            return editOverlayFromForm(state, action.name, action.value, action.target)


        default:
            return state
    }
}

export default generalReducer