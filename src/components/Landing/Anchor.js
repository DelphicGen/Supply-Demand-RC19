import React from 'react'
import Scroll from 'react-scroll'
const Link = Scroll.Link

const Anchor = props => (
    <div className="mb-1 md:mb-0">
        <Link
            onClick={props.onClick}
            to={props.to}
            spy={true}
            smooth={true}
            duration={750}
            className='text-xs text-gray-700 font-semibold mr-4 lg:mr-8 cursor-pointer hover:text-blue-800'
        >
            {props.children}
        </Link>
    </div>
)

export default Anchor