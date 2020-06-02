import React from 'react'

const RadioTextInput = props => {
    return (
        <label htmlFor={props.id} className="relative cursor-pointer leading-5 text-sm md:text-base lg:text-lg mr-4">
            <input id={props.id} onChange={props.changed} className="hidden" type="radio" value={props.value} checked={props.isSelected} />
            <span className={`${props.isSelected ? 'text-blue-800 bg-gray-200' : 'text-gray-500'} text-sm inline-block py-4 px-5 font-semibold rounded-full hover:bg-gray-200`}>{props.label}</span>
        </label>
    )
}

export default RadioTextInput