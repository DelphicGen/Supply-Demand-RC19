import React from 'react'
import {useForm} from '../../hooks/form-hook'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../util/validator'

import TextInput from '../../components/Form/TextInput'
import Button from '../../components/UI/Button'

const ResetPass = () => {
    const [formState, inputHandler] = useForm({
        password: {
            value: '',
            isValid: false
        }
    }, false)

    return (
        <form className="flex items-center justify-center h-full flex-col">
            <h1>Reset Password</h1>

            <TextInput
                id="password"
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Password minimal 8 karakter."
                width={300} />

            <Button
                width={300}
                type="submit"
                disabled={!formState.isValid}>RESET</Button>
        </form>
    )
}

export default ResetPass