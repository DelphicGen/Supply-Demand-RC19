import React, { useState } from 'react'
import { HamburgerVortexReverse } from 'react-animated-burgers'
import Scroll from 'react-scroll'

import logo from '../../images/LandingPage.png'
import Anchors from './Anchors'
import AuthButtonNav from './AuthButtonNav'
import SideDrawer from './SideDrawer'
import Backdrop from '../UI/Backdrop'
import './Navbar.css'

const Link = Scroll.Link

const Navbar = props => {
    const [drawerVisible, setDrawerVisible] = useState(false)

    const toggleButton = () => {
        setDrawerVisible(prev => !prev)
    }

    const closeDrawer = () => {
        setDrawerVisible(false)
    }
    return (
        <React.Fragment>
            {drawerVisible && <Backdrop onClick={closeDrawer} />}
            <SideDrawer show={drawerVisible} onClick={closeDrawer}>
                <Anchors onClick={closeDrawer} />
                <div className="mt-5">
                    <AuthButtonNav />
                </div>
            </SideDrawer>
            <div className="fixed w-full flex flex-row px-5 py-3 items-center justify-between bg-gray-100 rounded-b-lg z-40" style={{ boxShadow: '0 6px 8px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                <Link
                    to='top'
                    spy={true}
                    smooth={true}
                    duration={750}
                    className='cursor-pointer flex flex-row items-center'
                >
                    <img style={{ height: '45px', width: '45px' }} src={logo} alt="doctor-with-mask" />
                    <span className='ml-2 text-sm text-blue-800 font-semibold'>Peduli Corona</span>
                </Link>

                <div className="hidden md:flex md:flex-row">
                    <Anchors />
                </div>

                <div className='hidden md:block'>
                    <AuthButtonNav />
                </div>

                <div className="md:hidden" style={{ zIndex: 10000 }}>
                    <HamburgerVortexReverse
                        className=" focus:outline-none bg-blue"
                        barColor="#2b6cb0"
                        buttonWidth={32}
                        isActive={drawerVisible}
                        toggleButton={toggleButton} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Navbar