import React, {Suspense, useEffect} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import {AuthContext} from './context/auth-context'
import {useAuth} from './hooks/auth-hook'
import './tailwind.css'

import LoadingSpinner from './components/UI/LoadingSpinner'
const LandingPage = React.lazy(() => import('./containers/Landing/LandingPage'))
const LoginPage = React.lazy(() => import('./containers/Auth/LoginPage'))
const RegisterPage = React.lazy(() => import('./containers/Auth/RegisterPage'))
const ResetPass = React.lazy(() => import('./containers/Auth/ResetPass'))

const AlokasiBantuan = React.lazy(() => import('./containers/Dashboard/Admin/AlokasiBantuan'))
const TambahBarang = React.lazy(() => import('./containers/Dashboard/Admin/TambahBarang'))

const InputKebutuhan = React.lazy(() => import('./containers/Dashboard/Applicant/InputKebutuhan'))
const RiwayatPermohonan = React.lazy(() => import('./containers/Dashboard/Applicant/RiwayatPermohonan'))
const UpdateRiwayat = React.lazy(() => import('./containers/Dashboard/Applicant/UpdateRiwayat'))

const DonasiSaya = React.lazy(() => import('./containers/Dashboard/Donatur/DonasiSaya'))
const InfoDemand = React.lazy(() => import('./containers/Dashboard/Donatur/InfoDemand'))
const InputBantuan = React.lazy(() => import('./containers/Dashboard/Donatur/InputBantuan'))
const UpdateDonasi = React.lazy(() => import('./containers/Dashboard/Donatur/UpdateDonasi'))

const App = () => {
  const {token, userRole, userName, login, logout} = useAuth()

  useEffect(() => {
    console.log(token)
  }, [token])

  let routes = (
    <Switch>
      <Route path="/" component={LandingPage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/daftar" component={RegisterPage} exact />
      <Route path="/reset-password" component={ResetPass} exact />
      <Route path="/dashboard/donasi-saya" component={DonasiSaya} exact />
      <Route path="/dashboard/info-demand" component={InfoDemand} exact />
      <Route path="/dashboard/input-bantuan" component={InputBantuan} exact />
      <Route path="/dashboard/donasi-saya/update" component={UpdateDonasi} exact />
      <Route path="/dashboard/input-kebutuhan" component={InputKebutuhan} exact />
      <Route path="/dashboard/riwayat-permohonan" component={RiwayatPermohonan} exact />
      <Route path="/dashboard/riwayat-permohonan/update" component={UpdateRiwayat} exact />
      <Route path="/dashboard/alokasi-bantuan" component={AlokasiBantuan} exact />
      <Route path="/dashboard/tambah-barang" component={TambahBarang} exact />
      <Redirect to='/' />
    </Switch>
  )

  return(
    <AuthContext.Provider value={{token: token, role: userRole, name: userName, login: login, logout: logout}}>
      <BrowserRouter>
        <div className="bg-gray-200 w-screen h-screen">
          <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App