import React from 'react'

const InputNumber = ({
                         input, label, defaultValue, step, min, max, forceValue,
                         meta: { touched, error },
                     }) => (
    <div>
        <label htmlFor={input.name}>{label}</label>
        <input
            {...input}
            type="number"
            step={step || 1}
            min={min}
            max={max}
            defaultValue={defaultValue}
            value={forceValue || 0}
        />
        { touched && error && <span className="error">{error}</span>}
    </div>
)

export default InputNumber