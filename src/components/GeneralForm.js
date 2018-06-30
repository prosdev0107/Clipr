import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Input from './form/Input'
import {OverlayTypes} from "./propTypes/OverlayTypes";
import PropTypes from 'prop-types'

const GeneralForm = ({general,formChanged}) => {

    const renderMediaDurationInput = (media) => {

        if (typeof general.media !== "undefined" && !general.media.isVideo) {
            return <Field label="Durée image (s)"  name="media_duration" component={Input}
                          type='number' step={0.1} min={2} max={20} forceValue={general.media.duration || 0} />
        }
        return
    }

    return (
        <form onChange={(event) => formChanged(event)}>

            {/* Set overlay attributes */}
            <h3>Overlay</h3>
            <Field label="Couleur"  name="overlay_color" component={Input}
                   type='color' forceValue={general.overlay.color || "#000"} />
            <Field label="Opacité"  name="overlay_opacity" component={Input}
                   type='number' step={0.01} min={0} max={1} forceValue={general.overlay.opacity || 0} />

            {/* Set media attributes */}
            { renderMediaDurationInput(general.media)}

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
