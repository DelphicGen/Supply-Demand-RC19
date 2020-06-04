import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

const SideDrawer = props => {
    const content = (
        <CSSTransition
            in={props.show && props.navVisible}
            timeout={300}
            classNames="slide-in-down"
            mountOnEnter
            unmountOnExit>
            <aside className="fixed right-0 w-screen pt-20 pb-6 bg-gray-100 text-center flex flex-col justify-center items-center z-30 rounded-b-lg" style={{boxShadow: '0 6px 8px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', height: '18rem'}} onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
    )
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
}

export default SideDrawer