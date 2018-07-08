import React from 'react'
import { Field } from 'redux-form'
import Input from "./Input"
import Select2 from "./Select2"
import InputNumber from "./InputNumber"
import InputCheckbox from "./InputCheckbox"
import InputColor from "./InputColor"


export const renderField = (properties, action) => {

    const optionFontFamilyRenderer = (option) => {
        if (typeof option === "undefined") {
            return null
        }
        let styles = {
            fontFamily: option.fontFamily
        }
        return <span style={styles}>{option.label}</span>
    }

    switch (properties.input.type || "text") {

        case "font":

            // On change attribute needed on select tag !
            return <Field name={properties.id}
                          nonMaterial={properties.nonMaterial}
                          placeholder={properties.placeholder}
                          selectedOption={properties.value}
                          component={Select2}
                          options={(properties.options || {})}
                          optionRenderer={optionFontFamilyRenderer}
                          onChange={(event) => typeof action === "function" ? action(event) : null} />

        case "select":

            // On change attribute needed on select tag !
            return <Field name={properties.id}
                          nonMaterial={properties.nonMaterial}
                          placeholder={properties.placeholder}
                          selectedOption={properties.value}
                          component={Select2}
                          options={(properties.options || {})}
                          onChange={(event) => typeof action === "function" ? action(event) : null} />

        case "number":

            return <Field name={properties.id}
                          nonMaterial={properties.nonMaterial}
                          placeholder={properties.placeholder}
                          component={InputNumber}
                          step={(properties.input.step || 1)}
                          min={properties.input.min}
                          max={properties.input.max}
                          forceValue={properties.value} />

        case "color":

            return <Field name={properties.id}
                          nonMaterial={properties.nonMaterial}
                          placeholder={properties.placeholder}
                          component={InputColor}
                          forceValue={properties.value}
                          onChange={(event) => typeof action === "function" ? action(event) : null} />

        case "checkbox":

            return <Field name={properties.id}
                          nonMaterial={properties.nonMaterial}
                          placeholder={properties.placeholder}
                          component={InputCheckbox}
                          type={properties.input.type}
                          is_checked={properties.value} />

        default:

            return <Field name={properties.id}
                          nonMaterial={properties.nonMaterial}
                          component={Input}
                          placeholder={properties.placeholder}
                          type={properties.input.type}
                          forceValue={properties.value} />

    }
}