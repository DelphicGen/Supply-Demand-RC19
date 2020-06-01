import React, { useContext } from 'react'
import Scroll from 'react-scroll'

import logo from '../../images/LandingPage.png'
import Anchors from './Anchors'
import AuthButtonNav from './AuthButtonNav'

const Link = Scroll.Link

const Navbar = props => {
    return (
        <div className="fixed w-full flex flex-row px-5 py-3 items-center justify-between bg-gray-100" style={{ boxShadow: '0 6px 8px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
            <div>
                <Link
                    to='top'
                    spy={true}
                    smooth={true}
                    duration={500}
                    className='cursor-pointer flex flex-row items-center'
                >
                    <img style={{ height: '45px', width: '45px' }} src={logo} alt="doctor-with-mask" />
                    <span className='ml-2 text-sm text-blue-700 font-semibold'>Peduli Corona</span>
                </Link>
            </div>

            <div className="hidden md:flex md:flex-row">
                <Anchors />
            </div>

            <div className='hidden md:block'>
                <AuthButtonNav />
            </div>
        </div>
    )
}

export default Navbar