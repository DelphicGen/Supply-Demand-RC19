import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/auth-context'
import {useForm} from '../../hooks/form-hook'
import {useHttpClient} from '../../hooks/http-hook'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../util/validator'

import TextInput from '../../components/Form/TextInput'
import ErrorText from '../../components/UI/ErrorText'
import Button from '../../components/UI/Button'
import LoadingSpinner from '../../components/UI/LoadingSpinner'

const LoginPage = () => {
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
    const {isLoading, error, sendRequest} = useHttpClient()

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
            auth.login(responseData.jwt, responseData.role, responseData.name)
        })
    }

    return (
        <form className="flex items-center justify-center h-full flex-col" onSubmit={loginSubmit}>
            <h1>Login</h1>
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
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Password minimal 8 karakter."
                width={300} />
            <Link to="/reset-password">Lupa password?</Link>

            <Button
                width={300}
                type="submit"
                disabled={!formState.isValid}>{isLoading ? <LoadingSpinner /> : 'LOGIN'} </Button>
                
            {error && <ErrorText>{error}</ErrorText>}
            <Link to="/daftar">Belum punya akun? Daftar</Link>
        </form>
    )
}

export default LoginPage