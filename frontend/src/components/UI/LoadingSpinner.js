import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = props => (
    <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default LoadingSpinner