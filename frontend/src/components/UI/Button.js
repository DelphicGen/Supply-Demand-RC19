import React from 'react'
import {Link} from 'react-router-dom'

const Button = props => {
    if(props.to){
        return (
            <Link
                to={props.to}
                exact={props.exact}
            >
                {props.children}
            </Link>
        )
    }
    return(
        <button
            className={`mt-10 mb-4 px-2 py-3 focus:outline-none shadow-xl text-gray-200 text-lg font-bold tracking-widest ${props.disabled ? 'cursor-not-allowed bg-blue-600' : 'bg-blue-800  hover:bg-blue-900 focus:bg-purple-900'}`}
            style={{width: props.width}} 
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button