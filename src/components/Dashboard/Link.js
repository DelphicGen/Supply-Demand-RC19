import React from 'react'
import {NavLink} from 'react-router-dom'
import './Link.css'

const Link = props => {
    if(props.info === 'Logout'){
        return(
            <li className='md:mr-3 flex-1 duration-300 hover:bg-blue-900 rounded-lg md:rounded-l-none md:rounded-r-lg md:hidden px-1 md:px-0'>
                <p onClick={props.onClick} className="cursor-pointer dashboard-link block py-2 md:py-3 lg:pl-5 md:pl-3 rounded-lg md:rounded-l-none md:rounded-r-lg align-middle text-gray-800 no-underline">
                    {props.icon}<span className="lg:pl-3 md:pl-1 pb-1 md:pb-0 text-xs md:text-sm lg:text-base text-gray-400 block md:inline-block hover:text-white font-semibold">{props.info} </span>
                </p>
            </li>
        )
    }
    return (
        <li className={`md:mr-3 flex-1 duration-300 hover:bg-blue-900 rounded-lg md:rounded-l-none md:rounded-r-lg block px-1 md:px-0`}>
            <NavLink to={props.link} exact className="dashboard-link block py-2 md:py-3 lg:pl-5 md:pl-3 rounded-lg md:rounded-l-none md:rounded-r-lg align-middle text-gray-800 no-underline">
                {props.icon}<span className="lg:pl-3 md:pl-1 pb-1 md:pb-0 text-xs md:text-sm lg:text-base text-gray-400 block md:inline-block hover:text-white font-semibold">{props.info} </span>
            </NavLink>
        </li>
    )
}

export default Link