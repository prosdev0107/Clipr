import React from 'react'

const Input = ({
                   input, type, label, defaultValue, placeholder,       // common
                   meta: { touched, error },                            // status
                   forceValue, nonMaterial                              // specific to some types
               }) => (

    <div className={"form-group "+(nonMaterial || false ? "" : "form-material material-bordered")}>
        {(label || "").length > 0 ? <label htmlFor={input.name}>{label}</label> : "" }
        <input
            {...input}
            type={type}
            defaultValue={defaultValue}
            value={forceValue || undefined}
            placeholder={placeholder || undefined}
            // { ( (forceValue || "").length > 0 ?  {value: forceValue} : {} ) }
            className="form-control"
        />
        { touched && error && <span className="error">{error}</span>}
    </div>

)

export default Input