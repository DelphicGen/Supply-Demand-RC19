import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = props => (
    <div className="lds-roller" style={props.style}>
        <div className={props.color ? props.color : 'blue'}></div>
        <div className={props.color ? props.color : 'blue'}></div>
        <div className={props.color ? props.color : 'blue'}></div>
        <div className={props.color ? props.color : 'blue'}></div>
        <div className={props.color ? props.color : 'blue'}></div>
        <div className={props.color ? props.color : 'blue'}></div>
        <div className={props.color ? props.color : 'blue'}></div>
        <div className={props.color ? props.color : 'blue'}></div>
    </div>
)

export default LoadingSpinner