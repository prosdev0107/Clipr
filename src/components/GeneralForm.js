import React from 'react'
import { reduxForm } from 'redux-form'
import {OverlayTypes} from "./propTypes/OverlayTypes"
import PropTypes from 'prop-types'
import {renderField} from "./form/renderField"

const GeneralForm = ({general,params,formChanged, preventEnterKeySubmit}) => {

    // Constants
    let img_animations = params.img_animations || []
    let themes = params.themes
    let theme_colors = themes.colors || {}, theme_fonts = themes.fonts || {}
    let theme_default_color = theme_colors.default_color || {}

    let select_fonts = theme_fonts.map( (font) => {
        return { value: font.name, label: font.name, fontFamily: "theme_"+font.name  }
    })

    let select_colors = theme_colors.map( (color) => {
        return { value: color.id, label: color.name }
    })

    let animations_label = {
        'zoom-in' : "Zoom in",
        'zoom-out' : "Zoom out",
        'move-from-left': "Vers la droite",
        'move-from-right': "Vers la gauche",
        'move-from-top': "Vers le bas",
        'move-from-bottom': "Vers le haut"
    }
    let select_animations = img_animations.map( (anim) => {
        return { value: anim, label: animations_label[anim] }
    })

    // Media params
    let overlay = general.overlay || {}
    let media_params = general.media || {}
    let media_theme = general.theme || {}

    // media_theme_color contains full information about the theme color, like static and gradient colors components
    let media_theme_color = media_theme.color || {}

    // Let's build the row data to be displayed
    let rowInputInfo = [
        {
            'separator': 'Thème',
        },
        {
            id: "theme_font",
            value: media_theme.font || "",
            type: "css",
            options: select_fonts,
            input: {
                label: "Police principale",
                type: "font",
            }
        },
        {
            id: "theme_color",
            value: media_theme_color.id || (theme_default_color.id || ""),
            type: "css",
            options: select_colors,
            input: {
                label: "Couleur principale",
                type: "select",
            }
        },
        {
            id: "theme_color_is_gradient",
            // We are showing a checkbox as "enable full screen", the opposite of fit_screen value
            value: !(media_theme.use_static_color || 0),
            type: "css",
            input: {
                label: "Couleur dégradée",
                type: "checkbox",
            }
        },
        {
        'separator': 'Overlay',
        },
        {
            id: "overlay_color",
            value: overlay.color || "#000000",
            type: "css",
            input: {
                label: "Couleur",
                type: "color",
            }
        },
        {
            id: "overlay_opacity",
            value: Math.round(100*overlay.opacity) || 0,
            type: "css",
            input: {
                label: "Opacité",
                type: "number_slider",
                step: 1,
                min: 0,
                max: 100
            }
        },
        {
            'separator': 'Média',
        },
        {
            id: "media_fit_screen",
            // We are showing a checkbox as "enable full screen", the opposite of fit_screen value
            value: !(media_params.fit_screen || 0),
            type: "css",
            input: {
                label: "Affichage plein écran",
                type: "checkbox",
            }
        }
    ]

    if (!(media_params.isVideo || 0)) {

        rowInputInfo.push({
                id: "media_duration",
                value: (media_params.duration || 5),
                type: "css",
                input: {
                    label: "Durée image (s)",
                    type: "number",
                    step: 0.1,
                    min: 2,
                    max: 20
                }
            },{
            id: "media_animation",
            value: media_params.animation || "",
            type: "css",
            options: select_animations,
            input: {
                label: "Animation",
                type: "select",
            }
        })
    }



    return (
        <form onChange={(event) => formChanged(event)}
            // Prevent submit on enter key
              onKeyPress={(event) => preventEnterKeySubmit(event)} >

            <table className="width-full">

                <tbody>

                {Object.entries(rowInputInfo).map(([key, properties]) => {

                    if (typeof properties.separator !== "undefined") {
                        return <tr key={key} className="table-separator text-primary">
                            <td><b>{properties.separator}</b></td>
                            <td></td>
                        </tr>
                    }

                    return <tr key={key}>
                        <td>{properties.input.label}</td>
                        <td>
                            {renderField(properties,formChanged)}
                        </td>
                    </tr>
                })}

                </tbody>

            </table>

        </form>
    )
}

GeneralForm.propTypes = {
    general: PropTypes.shape({
        overlay: PropTypes.shape(OverlayTypes)
    })
}

export default reduxForm({
    form: 'generalForm'
})(GeneralForm)
