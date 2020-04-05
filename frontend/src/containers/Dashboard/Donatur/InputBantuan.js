import React, { useState, useContext } from 'react'
import Sidebar from '../../../components/Dashboard/SideBar'
import { links } from '../../../components/Dashboard/donaturLink'
import {AuthContext} from '../../../context/auth-context'

const InputBantuan = () => {
    const auth = useContext(AuthContext)
    const [name, setName] = useState(auth.name)

    return(
        <div className="flex items-center md:pt-0 pt-10 md:pb-0 pb-24">
            <Sidebar role="Donatur" name={name} links={links} />

        </div>  
    )
}

export default InputBantuan