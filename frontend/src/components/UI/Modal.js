import React from 'react'
import ReactDOM from 'react-dom'
import {Clear} from '@material-ui/icons'
import {CSSTransition} from 'react-transition-group'
import './Modal.css'

import Backdrop from './Backdrop'

const ModalOverlay = props => {
    const content = (
        <div className="fixed z-50 w-4/5 md:w-3/5 lg:w-2/5" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <div className="text-right pb-2">
                <Clear
                    className="text-white cursor-pointer"
                    fontSize="default"
                    onClick={props.clear} />
            </div>
            <div className="bg-gray-100 rounded-lg">
                <div className="text-gray-800 py-4 px-2">
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