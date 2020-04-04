import React, {createContext} from 'react'
import {useAuth} from '../hooks/auth-hook'

export const AuthContext = createContext({
    isLogin: false,
    token: null,
    role: null,
    name: null,
    contactPerson: null,
    contactNumber: null,
    login: () => {},
    logout: () => {}
})

const AuthContextProvider = props => {
    const {token, userRole, userName, contactPerson, contactNumber, login, logout} = useAuth()

    return(
        <AuthContext.Provider value={{isLogin: !!token, token: token, role: userRole, name: userName, contactPerson: contactPerson, contactNumber: contactNumber, login: login, logout: logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider