import React, {Suspense, useContext} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import {AuthContext} from './context/auth-context'
import './tailwind.css'

import LoadingSpinner from './components/UI/LoadingSpinner'
const LandingPage = React.lazy(() => import('./containers/Landing/LandingPage'))
const LoginPage = React.lazy(() => import('./containers/Auth/LoginPage'))
const RegisterPage = React.lazy(() => import('./containers/Auth/RegisterPage'))
const ResetPass = React.lazy(() => import('./containers/Auth/ResetPass'))
const NewPassword = React.lazy(() => import('./containers/Auth/NewPassword'))

const AlokasiBantuan = React.lazy(() => import('./containers/Dashboard/Admin/AlokasiBantuan'))
const TambahBarang = React.lazy(() => import('./containers/Dashboard/Admin/TambahBarang'))
const KonfirmasiDonasi = React.lazy(() => import('./containers/Dashboard/Admin/KonfirmasiDonasi'))

const InputKebutuhan = React.lazy(() => import('./containers/Dashboard/Applicant/InputKebutuhan'))
const RiwayatPermohonan = React.lazy(() => import('./containers/Dashboard/Applicant/RiwayatPermohonan'))
const UpdateRiwayat = React.lazy(() => import('./containers/Dashboard/Applicant/UpdateRiwayat'))

const DonasiSaya = React.lazy(() => import('./containers/Dashboard/Donatur/DonasiSaya'))
const InfoDemand = React.lazy(() => import('./containers/Dashboard/Donatur/InfoDemand'))
const InputBantuan = React.lazy(() => import('./containers/Dashboard/Donatur/InputBantuan'))
const UpdateDonasi = React.lazy(() => import('./containers/Dashboard/Donatur/UpdateDonasi'))

const App = () => {
  const auth = useContext(AuthContext)

  let routes = (
    <Switch>
      <Route path="/" component={LandingPage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/daftar" component={RegisterPage} exact />
      <Route path="/reset-password" component={ResetPass} exact />
      <Route path="/confirm/:confirmId" component={NewPassword} exact />

      <Route path="/dashboard/donasi-saya" component={DonasiSaya} exact />
      <Route path="/dashboard/info-demand" component={InfoDemand} exact />
      <Route path="/dashboard/input-bantuan" component={InputBantuan} exact />
      <Route path="/dashboard/donasi-saya/update" component={UpdateDonasi} exact />

      <Route path="/dashboard/input-kebutuhan" component={InputKebutuhan} exact />
      <Route path="/dashboard/riwayat-permohonan" component={RiwayatPermohonan} exact />
      <Route path="/dashboard/riwayat-permohonan/update" component={UpdateRiwayat} exact />

      <Route path="/dashboard/alokasi-bantuan" component={AlokasiBantuan} exact />
      <Route path="/dashboard/tambah-barang" component={TambahBarang} exact />
      <Route path="/dashboard/konfirmasi-donasi" component={KonfirmasiDonasi} exact />
      <Redirect to='/' />
    </Switch>
  )

  if(auth.role === 'donator'){
    routes = (
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/dashboard/donasi-saya" component={DonasiSaya} exact />
        <Route path="/dashboard/info-demand" component={InfoDemand} exact />
        <Route path="/dashboard/input-bantuan" component={InputBantuan} exact />
        <Route path="/dashboard/donasi-saya/update" component={UpdateDonasi} exact />
        <Redirect to='/' />
      </Switch>
    )
  }
  else if(auth.role === 'applicant'){
    routes = (
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/dashboard/input-kebutuhan" component={InputKebutuhan} exact />
        <Route path="/dashboard/riwayat-permohonan" component={RiwayatPermohonan} exact />
        <Route path="/dashboard/riwayat-permohonan/update" component={UpdateRiwayat} exact />
        <Redirect to='/' />
      </Switch>
    )
  }
  else if(auth.role === 'admin'){
    routes = (
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/dashboard/alokasi-bantuan" component={AlokasiBantuan} exact />
        <Route path="/dashboard/tambah-barang" component={TambahBarang} exact />
        <Redirect to='/' />
      </Switch>
    )
  }

  return(
      <BrowserRouter>
        <div className="bg-gray-100 w-full h-full min-h-screen lg:relative">
          <Suspense fallback={<LoadingSpinner style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}>{routes}</Suspense>
        </div>
      </BrowserRouter>
  )
}

export default App

// admin user buat test
// email: admin@admin.com
// pass: admin-supply-demand-covid19

// donatur buat test
// email: donatur@donatur.com
// pass: donatur-supply-demand-covid19

// email: donatur2@donatur.com
// pass: donatur-supply-demand-covid19