import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

// Doc : https://github.com/JedWatson/react-select
// Examples : https://jedwatson.github.io/react-select/

const Select2 = ({
                   input, options, selectedOption, label,           // common
                   meta: { touched, error }                         // status
               }) => {

    const onChange = (option, name) => {
        // Transform to event-like
        input.onChange({
            target: {
                name: name,
                value: option.value
            }
        })
    }

    return (
        <div>
            <label htmlFor={input.name}>{label}</label>
            <Select
                {...input}
                value={selectedOption}
                options={options}
                clearable={false}
                onChange={(option) => onChange(option,input.name)}
                onBlur={() => input.onBlur(input.value)}
            />
            {touched && error && <span className="error">{error}</span>}
        </div>
    )
}

export default Select2
