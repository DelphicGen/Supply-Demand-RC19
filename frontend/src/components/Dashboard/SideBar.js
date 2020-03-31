import React from 'react'
import { Favorite, Create, CardGiftcard } from '@material-ui/icons';

const SideBar = () => {
    return (
        <div className="w-full md:w-1/5 bg-blue-800 md:bg-blue-800 pr-2 text-center fixed bottom-0 md:pt-10 md:top-0 md:left-0 h-16 md:h-screen">
            <div className="hidden md:block md:text-left lg:pl-5 md:pl-3">
                <h5 className="text-white lg:text-base font-semibold text-xs">Dashboard Donatur</h5>
                <h2 className="text-white lg:text-4xl font-semibold text-2xl">BPD DIY</h2>
            </div>
            <div className="mx-auto lg:pr-2 md:mt-20">
               <ul className="list-reset flex flex-row md:flex-col text-center md:text-left">
                  <li className="mr-3 flex-1 lg:pl-5 md:pl-3 duration-300 rounded-r-md hover:bg-blue-900">
                     <a href="#" className="block py-1 md:py-3 align-middle text-gray-800 no-underline">
                     <Favorite className="text-white" fontSize="small" /><span className="lg:pl-3 md:pl-1 pb-1 md:pb-0 text-xs md:text-sm lg:text-base text-gray-400 block md:inline-block hover:text-white font-semibold">Info Demand</span>
                     </a>
                  </li>
                  <li className="mr-3 flex-1 lg:pl-5 md:pl-3 duration-300 rounded-r-md hover:bg-blue-900">
                     <a href="#" className="block py-1 md:py-3 align-middle text-gray-800 no-underline hover:text-pink-500">
                     <Create className="text-white" fontSize="small" /><span className="lg:pl-3 md:pl-1 pb-1 md:pb-0 text-xs md:text-sm lg:text-base text-gray-400 block md:inline-block font-semibold">Input Bantuan</span>
                     </a>
                  </li>
                  <li className="mr-3 flex-1 lg:pl-5 md:pl-3 duration-300 rounded-r-md hover:bg-blue-900">
                     <a href="#" className="block py-1 md:py-3 align-middle text-white no-underline hover:text-white">
                     <CardGiftcard className="text-white" fontSize="small" /><span className="lg:pl-3 md:pl-1 pb-1 md:pb-0 text-xs md:text-sm lg:text-base text-white md:font-bold block md:inline-block font-semibold">Donasi Saya</span>
                     </a>
                  </li>
               </ul>
            </div>
         </div>
    )
}

export default SideBar
