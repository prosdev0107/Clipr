import React from 'react'
import { reduxForm } from 'redux-form'
import { STICKER_FONT_SIZE_MIN, STICKER_FONT_SIZE_MAX } from '../constants/constants'
import {renderField} from "./form/renderField"


const PropertiesForm = ({story_sticker,fonts,formChanged, preventEnterKeySubmit}) => {

    let sticker = story_sticker.sticker

    let fontFamilies = fonts.map( (font) => {
        return { value: font.name, label: font.name, fontFamily: font.name }
    })


    // Transform radian to degree
    let rotationDeg = story_sticker.position.rotation*180/Math.PI

    // Get a positive value
    while (rotationDeg < 0) {
        rotationDeg += 360
    }

    // Finally we need to build the row data to be displayed
    let rowInputInfo = [{
            'separator': 'Général'
        }]

    // Add the common field
    rowInputInfo.push({
        id: "ssbox_position_rotation",
        value: Math.round(rotationDeg*10)/10 || 0,
        type: "attribute",
        input: {
            label: "Rotation",
            type: "number",
            step: 1,
            min: 0,
            max: 360
        }
    })



    // Add the custom fields
    if (typeof sticker.customize  !== "undefined" && Object.keys(sticker.customize).length > 0) {

        for (let identifier in sticker.customize ) {

            let customField = sticker.customize[identifier]

            if (customField.type === "text") {

                // Need to render several input to customize text
                rowInputInfo.push({
                    separator: "Texte intérieur"
                })
                rowInputInfo.push({
                    id: "custom_text_content_"+customField.id,
                    value: customField.attributes.content || "",
                    type: "attribute",
                    input: {
                        label: "Texte",
                        type: "text"
                    }
                },{
                    id: "custom_text_family_"+customField.id,
                    value: customField.attributes.family || "",
                    type: "css",
                    options: fontFamilies,
                    input: {
                        label: "Police",
                        type: "font"
                    }
                },{
                    id: "custom_text_size_"+customField.id,
                    value: customField.attributes.size || ( (STICKER_FONT_SIZE_MIN + STICKER_FONT_SIZE_MAX) /2 ),
                    type: "css",
                    input: {
                        label: "Taille",
                        type: "number",
                        min: STICKER_FONT_SIZE_MIN,
                        max: STICKER_FONT_SIZE_MAX
                    }
                },{
                    id: "custom_text_color_"+customField.id,
                    value: customField.attributes.color || "",
                    type: "css",
                    input: {
                        label: "Couleur",
                        type: "color"
                    }
                })

            } else {

                // Render as is
                rowInputInfo.push(customField)
            }
        }
    }

    rowInputInfo.push({
        separator: "Actions"
    })

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

export default reduxForm({
    form: 'propertiesForm'
})(PropertiesForm)
