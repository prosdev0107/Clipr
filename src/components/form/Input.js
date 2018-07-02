import React from 'react'

const Input = ({
                   input, type, label, defaultValue,         // common
                   meta: { touched, error },                // status
                   forceValue                               // specific to some types
               }) => (
    <div>
        <label htmlFor={input.name}>{label}</label>
        <input
            {...input}
            type={type}
            defaultValue={defaultValue}
            value={forceValue || 0}
        />
        { touched && error && <span className="error">{error}</span>}
    </div>
)

export default Input