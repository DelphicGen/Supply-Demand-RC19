import React from 'react'

const RadioTextInput = props => {
    return (
        <label htmlFor={props.id} className="relative cursor-pointer leading-5 text-sm md:text-base lg:text-lg mr-4">
            <input id={props.id} onChange={props.changed} className="hidden" type="radio" value={props.value} checked={props.isSelected} />
            <span className={`${props.isSelected ? 'text-blue-700 bg-gray-200' : 'text-gray-500'} inline-block py-3 px-5 font-semibold rounded-full`}>{props.label}</span>
        </label>
    )
}

export default RadioTextInput