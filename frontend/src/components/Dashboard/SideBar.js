import React, { useEffect } from 'react'
import { ExitToApp } from '@material-ui/icons';
import Link from './Link'

const Sidebar = props => {
   const Icon = props.icons
   useEffect(() => {
      console.log(Icon)
   }, [])
   return (
      <div className="w-full md:w-1/4 xl:w-1/5 bg-blue-800 rounded-t-lg md:rounded-t-none md:rounded-r-lg  text-center fixed bottom-0 md:pt-10 md:top-0 md:left-0 h-16 md:h-screen">
         <div className="hidden md:block md:text-left lg:pl-5 md:pl-3">
               <h5 className="text-white lg:text-base font-semibold text-xs">{`Dashboard ${props.role}`} </h5>
               <h2 className="text-white lg:text-4xl font-semibold text-2xl">{props.name}</h2>
         </div>
         <div className="mx-auto lg:pr-2 md:mt-20">
            <ul className="list-reset flex flex-row md:flex-col text-center md:text-left">
               {
                  props.links.map(link => (
                     <Link key={link.info} link={link.link} icon={link.icon} info={link.info}></Link>
                  ))
               }
            </ul>
         </div>
         <p className="hidden md:block text-left ml-5 md:mt-48 cursor-pointer"><ExitToApp  className="text-white" fontSize="small" /><span className="lg:pl-3 md:pl-1 pb-1 md:pb-0 text-xs md:text-sm lg:text-base text-gray-400 md:font-bold block md:inline-block font-semibold">Logout</span></p>
      </div>
   )
}

export default Sidebar