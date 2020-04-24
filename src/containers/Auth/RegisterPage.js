import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'
import { useHttpClient } from '../../hooks/http-hook'
import { useForm } from '../../hooks/form-hook'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_PASSWORD, VALIDATOR_TEL, VALIDATOR_MAXLENGTH } from '../../util/validator'

import ErrorModal from '../../components/UI/ErrorModal'
import VirusSVG from '../../components/UI/VirusSVG'
import AuthTitle from '../../components/UI/AuthTitle'
import TextInput from '../../components/Form/TextInput'
import Button from '../../components/UI/Button'
import RadioInput from '../../components/Form/RadioInput'
import ErrorText from '../../components/UI/ErrorText'
import LoadingSpinner from '../../components/UI/LoadingSpinner'

const RegisterPage = (props) => {
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
        },
        contactPerson: {
            value: '',
            isValid: false
        },
        contactNumber: {
            value: '',
            isValid: false
        }
    }, false)

    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

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
                role: role,
                contact_person: formState.inputs.contactPerson.value,
                contact_number: formState.inputs.contactNumber.value
            }),
            { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        ).then((responseData) => {
            auth.login(responseData.jwt, responseData.user.role, responseData.user.name, responseData.user.id, responseData.user.contact_person, responseData.user.contact_number)
            let redirectLink = '/dashboard/tambah-barang'

            if (responseData.user.role === 'DONATOR') {
                redirectLink = '/dashboard/donasi-saya'
            } else if (responseData.user.role === 'APPLICANT') {
                redirectLink = '/dashboard/riwayat-kebutuhan'
            }

            props.history.push(redirectLink)
        })
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form onSubmit={registerSubmit} className="flex items-center justify-center h-screen flex-col">
                <div className="flex flex-row items-center mb-3">
                    <VirusSVG />
                    <AuthTitle>Daftar</AuthTitle>
                </div>
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
                        isPassword={true}
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(8)]}
                        onInput={inputHandler}
                        errorText="Password minimal 8 karakter."
                    />

                    <TextInput
                        divClassName="w-4/5 lg:4/12"
                        id="confirmPassword"
                        isPassword={true}
                        label="Konfirmasi Password"
                        validators={[VALIDATOR_PASSWORD(formState.inputs.password.value)]}
                        onInput={inputHandler}
                        errorText="Password tidak cocok"
                    />
                </div>

                <div className="flex flex-col items-center lg:flex-row lg:justify-around w-full lg:px-48">
                    <TextInput
                        divClassName="w-4/5 lg:4/12 lg:mr-32"
                        id="contactPerson"
                        type="text"
                        label="Contact Person"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Masukkan contact person."
                    />

                    <TextInput
                        divClassName="w-4/5 lg:4/12"
                        type="tel"
                        id="contactNumber"
                        label="Kontak yang Bisa Dihubungi"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_TEL(), VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(14)]}
                        onInput={inputHandler}
                        errorText="Masukkan nomor yang dapat dihubungi dengan panjang minimal 10 dan maksimal 14 karakter."
                    />
                </div>

                <div className="flex flex-col w-4/5 lg:w-full lg:px-48">
                    <h2 className="text-gray-700 tracking-wide font-medium text-sm md:text-base mt-3">Daftar sebagai</h2>
                    <div className="flex flex-row">
                        <RadioInput
                            changed={radioChangeHandler}
                            id="donator"
                            isSelected={role === 'DONATOR'}
                            label="Donatur"
                            value="DONATOR" />

                        <RadioInput
                            changed={radioChangeHandler}
                            id="applicant"
                            isSelected={role === 'APPLICANT'}
                            label="Pemohon Bantuan"
                            value="APPLICANT" />
                    </div>
                </div>

                <Button
                    width={300}
                    type="submit"
                    disabled={!formState.isValid || !roleValid}>{isLoading ? <LoadingSpinner color="white" style={{ transform: 'translateY(-3px)' }} /> : 'DAFTAR'}</Button>

                {error && <ErrorText>{error}</ErrorText>}
                <Link to="/login" className="block mt-3 text-center text-xs md:text-sm font-semibold text-gray-700 tracking-wider hover:text-gray-600">Sudah punya akun? <span className="hover:underline">Login</span></Link>
            </form>
        </React.Fragment>
    )
}

export default RegisterPage