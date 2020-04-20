import React from 'react'

const ErrorText = props => (
    <p className="text-xs font-semibold text-red-800 mt-2 mb-2" onClick={props.clear}>{props.children}</p>
)

export default ErrorText