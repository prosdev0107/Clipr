import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Input from './form/Input'
import InputNumber from './form/InputNumber'
// import {ColorPicker} from 'react-color-input'
import {OverlayTypes} from "./propTypes/OverlayTypes"
import PropTypes from 'prop-types'
import Select2 from "./form/Select2";

const GeneralForm = ({general,formChanged}) => {


    // Let's build the row data to be displayed
    let rowInputInfo = [{
        'separator': 'Overlay',
    },
        {
            id: "overlay_color",
            value: general.overlay.color || "#00000000",
            type: "css",
            input: {
                label: "Opacité",
                type: "color",
            }
        },
        {
            id: "overlay_opacity",
            value: general.overlay.opacity || 0,
            type: "css",
            input: {
                label: "Opacité",
                type: "number",
                step: 0.01,
                min: 0,
                max: 1
            }
        }
    ]

    if (typeof general.media === "undefined" || !general.media.isVideo) {

        rowInputInfo.push({
                'separator': 'Média',
            },
            {
                id: "media_duration",
                value: typeof general.media === "undefined" || !general.media.duration  ? 5 : general.media.duration,
                type: "css",
                input: {
                    label: "Durée image",
                    type: "number",
                    step: 0.1,
                    min: 2,
                    max: 20
                }
            })
    }

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

GeneralForm.propTypes = {
    general: PropTypes.shape({
        overlay: PropTypes.shape(OverlayTypes)
    })
}

export default reduxForm({
    form: 'generalForm'
})(GeneralForm)
