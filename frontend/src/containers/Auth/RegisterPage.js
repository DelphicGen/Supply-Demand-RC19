import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/auth-context'
import {useHttpClient} from '../../hooks/http-hook'
import {useForm} from '../../hooks/form-hook'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_PASSWORD} from '../../util/validator'

import TextInput from '../../components/Form/TextInput'
import Button from '../../components/UI/Button'
import RadioInput from '../../components/Form/RadioInput'
import ErrorText from '../../components/UI/ErrorText'
import LoadingSpinner from '../../components/UI/LoadingSpinner'

const RegisterPage = () => {
    const [role, setRole] = useState()
    const [roleValid, setRoleValid] = useState(false)
    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        institutionName: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
        confirmPassword: {
            value: '',
            isValid: false
        }
    }, false)

    const auth = useContext(AuthContext)
    const {isLoading, error, sendRequest} = useHttpClient()

    useEffect(() => {
        console.log(auth.token, auth.role, auth.name)
    }, [auth])

    const radioChangeHandler = (event) => {
        setRole(event.target.value)
        setRoleValid(true)
    }

    const registerSubmit = event => {
        event.preventDefault()
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/auth/register`,
            'POST',
            JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
                name: formState.inputs.institutionName.value,
                role: role
            }),
            {'Accept': 'application/json', 'Content-Type': 'application/json'}
        ).then((responseData) => {
            auth.login(responseData.jwt, responseData.role, responseData.name)
        })
    }

    return (
        <form onSubmit={registerSubmit} className="flex items-center justify-center h-full flex-col">
            <h1>Daftar</h1>
            <div className="flex flex-col items-center lg:flex-row lg:justify-around w-full lg:px-48 lg:mb-5">
                <TextInput
                    divClassName="w-4/5 lg:4/12 lg:mr-32"
                    id="email"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    onInput={inputHandler}
                    errorText="Mohon masukkan email yang valid."
                     />

                <TextInput
                    divClassName="w-4/5 lg:4/12"
                    id="institutionName"
                    type="text"
                    label="Nama Lembaga"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Mohon masukkan nama lembaga."
                     />
            </div>

            <div className="flex flex-col items-center lg:flex-row lg:justify-around w-full lg:px-48">
                <TextInput
                    divClassName="w-4/5 lg:4/12 lg:mr-32"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    onInput={inputHandler}
                    errorText="Password minimal 8 karakter."
                     />

                <TextInput
                    divClassName="w-4/5 lg:4/12"
                    id="confirmPassword"
                    type="password"
                    label="Konfirmasi Password"
                    validators={[VALIDATOR_PASSWORD(formState.inputs.password.value)]}
                    onInput={inputHandler}
                    errorText="Password tidak cocok"
                     />
            </div>

            <div className="flex flex-col w-4/5 lg:w-auto">
                <h2>Daftar sebagai</h2>
                <div className="flex flex-row">
                    <RadioInput
                        changed={radioChangeHandler}
                        id="donator"
                        isSelected={role === 'donator'}
                        label="Donatur"
                        value="donator" />

                    <RadioInput
                        changed={radioChangeHandler}
                        id="applicant"
                        isSelected={role === 'applicant'}
                        label="Pemohon Bantuan"
                        value="applicant" />
                </div>
            </div>

            <Button
                width={300}
                type="submit"
                disabled={!formState.isValid || !roleValid}>{isLoading ? <LoadingSpinner color="white" style={{transform: 'translateY(-3px)'}} /> : 'DAFTAR'}</Button>

            {error && <ErrorText>{error}</ErrorText>}
            <Link to="/login">Sudah punya akun? Login</Link>
        </form>
    )
}

export default RegisterPage