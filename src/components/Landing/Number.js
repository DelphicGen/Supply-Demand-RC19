import React from 'react'

const Number = props => (
    <div className="flex flex-row items-center justify-center text-white text-center font-semibold bg-blue-800 rounded-full h-6 w-6 transform scale-110 md:scale-125">
        <span className="text-sm md:text-base lg:pt-px">{props.number}</span>
    </div>
)

export default Number