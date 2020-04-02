import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import './tailwind.css'

import LandingPage from './containers/Landing/LandingPage'
import LoginPage from './containers/Auth/LoginPage'
import RegisterPage from './containers/Auth/RegisterPage'
import ResetPass from './containers/Auth/ResetPass'
import SideBar from './components/Dashboard/SideBar'

const App = () => {
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
      <div className="bg-gray-200 h-screen">
        <SideBar />
        {routes}
  >>>>>>> 791241b4baf71a512b9641db4576dda0c1a87cd6
      </div>
  )
}

export default App