import React from 'react'
import {Link} from 'react-router-dom'
import {useForm} from '../../hooks/form-hook'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../util/validator'

import TextInput from '../../components/Form/TextInput'
import Button from '../../components/UI/Button'

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

    return (
        <form className="flex items-center justify-center h-full flex-col">
            <h1>Login</h1>
            <TextInput
                id="email"
                type="email"
                label="Email"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                onInput={inputHandler}
                errorText="Mohon masukkan email yang valid."
                width={250} />

            <TextInput
                id="password"
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Password minimal 8 karakter."
                width={250} />
            <Link to="/reset-password">Lupa password?</Link>

            <Button
                width={300}
                type="submit"
                disabled={!formState.isValid}>LOGIN</Button>
            <Link to="/daftar">Belum punya akun? Daftar</Link>
        </form>
    )
}

export default LoginPage