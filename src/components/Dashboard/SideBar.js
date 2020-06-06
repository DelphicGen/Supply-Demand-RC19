import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import { ExitToApp } from '@material-ui/icons';
import Link from './Link'
import {AuthContext} from '../../context/auth-context'
import {useMediaQuery} from '../../hooks/medquery-hook';

const Sidebar = props => {
   const auth = useContext(AuthContext)
   const mediaQuery = useMediaQuery('(min-width: 768px)')

   const logoutHandler = () => {
      auth.logout()
      props.history.push('/')
   }

   return (
      <React.Fragment>
         <div style={styles.container(mediaQuery)} className={`w-full bg-blue-800 z-50 rounded-t-lg md:rounded-t-none md:rounded-r-lg  text-center fixed md:sticky md:static bottom-0 md:pt-10 md:top-0 md:left-0 ${props.links.length > 2 ? 'h-20' : 'h-16'} md:h-screen md:relative`}>
            <div className="hidden md:block md:text-left lg:px-5 md:px-3">
               <h5 className="text-white lg:text-base font-semibold text-xs">{`Dashboard ${props.role}`} </h5>
               <h2 className="text-white lg:text-2xl font-semibold text-lg">{props.name}</h2>
            </div>
            <div className="mx-auto lg:pr-2 md:mt-20 h-full md:h-auto">
               <ul className="list-reset flex flex-row md:flex-col text-center md:text-left h-full md:h-auto items-center md:items-stretch">
                  {
                     props.links.map(link => (
                        <Link key={link.info} link={link.link} icon={link.icon} info={link.info} />
                     ))
                  }
                  <Link key="Logout" onClick={logoutHandler} icon={<ExitToApp  className="text-white" fontSize="small" />} info="Logout" />
               </ul>
            </div>
            <p className="hidden md:block text-left ml-5 absolute cursor-pointer" style={{bottom: '10%'}} onClick={logoutHandler}><ExitToApp  className="text-white" fontSize="small" /><span className="lg:pl-3 md:pl-1 pb-1 md:pb-0 text-xs md:text-sm lg:text-base text-gray-400 md:font-bold block md:inline-block font-semibold">Logout</span></p>
         </div>
      </React.Fragment>
   )
}

const styles = {
   container: mediaQuery => ({
     width: mediaQuery ? '325px' : '100%' 
   })
};

export default withRouter(Sidebar)