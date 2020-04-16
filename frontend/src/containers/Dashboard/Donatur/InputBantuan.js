import React, { useState, useContext, useEffect } from 'react'
import { links } from '../../../components/Dashboard/donaturLink'
import { AuthContext } from '../../../context/auth-context'
import { VALIDATOR_REQUIRE }from '../../../util/validator'
import { useForm } from '../../../hooks/form-hook'
import {useHttpClient} from '../../../hooks/http-hook'

import Sidebar from '../../../components/Dashboard/SideBar'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import ErrorModal from '../../../components/UI/ErrorModal'
import TextInput2 from '../../../components/Form/TextInput2'
import Button from '../../../components/UI/Button'
import Select2 from '../../../components/UI/Select2'

const InputBantuan = () => {
    const auth = useContext(AuthContext)
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [formState, inputHandler] = useForm({
        quantity: {
            value: '',
            isValid: false
        }
    }, false)

    const [check, setCheck] = useState(false)
    const [submit, setSubmit] = useState(false)

    const [donasi, setDonasi] = useState(
        {
            item_id: '',
            unit_id: ''
            // quantity: ''
            // sasaran: ''
        }
    )

    const [unitList, setUnitList] = useState([])
    const [itemList, setItemList] = useState([])

    useEffect(() => {
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
            'GET',
            null,
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            setUnitList(responseData)
            setDonasi(prevDonasi => ({
                ...prevDonasi,
                unit_id: responseData[0].id
            }))
        })

        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
            'GET',
            null,
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            setItemList(responseData)
            setDonasi(prevDonasi => ({
                ...prevDonasi,
                item_id: responseData[0].id
            }))

        })
    }, [auth.token, sendRequest])

    const changeItem = (item_id) => {
        setDonasi({
            ...donasi,
            item_id: item_id
        })
    }

    const changeUnit = (unit_id) => {
        setDonasi({
            ...donasi,
            unit_id: unit_id
        })
    }

    const submitHandler = () => {
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/donations`,
            'POST',
            JSON.stringify({
                donationItems: [
                    {
                        item_id: donasi.item_id,
                        unit_id: donasi.unit_id,
                        quantity: formState.inputs.quantity.value
                    }
                ]
            }),
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            console.log(responseData)
            if(responseData.id.length > 0){
                inputHandler("quantity", '', false)
                setSubmit(true)
                setCheck(true)
                flashMessage()
            }
            else{
                setSubmit(true)
                setCheck(false)
                flashMessage()
            }
        })
    }

    const flashMessage = () => {
        window.setTimeout(() => {
            setSubmit(false)
        }, 2000);
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className={`absolute right-0 p-2 rounded-bl-lg ${submit ? 'inline-block' : 'hidden'} ${check ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-800'}`}>
                <strong>{check ? 'Berhasil, donasi Anda berhasil disimpan!' : 'Terjadi error, silakan coba lagi!'}</strong>
            </div>
            <div className="p-8 py-4 block md:hidden md:text-left lg:pl-5 md:pl-3 inline-block bg-blue-700 rounded-r-lg">
                <h5 className="font-semibold text-md text-white">Dashboard Donatur </h5>
                <h2 className="font-semibold text-lg text-white">{auth.name}</h2>
            </div>
            <div className="flex flex-row h-full w-full">
                <Sidebar role="Donatur" name={auth.name} links={links} />

                <div>
                    <div className="flex w-full flex-col p-8 pb-4 md:p-10 md:pb-8">
                        <Title>Informasi Barang</Title>
                        <form className="md:flex md:flex-row md:items-center mt-4">
                            <div className="flex flex-col lg:flex-row w-full lg:mb-5 lg:border-none lg:shadow-none border-gray-700 rounded-md shadow-md lg:p-0 p-4 relative">
                                <Select2
                                    label="Jenis Barang"
                                    divClassName="mr-3 lg:w-6/12 w-full mt-2 lg:mt-0"
                                    list={ itemList }
                                    changeItem={ changeItem }
                                />
                                <TextInput2
                                    divClassName="lg:w-6/12 w-full lg:4/12 lg:mr-3"
                                    id="quantity"
                                    type="text"
                                    label="Kuantitas"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    changeUnit={ changeUnit }
                                    errorText="Mohon masukkan kuantitas barang."
                                    list={unitList}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="md:ml-16 ml-8">
                        <Button
                            width={200}
                            type="submit"
                            onClick={submitHandler}
                            disabled={!formState.isValid}>
                            {
                                isLoading ? <LoadingSpinner color="white" style={{transform: 'translateY(-3px)'}} /> : 'SUBMIT'
                            } 
                        </Button>
                    </div>
                </div>
            </div>  
        </React.Fragment>
    )
}

export default InputBantuan