import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from '../../hooks/form-hook'
import { VALIDATOR_MINLENGTH } from '../../util/validator'

import ErrorModal from '../../components/UI/ErrorModal'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import VirusSVG from '../../components/UI/VirusSVG'
import AuthTitle from '../../components/UI/AuthTitle'
import TextInput from '../../components/Form/TextInput'
import Button from '../../components/UI/Button'

const NewPassword = () => {
    const confirmId = useParams().confirmId
    const [success, setSuccess] = useState()
    const [done, setDone] = useState(false)
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, inputHandler] = useForm({
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const resetPassword = (event) => {
        event.preventDefault()
        setIsLoading(true)
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/auth/reset/${confirmId}/confirm`, {
            method: 'PUT',
            body: JSON.stringify({
                newPassword: formState.inputs.password.value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            return res.text()
        }).then(text => {
            if (!text.length) {
                setSuccess('Password berhasil diubah.')
                setDone(true)
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
            <form onSubmit={resetPassword} className="flex items-center justify-center h-screen flex-col">
                <div className="flex flex-row items-center mb-3">
                    <VirusSVG />
                    <AuthTitle>Reset Password</AuthTitle>
                </div>

                <TextInput
                    id="password"
                    isPassword={true}
                    label="Password Baru"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    onInput={inputHandler}
                    errorText="Password minimal 8 karakter."
                    width={300}
                />

                {!success && !done ? <Button
                    width={300}
                    type="submit"
                    disabled={!formState.isValid}>
                    {isLoading ? <LoadingSpinner color="white" /> : 'RESET'}
                </Button> : 
                <Button to="/login">LOGIN</Button>
                }
            </form>
        </React.Fragment>
    )
}

export default NewPassword