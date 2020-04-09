import React from 'react'
import {NavLink} from 'react-router-dom'
import './Link.css'
import {useMediaQuery} from '../../hooks/medquery-hook';

const Link = props => {
    const mediaQuery = useMediaQuery('(max-width: 767px)');

    return (
        <li className={`md:mr-3 flex-1 duration-300 hover:bg-blue-900 rounded-lg md:rounded-l-none md:rounded-r-lg ${props.info === 'Logout' ? 'md:hidden' : 'block'}`}>
            <NavLink to={props.link} exact className="dashboard-link block py-3 lg:pl-5 md:pl-3 rounded-lg md:rounded-l-none md:rounded-r-lg align-middle text-gray-800 no-underline">
                {props.icon}<span className="lg:pl-3 md:pl-1 pb-1 md:pb-0 md:text-sm lg:text-base text-gray-400 block md:inline-block hover:text-white font-semibold" style={styles.container(mediaQuery)}>{props.info} </span>
            </NavLink>
        </li>
    )
}

const styles = {
    container: mediaQuery => ({
        fontSize: mediaQuery && '0.65rem'
    })
};

export default Link