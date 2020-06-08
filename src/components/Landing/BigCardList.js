import React from 'react'

import Number from './Number'

const BigCardList = props => (
    <div className='flex flex-row mb-4'>
        <Number number={props.number} />
        <p className="text-gray-800 text-xs md:text-sm ml-2 md:ml-3 font-normal w-10/12 md:w-11/12">{props.children}</p>
    </div>
)

export default BigCardList