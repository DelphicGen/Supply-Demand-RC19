import React from 'react'

const Contact = () => (
    <div className="bg-blue-800 py-8 md:py-12 flex flex-col md:flex-row flex-wrap items-center justify-center relative">
        <div className="bg-blue-700 absolute left-0 top-0 h-40 w-64 md:h-40 md:w-48 lg:w-32 lg:h-24 z-0" style={{ clipPath: 'ellipse(50% 50% at 0% 0%)' }}></div>
        <div className="bg-blue-700 absolute bottom-0 right-0 h-40 w-64 md:h-40 md:w-48 lg:w-32 lg:h-24 z-0" style={{ clipPath: 'ellipse(50% 50% at 100% 100%)' }}></div>

        <svg width="104" height="84" viewBox="0 0 104 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-75 md:scale-90 lg:scale-100">
            <path d="M93.3334 72.9998H83V27.7915L52 47.1665L21 27.7915V72.9998H10.6667V10.9998H16.8667L52 32.9582L87.1334 10.9998H93.3334V72.9998ZM93.3334 0.666504H10.6667C4.93171 0.666504 0.333374 5.26484 0.333374 10.9998V72.9998C0.333374 75.7404 1.42206 78.3687 3.35994 80.3066C5.29781 82.2445 7.92614 83.3332 10.6667 83.3332H93.3334C96.074 83.3332 98.7023 82.2445 100.64 80.3066C102.578 78.3687 103.667 75.7404 103.667 72.9998V10.9998C103.667 5.26484 99.0167 0.666504 93.3334 0.666504Z" fill="white" />
        </svg>

        <div className="md:ml-8 mt-2 md:mt-0 z-10">
            <h4 className="text-white text-center md:text-left font-bold text-base md:text-lg tracking-wider md:mb-1">Kontak</h4>
            <a className="text-white text-sm md:text-base tracking-wide hover:underline" href="mailto:sonjo.supply.demand@gmail.com">sonjo.supply.demand@gmail.com</a>
        </div>
    </div>
)

export default Contact