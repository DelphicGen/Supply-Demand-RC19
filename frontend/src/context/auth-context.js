import {createContext} from 'react'

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