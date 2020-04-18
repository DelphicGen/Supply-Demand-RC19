import React, {useState} from 'react'
import { useForm } from '../../hooks/form-hook'
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../util/validator'

import ErrorModal from '../../components/UI/ErrorModal'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import VirusSVG from '../../components/UI/VirusSVG'
import AuthTitle from '../../components/UI/AuthTitle'
import TextInput from '../../components/Form/TextInput'
import Button from '../../components/UI/Button'

const ResetPass = () => {
    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        }
    }, false)

    const submitReset = (event) => {
        event.preventDefault()
        setIsLoading(true)
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/auth/reset`, {
            method: 'POST',
            body: JSON.stringify({
                email: formState.inputs.email.value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            return res.text()
        }).then(text => {
            if (!text.length) {
                setSuccess('Silakan cek email Anda untuk mendapatkan link reset password.')
            } else {
                setError('Maaf, terjadi galat. Silakan coba lagi')
            }
            setIsLoading(false)
        })
    }

    const clearModal = () => {
        setError(null)
        setSuccess(null)
    }

    return (
            <React.Fragment>
                <ErrorModal error={error ? error : success} onClear={clearModal} />
                <form onSubmit={submitReset} className="flex items-center justify-center h-screen flex-col">
                    <div className="flex flex-row items-center mb-3">
                        <VirusSVG />
                        <AuthTitle>Konfirmasi Email</AuthTitle>
                    </div>

                    <TextInput
                        id="email"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                        errorText="Mohon masukkan email yang valid."
                        width={300} />

                    <Button
                        width={300}
                        type="submit"
                        disabled={!formState.isValid}>
                        {isLoading ? <LoadingSpinner color="white" /> : 'KONFIRMASI'}
                    </Button>
                </form>
            </React.Fragment>
        )
    }

    export default ResetPass