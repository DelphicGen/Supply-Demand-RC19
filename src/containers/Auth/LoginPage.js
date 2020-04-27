import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/auth-context'
import {useForm} from '../../hooks/form-hook'
import {useHttpClient} from '../../hooks/http-hook'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../util/validator'

import ErrorModal from '../../components/UI/ErrorModal'
import VirusSVG from '../../components/UI/VirusSVG'
import AuthTitle from '../../components/UI/AuthTitle'
import TextInput from '../../components/Form/TextInput'
import Button from '../../components/UI/Button'
import LoadingSpinner from '../../components/UI/LoadingSpinner'

const LoginPage = (props) => {
    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const auth = useContext(AuthContext)
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loginError, setLoginError] = useState(false)

    const loginSubmit = event => {
        event.preventDefault()
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/auth/login`,
            'POST',
            JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
            }),
            {'Accept': 'application/json', 'Content-Type': 'application/json'}
        ).then((responseData) => {
            if(responseData.error){
                setLoginError(responseData.error)
            } else {
                auth.login(responseData.jwt, responseData.user.role, responseData.user.name, responseData.user.id, responseData.user.contact_person, responseData.user.contact_number)
            
                let redirectLink = '/dashboard/tambah-barang'
                
                if(responseData.user.role === 'DONATOR'){
                    redirectLink = '/dashboard/donasi-saya'
                } else if(responseData.user.role === 'APPLICANT'){
                    redirectLink = '/dashboard/riwayat-kebutuhan'
                }
                props.history.push(redirectLink)
            }
        })
    }

    const clearLoginError = () => {
        setLoginError(null)
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <ErrorModal error={loginError} onClear={clearLoginError} />
            <form className="flex items-center justify-center h-screen flex-col" onSubmit={loginSubmit}>
                <div className="flex flex-row items-center mb-3">
                    <VirusSVG />
                    <AuthTitle>Login</AuthTitle>
                </div>
                
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                        errorText="Mohon masukkan email yang valid."
                        width={300} />

                    <TextInput
                        id="password"
                        isPassword={true}
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Password minimal 8 karakter."
                        width={300} />
                    <Link to="/reset-password" className="block text-right text-xs md:text-sm font-semibold text-blue-800 hover:text-blue-900 hover:underline">Lupa password?</Link>

                    <Button
                        width={300}
                        type="submit"
                        disabled={!formState.isValid}>{isLoading ? <LoadingSpinner color="white" style={{transform: 'translateY(-3px)'}} /> : 'LOGIN'} </Button>
                        
                    <Link to="/daftar" className="block mt-3 text-center text-xs md:text-sm font-semibold text-gray-700 tracking-wider hover:text-gray-600">Belum punya akun? <span className="hover:underline">Daftar</span></Link>
                </div>
            </form>
        </React.Fragment>
    )
}

export default LoginPage