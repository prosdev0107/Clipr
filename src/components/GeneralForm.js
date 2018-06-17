import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Input from './form/Input'
import {OverlayTypes} from "./propTypes/OverlayTypes";


const GeneralForm = ({general,formChanged}) => {

    return (
        <form onChange={(event) => formChanged(event)}>

            {/* Set overlay attributes */}
            <h3>Overlay</h3>
            <Field label="Couleur"  name="overlay_color" component={Input}
                   type='color' forceValue={general.overlay.color || "#000"} />
            <Field label="Opacité"  name="overlay_opacity" component={Input}
                   type='number' step={0.01} min={0} max={1} forceValue={general.overlay.opacity || 0} />

        </form>
    )
}

GeneralForm.propTypes = {
    general: {
        overlay: OverlayTypes
    }
}

export default reduxForm({
    form: 'generalForm'
})(GeneralForm)
