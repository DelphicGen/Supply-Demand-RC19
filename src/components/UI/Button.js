import React from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/medquery-hook'

const Button = props => {
    const mediaQuery = useMediaQuery('(max-width: 419px)')
    const styles = {
        container: mediaQuery => ({
            marginRight: mediaQuery && '10px',
            width: mediaQuery ? 120 : 150,
            maxHeight: 41
        })
    }
    if (props.to) {
        return (
            <Link
                to={props.to}
                className="px-4 py-2 bg-blue-800 rounded-md focus:outline-none text-gray-200 mr-2 text-xs font-semibold tracking-widest transform hover:scale-95 hover:shadow-md duration-300"
                style={!props.width ? styles.container(mediaQuery) : { width: props.width }}
            >
                {props.children}
            </Link>
        )
    }

    if (props.scroll) {
        return (
            <span
                className="inline px-4 py-2 bg-blue-800 rounded-md focus:outline-none text-gray-200 text-xs font-semibold tracking-widest transform hover:scale-95 hover:shadow-md duration-300"
            >
                {props.children}
            </span>
        )
    }

    return (
        <button
            className={`mt-8 p-2 bg-blue-800 rounded-md flex items-center justify-center focus:outline-none shadow-xl text-gray-200 text-lg font-bold tracking-widest duration-300 ${props.disabled ? 'cursor-not-allowed opacity-50 text-white' : 'hover:bg-indigo-900 focus:bg-purple-900'}`}
            style={{ width: props.width, maxHeight: 41 }}
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button