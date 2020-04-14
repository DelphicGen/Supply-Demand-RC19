import {useState, useCallback, useEffect} from 'react'

let logoutTimer

export const useAuth = () => {
  const [token, setToken] = useState()
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [userRole, setUserRole] = useState()
  const [userName, setUserName] = useState()
  const [contactPerson, setContactPerson] = useState() 
  const [contactNumber, setContactNumber] = useState()

  const login = useCallback((token, role, name, contactPerson, contactNumber, expirationDate) => {
    setToken(token)
    setUserRole(role)
    setUserName(name)
    setContactPerson(contactPerson)
    setContactNumber(contactNumber)
    const tokenExpiresIn = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 3)
    setTokenExpirationDate(tokenExpiresIn)
    localStorage.setItem(
      'userData',
      JSON.stringify({token: token, userRole: role, userName: name, contactPerson: contactPerson, contactNumber: contactNumber, expiration: tokenExpiresIn.toISOString()})
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUserRole(null)
    setUserName(null)
    setContactPerson(null)
    setContactNumber(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if(token && tokenExpirationDate){
      const expiresIn = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, expiresIn)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, tokenExpirationDate, logout])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.token, storedData.userRole, storedData.userName, storedData.contactPerson, storedData.contactNumber, new Date(storedData.expiration))
    }
  }, [login])

  return {token, userRole, userName, contactPerson, contactNumber, login, logout}
}