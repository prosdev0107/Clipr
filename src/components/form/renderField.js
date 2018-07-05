import React from 'react'
import { Field } from 'redux-form'
import Input from "./Input"
import Select2 from "./Select2"
import InputNumber from "./InputNumber"
import InputCheckbox from "./InputCheckbox"


export const renderField = (properties, action) => {

    switch (properties.input.type) {

        case "select":

            // On change attribute needed on select tag !
            return <Field name={properties.id}
                          selectedOption={properties.value}
                          component={Select2}
                          options={(properties.options || {})}
                          onChange={(event) => typeof action === "function" ? action(event) : null} />

        case "number":

            return <Field name={properties.id}
                          component={InputNumber}
                          step={(properties.input.step || 1)}
                          min={properties.input.min}
                          max={properties.input.max}
                          forceValue={properties.value} />

        case "checkbox":

            return <Field name={properties.id}
                          component={InputCheckbox}
                          type={properties.input.type}
                          is_checked={properties.value} />

        default:

            return <Field name={properties.id}
                          component={Input}
                          type={properties.input.type}
                          forceValue={properties.value} />

    }
}