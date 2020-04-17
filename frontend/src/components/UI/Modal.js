import React from 'react'
import ReactDOM from 'react-dom'
import { Clear } from '@material-ui/icons'
import { CSSTransition } from 'react-transition-group'
import './Modal.css'

import Backdrop from './Backdrop'

const ModalOverlay = props => {
    const content = (
        <div className="fixed z-50 w-4/5 md:w-3/5 lg:w-2/5" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="text-right" style={{transform: 'translate(12px, 12px)'}}>
                <div className="inline p-1 bg-gray-100 rounded-full">
                    <Clear
                        className="text-blue-800 cursor-pointer"
                        onClick={props.clear}
                        fontSize="default"
                        style={{transform: 'translateY(-1px) scale(0.75)'}} />
                </div>
            </div>
            <div className="bg-blue-800 rounded-lg">
                <div className="text-gray-100 py-6 px-5 md:py-8 md:px-10">
                    {props.children}
                </div>
            </div>
        </div>
    )

    return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = props => (
    <React.Fragment>
        {props.show && <Backdrop onClick={props.onCancel} />}
        <CSSTransition
            in={props.show}
            mountOnEnter
            unmountOnExit
            timeout={300}
            classNames="modal"
        >
            <ModalOverlay {...props} />
        </CSSTransition>
    </React.Fragment>
)

export default Modal