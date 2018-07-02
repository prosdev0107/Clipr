import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Input from './form/Input'
import InputNumber from './form/InputNumber'
import Select2 from './form/Select2'
import { STICKER_FONT_SIZE_MIN, STICKER_FONT_SIZE_MAX } from '../constants/constants'


const PropertiesForm = ({story_sticker,fonts,formChanged}) => {

    let sticker = story_sticker.sticker


    const validateCoordinate = value => parseFloat(value) < 0 || parseFloat(value) > 1 ? 'Between 0 & 1' : null
    // const validateFontSize = value => parseInt(value,10) < STICKER_FONT_SIZE_MIN || parseInt(value,10) > STICKER_FONT_SIZE_MAX ?
    //    'Between '+STICKER_FONT_SIZE_MIN+ ' & '+STICKER_FONT_SIZE_MAX : null

    let fontFamilies = fonts.map( (font) => {
        return { value: font.name, label: font.name }
    })

    const renderField = (properties) => {

        if (properties.type === "text") {
            // We need to build 4 customs fields : text content, font size, font family, font color
            return <div>

                <p>{properties.label}</p>

                {renderField({
                    id: "custom_text_content_"+properties.id,
                    value: properties.attributes.content || "",
                    type: "attribute",
                    input: {
                        label: "Texte",
                        type: "text"
                    }
                })}

                {renderField({
                    id: "custom_text_family_"+properties.id,
                    value: properties.attributes.family || "",
                    type: "css",
                    options: fontFamilies,
                    input: {
                        label: "Police",
                        type: "select"
                    }
                })}

                {renderField({
                    id: "custom_text_size_"+properties.id,
                    value: properties.attributes.size || ( (STICKER_FONT_SIZE_MIN + STICKER_FONT_SIZE_MAX) /2 ),
                    type: "css",
                    input: {
                        label: "Taille",
                        type: "number",
                        min: STICKER_FONT_SIZE_MIN,
                        max: STICKER_FONT_SIZE_MAX
                    }
                })}

                {renderField({
                    id: "custom_text_color_"+properties.id,
                    value: properties.attributes.color || "",
                    type: "css",
                    input: {
                        label: "Couleur",
                        type: "color"
                    }
                })}

            </div>

        } else if (properties.type === "attribute" || properties.type === "css") {

            switch (properties.input.type) {

                case "select":

                    // On change attribute needed on select tag !
                    return <Field label={properties.input.label}
                                  name={properties.id}
                                  selectedOption={properties.value}
                                  component={Select2}
                                  options={(properties.options || {})}
                                  onChange={(event) => formChanged(event)}
                    />

                case "number":

                    return <Field label={properties.input.label}
                                  name={properties.id}
                                  component={InputNumber}
                                  step={(properties.input.step || 1)}
                                  min={properties.input.min}
                                  max={properties.input.max}
                                  forceValue={properties.value} />

                default:

                    return <Field label={properties.input.label}
                                  name={properties.id}
                                  component={Input}
                                  type={properties.input.type}
                                  forceValue={properties.value} />

            }
        }
    }

    // Transform radian to degree
    let rotationDeg = story_sticker.position.rotation*180/Math.PI

    // Get a positive value
    while (rotationDeg < 0) {
        rotationDeg += 360
    }

    return (
        <form onChange={(event) => formChanged(event)}>

            {/* Common fields */}
            <Field label="X"  name="ssbox_position_x" validate={validateCoordinate} component={InputNumber}
                   type='number' step={0.01} min={0} max={1} forceValue={story_sticker.position.x || 0} />
            <Field label="Y"  name="ssbox_position_y" validate={validateCoordinate} component={InputNumber}
                   type='number' step={0.01} min={0} max={1} forceValue={story_sticker.position.y || 0} />
            <Field label="Angle"  name="ssbox_position_rotation" validate={validateCoordinate} component={Input}
                   type='number' step={1} min={0} max={360} forceValue={Math.round(rotationDeg*10)/10 || 0} />

            {/* Custom fields (ex : specific elements of a svg */}
            {Object.entries((sticker.customize || [])).map(([key, properties]) => {

                return <div key={key}>
                    {renderField(properties)}
                </div>
            })}

        </form>
    )
}

export default reduxForm({
    form: 'propertiesForm'
})(PropertiesForm)
