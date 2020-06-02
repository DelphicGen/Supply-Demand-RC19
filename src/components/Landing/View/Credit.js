import React from 'react'

import sonjo from '../../../images/sonjo.png'
import rc19 from '../../../images/rc19.png'

const Credit = () => (
    <div className="bg-gray-100 py-16">
        <h3 className="text-center text-blue-800 text-xl md:text-2xl font-bold mb-10">Aplikasi ini dikembangkan oleh</h3>
        <div className="w-11/12 mx-auto flex flex-row justify-center">
            <img src={sonjo} className="transform scale-75 md:scale-90 lg:scale-100 md:mr-4 lg:mr-8" alt="Logo Sonjo" />
            <img src={rc19} className="transform scale-75 md:scale-90 lg:scale-100" alt="Logo Respons COVID-19" />
        </div>
    </div>
)

export default Credit