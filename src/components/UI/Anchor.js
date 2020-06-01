import React from 'react'
import Scroll from 'react-scroll'
const Link = Scroll.Link

const Anchor = props => (
    <Link
        to={props.to}
        spy={true}
        smooth={true}
        duration={500}
        className='text-xs text-gray-500 font-semibold mr-4 lg:mr-8 cursor-pointer hover:text-blue-700'
    >
        {props.children}
    </Link>
)

export default Anchor