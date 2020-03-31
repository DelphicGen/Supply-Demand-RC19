import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useForm} from '../../hooks/form-hook'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_PASSWORD} from '../../util/validator'

import TextInput from '../../components/Form/TextInput'
import Button from '../../components/UI/Button'
import RadioInput from '../../components/Form/RadioInput'

const RegisterPage = () => {
    const [role, setRole] = useState()
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

    const radioChangeHandler = (event) => {
        setRole(event.target.value)
    }

    return (
        <form className="flex items-center justify-center h-full flex-col">
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
                        id="donatur"
                        isSelected={role === 'donatur'}
                        label="Donatur"
                        value="donatur" />

                    <RadioInput
                        changed={radioChangeHandler}
                        id="pemohonbantuan"
                        isSelected={role === 'pemohonbantuan'}
                        label="Pemohon Bantuan"
                        value="pemohonbantuan" />
                </div>
            </div>

            <Button
                width={300}
                type="submit">DAFTAR</Button>
            <Link to="/login">Sudah punya akun? Login</Link>
        </form>
    )
}

export default RegisterPage