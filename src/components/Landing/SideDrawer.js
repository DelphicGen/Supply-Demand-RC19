import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

const SideDrawer = props => {
    const content = (
        <CSSTransition
            in={props.show}
            timeout={300}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit>
            <aside className="fixed left-0 top-0 h-screen w-8/12 bg-gray-100 text-center flex flex-col justify-center" style={{zIndex: 1000}} onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
    )
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
}

export default SideDrawer