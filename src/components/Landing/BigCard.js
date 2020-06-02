import React from 'react'

const BigCard = props => (
    <div className="p-5 md:p-10 bg-gray-100 w-4/5 lg:w-3/5 rounded-lg mx-auto mb-8 shadow-lg">
        <h4 className="text-blue-800 text-md md:text-lg lg:text-xl font-bold mb-8">{props.title}</h4>
        {props.children}
    </div>
)

export default BigCard