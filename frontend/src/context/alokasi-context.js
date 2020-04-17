import React, {createContext} from 'react'
// import {useAuth} from '../hooks/auth-hook'

export const AlokasiContext = createContext({

    jenisBarang: null, 
    Tanggal: null, 
    BarangKebutuhan: null, 

    // isLogin: false,
    // token: null,
    // role: null,
    // name: null,
    // contactPerson: null,
    // contactNumber: null,
    // login: () => {},
    // logout: () => {}
})

const AlokasiContextProvider = props => {
    // const {token, userRole, userName, contactPerson, contactNumber, login, logout} = useAuth()

    return(
        <AlokasiContext.Provider value={{

          jenisBarang: null, 
          tanggal: null, 
          barangKebutuhan: null, 

          }}>
            {props.children}
        </AlokasiContext.Provider>
    )
}

export default AlokasiContextProvider


// isLogin: !!token,
//           token: token, role: userRole, 
//           name: userName, contactPerson: contactPerson, 
//           contactNumber: contactNumber, 
//           login: login,
//           logout: logout