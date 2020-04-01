import React from 'react'
import Link from './Link'
// import { Favorite, Create, CardGiftcard } from '@material-ui/icons';

const Sidebar = props => {
    return (
        <div className="w-full md:w-1/4 xl:w-1/5 bg-blue-800 rounded-t-lg md:rounded-t-none md:rounded-r-lg md:bg-blue-800 text-center fixed bottom-0 md:pt-10 md:top-0 md:left-0 h-16 md:h-screen">
            <div className="hidden md:block md:text-left lg:pl-5 md:pl-3">
                <h5 className="text-white lg:text-base font-semibold text-xs">{`Dashboard ${props.role}`} </h5>
                <h2 className="text-white lg:text-4xl font-semibold text-2xl">{props.name}</h2>
            </div>
            <div className="mx-auto lg:pr-2 md:mt-20 w-full">
               <ul className="list-reset flex flex-row md:flex-col text-center md:text-left w-full">
                  {props.links.map(link => (
                     <Link key={link.info} link={link.link} icon={link.icon} info={link.info} />
                  ))}
               </ul>
            </div>
         </div>
    )
}

export default Sidebar
