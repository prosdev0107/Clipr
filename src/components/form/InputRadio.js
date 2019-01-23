import React from 'react'
import { FormattedMessage } from 'react-intl'

const InputRadio = ({
                   input, options, selectedOption, label, optionRenderer, selectUp,     // common
                   meta: { touched, error } ,                                           // status
               }) => {


    return (
        <div>
            {options.map(function(option, idx){
                console.log('selectedOption',selectedOption)
                return <div
                    className="radio-custom radio-primary margin-right-15 inline-block"
                    key={idx}
                >
                    <input
                        type="radio"
                        id={input.name+"_"+idx}
                        name={input.name}
                        value={option.value}
                        defaultChecked={selectedOption === option.value}
                        inline />
                    {/* Need to display label even if empty to make the box appear */}
                    <label htmlFor={input.name+"_"+idx}>
                        <FormattedMessage id={option.label} />
                    </label>
                    { touched && error && <span className="error">{error}</span>}
                </div>
            })}
        </div>

    )
}

export default InputRadio
