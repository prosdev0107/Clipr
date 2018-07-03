import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Input from './form/Input'
import InputNumber from './form/InputNumber'
import Select2 from './form/Select2'
import { STICKER_FONT_SIZE_MIN, STICKER_FONT_SIZE_MAX } from '../constants/constants'


const PropertiesForm = ({story_sticker,fonts,formChanged}) => {

    let sticker = story_sticker.sticker

    let fontFamilies = fonts.map( (font) => {
        return { value: font.name, label: font.name }
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
        id: "ssbox_position_x",
        value: story_sticker.position.x || 0,
        type: "attribute",
        input: {
            label: "X",
            type: "number",
            step: 0.01,
            min: 0,
            max: 1
        }
    })
    rowInputInfo.push({
        id: "ssbox_position_y",
        value: story_sticker.position.y || 0,
        type: "attribute",
        input: {
            label: "Y",
            type: "number",
            step: 0.01,
            min: 0,
            max: 1
        }
    })
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
                        type: "select"
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

    const renderField = (properties) => {

        switch (properties.input.type) {

            case "select":

                // On change attribute needed on select tag !
                return <Field name={properties.id}
                              selectedOption={properties.value}
                              component={Select2}
                              options={(properties.options || {})}
                              onChange={(event) => formChanged(event)} />

            case "number":

                return <Field name={properties.id}
                              component={InputNumber}
                              step={(properties.input.step || 1)}
                              min={properties.input.min}
                              max={properties.input.max}
                              forceValue={properties.value} />

            default:

                return <Field name={properties.id}
                              component={Input}
                              type={properties.input.type}
                              forceValue={properties.value} />

        }
    }

    return (
        <form onChange={(event) => formChanged(event)}>

            <table className="width-full">

                <tbody>

                {Object.entries(rowInputInfo).map(([key, properties]) => {

                    if (typeof properties.separator !== "undefined") {
                        return <tr key={key} className="table-separator bg-indigo-500">
                            <td><b>{properties.separator}</b></td>
                            <td></td>
                        </tr>
                    }

                    return <tr key={key}>
                        <td>{properties.input.label}</td>
                        <td>
                            {renderField(properties)}
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
