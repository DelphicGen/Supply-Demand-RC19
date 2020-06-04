import React, { useState, useEffect, useCallback } from 'react'
import { HamburgerVortexReverse } from 'react-animated-burgers'
import Scroll from 'react-scroll'

import logo from '../../images/LandingPage.png'
import Anchors from './Anchors'
import AuthButtonNav from './AuthButtonNav'
import SideDrawer from './SideDrawer'
import './Navbar.css'

const Link = Scroll.Link

const Navbar = props => {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [navVisible, setNavVisible] = useState(true)
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset)

    const toggleButton = () => {
        setDrawerVisible(prev => !prev)
    }

    const closeDrawer = () => {
        setDrawerVisible(false)
    }

    const handleScroll = useCallback(() => {
        const currentScrollPos = window.pageYOffset
        const visible = prevScrollPos > currentScrollPos

        setNavVisible(visible)
        setPrevScrollPos(currentScrollPos)
    }, [prevScrollPos])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
        <React.Fragment>
            <SideDrawer show={drawerVisible} navVisible={navVisible} onClick={closeDrawer}>
                <Anchors onClick={closeDrawer} />
                <div className="mt-5">
                    <AuthButtonNav />
                </div>
            </SideDrawer>
            <div className="fixed w-full top-0 flex flex-row px-5 py-3 items-center justify-between bg-gray-100 rounded-b-lg z-40 transition ease-in duration-300" style={{ boxShadow: !drawerVisible && '0 6px 8px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', transform: !navVisible && 'translateY(-90px)'  }}>
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