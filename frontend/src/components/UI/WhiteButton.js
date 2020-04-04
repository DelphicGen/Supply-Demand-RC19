import React from 'react'
import {Link} from 'react-router-dom'
import {useMediaQuery} from '../../hooks/medquery-hook'

const Button = props => {
    const mediaQuery = useMediaQuery('(max-width: 419px)')
    const styles = {
        container: mediaQuery => ({
            marginRight: mediaQuery && '10px',
            width: mediaQuery ? 120 : 150,
            maxHeight: 41
        })
    }

    if(props.to){
        return (
            <Link to={props.to}
                className="px-4 py-3 bg-white rounded-md focus:outline-none shadow-xl text-blue-800 text-lg font-bold tracking-widest transform hover:scale-95 hover:shadow-none duration-300"
                style={styles.container(mediaQuery)}
            >
                {props.children}
            </Link>
        )
    }
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