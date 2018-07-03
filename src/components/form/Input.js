import React from 'react'

const Input = ({
                   input, type, label, defaultValue,        // common
                   meta: { touched, error },                // status
                   forceValue,                               // specific to some types
               }) => (

    <div className="form-group form-material material-bordered">
        {(label || "").length > 0 ? <label htmlFor={input.name}>{label}</label> : "" }
        <input
            {...input}
            type={type}
            defaultValue={defaultValue}
            value={forceValue || 0}
            className="form-control"
        />
        { touched && error && <span className="error">{error}</span>}
    </div>

)

export default Input