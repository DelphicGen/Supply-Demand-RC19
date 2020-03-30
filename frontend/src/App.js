import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import './tailwind.css'

import LandingPage from './containers/Landing/LandingPage'
import LoginPage from './containers/Auth/LoginPage'
import RegisterPage from './containers/Auth/RegisterPage'
import ResetPass from './containers/Auth/ResetPass'

const App = () => {
  let routes = (
    <Switch>
      <Route path="/" component={LandingPage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/daftar" component={RegisterPage} exact />
      <Route path="/reset-password" component={ResetPass} exact />
    </Switch>
  )
  return(
    <div className="bg-gray-200 w-screen h-screen">
      {routes}
    </div>
  )
}

export default App