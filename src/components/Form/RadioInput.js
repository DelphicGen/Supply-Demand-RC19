import React from 'react'
import './RadioInput.css'

const RadioInput = props => {
    return (
        <div className="RadioInput">
            <input id={props.id} onChange={props.changed} value={props.value} type="radio" checked={props.isSelected} />
            <label className={`text-xs md:text-base font-medium ${props.isSelected ? 'text-blue-800 font-semibold' : 'text-gray-700'}`} htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default RadioInput