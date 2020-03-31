import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import {AuthContext} from './context/auth-context'
import {useAuth} from './hooks/auth-hook'
import './tailwind.css'

import LandingPage from './containers/Landing/LandingPage'
import LoginPage from './containers/Auth/LoginPage'
import RegisterPage from './containers/Auth/RegisterPage'
import ResetPass from './containers/Auth/ResetPass'

const App = () => {
  const {token, userRole, userName, login, logout} = useAuth()

  let routes = (
    <Switch>
      <Route path="/" component={LandingPage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/daftar" component={RegisterPage} exact />
      <Route path="/reset-password" component={ResetPass} exact />
      <Redirect to='/' />
    </Switch>
  )
  return(
    <AuthContext.Provider value={{token: token, role: userRole, name: userName, login: login, logout: logout}}>
      <div className="bg-gray-200 w-screen h-screen">
        {routes}
      </div>
    </AuthContext.Provider>
  )
}

export default App