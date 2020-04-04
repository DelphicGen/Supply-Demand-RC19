import React from 'react'
import './RadioInput.css'

const RadioInput = props => {
    return (
        <div className="RadioInput">
            <input id={props.id} onChange={props.changed} value={props.value} type="radio" checked={props.isSelected} />
            <label className={`${props.isSelected ? 'text-blue-700' : 'text-gray-500'} cursor-pointer inline-block py-3 px-5 font-semibold text-lg rounded-full`} htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default RadioInput