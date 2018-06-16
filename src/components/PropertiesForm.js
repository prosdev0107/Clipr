import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Input from './form/Input'
import Select2 from './form/Select2'
import { STICKER_FONT_SIZE_MIN, STICKER_FONT_SIZE_MAX, STICKER_FONT_FAMILIES } from '../constants/constants'


const PropertiesForm = ({story_sticker,formChanged}) => {

    let sticker = story_sticker.sticker


    const validateCoordinate = value => parseFloat(value) < 0 || parseFloat(value) > 1 ? 'Between 0 & 1' : null
    const validateFontSize = value => parseInt(value,10) < STICKER_FONT_SIZE_MIN || parseInt(value,10) > STICKER_FONT_SIZE_MAX ?
        'Between '+STICKER_FONT_SIZE_MIN+ ' & '+STICKER_FONT_SIZE_MAX : null

    let fontFamilies = STICKER_FONT_FAMILIES.map( (value) => {
        return { value: value, label: value }
    })


    const specificFormField = (sticker) => {

        switch (sticker.type) {

            case "text":

                return <div>
                    <Field label="texte"  name="sticker_text" validate={validateCoordinate} component={Input}
                           type='text' forceValue={sticker.text} />
                    <Field label="taille"  name="sticker_fontSize" validate={validateFontSize} component={Input}
                           type='number' forceValue={sticker.fontSize} />
                    <Field label="couleur"  name="sticker_color" component={Input}
                           type='color' forceValue={sticker.color} />
                    <Field label="police"  name="sticker_fontFamily" selectedOption={sticker.fontFamily}
                           component={Select2}
                           options={fontFamilies}
                           onChange={(event) => formChanged(event)}
                    />
                </div>

            default:

                return ""
        }
    }

    const customFormField = (sticker) => {

        if (typeof sticker.customize === "undefined" || sticker.customize === null) {
            return ""
        }


        return Object.entries(sticker.customize).map(([key, properties]) => {

            let inputType = properties.input.type

            if (['select','font_family'].indexOf(inputType) >= 0) {

                // Select type
                return <Field label={properties.input.label}
                              key={key}
                              name={key}
                              selectedOption={properties.value}
                              component={Select2}
                              options={inputType === 'font_family' ? fontFamilies : (properties.options || {})}
                              onChange={(event) => formChanged(event)}
                />

            } else {

                // Input type
                return <Field label={properties.input.label}
                              key={key}
                              name={key}
                              component={Input}
                              type={inputType}
                              forceValue={properties.value} />
            }
        })
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
            <Field label="X"  name="position_x" validate={validateCoordinate} component={Input}
                   type='number' step={0.01} forceValue={story_sticker.position.x || 0} />
            <Field label="Y"  name="position_y" validate={validateCoordinate} component={Input}
                   type='number' step={0.01} forceValue={story_sticker.position.y || 0} />
            <Field label="Angle"  name="position_rotation" validate={validateCoordinate} component={Input}
                   type='number' step={1} min={0} max={360} forceValue={Math.round(rotationDeg*10)/10 || 0} />

            {/* Fields specific to sticker type */}
            {specificFormField(sticker)}

            {/* Custom field (ex : specific elements of a svg */}
            {customFormField(sticker)}

        </form>
    )
}

export default reduxForm({
    form: 'propertiesForm'
})(PropertiesForm)
