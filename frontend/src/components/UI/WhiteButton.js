import React from 'react'

const Button = props => {
    return(
        <button
            className={`p-2 bg-white rounded-md border border-solid border-blue-800 flex items-center justify-center focus:outline-none shadow-xl text-blue-800 text-lg font-bold tracking-widest hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200 ${props.className}`}
            style={{width: props.width, maxHeight: 41}} 
            onClick={props.onClick}
            type={props.type}
        >
            {props.children}
        </button>
    )
}

export default Button