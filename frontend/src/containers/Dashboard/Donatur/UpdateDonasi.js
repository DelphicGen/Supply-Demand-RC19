import React, { useState, useContext, useEffect } from 'react'
import { links } from '../../../components/Dashboard/donaturLink'
import { AuthContext } from '../../../context/auth-context'
import { VALIDATOR_REQUIRE } from '../../../util/validator'
import { useForm } from '../../../hooks/form-hook'
import { useHttpClient } from '../../../hooks/http-hook'
import { useHistory } from 'react-router-dom'

import Sidebar from '../../../components/Dashboard/SideBar'
import ErrorModal from '../../../components/UI/ErrorModal'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import TextInput2 from '../../../components/Form/TextInput2'
import Button from '../../../components/UI/Button'
import Select2 from '../../../components/UI/Select2'

const UpdateDonasi = (props) => {
    let data = JSON.parse(localStorage.getItem('selected'))
    const auth = useContext(AuthContext)
    let history = useHistory()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [formState, inputHandler] = useForm({
        quantity: {
            value: data.quantity,
            isValid: true
        }
    }, false)

    const [donasi, setDonasi] = useState(
        {
            item_id: '',
            unit_id: ''
        }
    )

    const [unitList, setUnitList] = useState([])
    const [itemList, setItemList] = useState([])
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    const [selectedUnitIndex, setSelectedUnitIndex] = useState(0)

    useEffect(() => {
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
            'GET',
            null,
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            setUnitList(responseData)
        })

        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
            'GET',
            null,
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            setItemList(responseData)
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

    useEffect(() => {
        console.log(itemList)
        let x
        let i
        for ([i, x] of itemList.entries()) {
            if (x.name === data.item) {
                setDonasi({
                    ...donasi,
                    item_id: x.id
                })
                setSelectedItemIndex(i)
                break;
            }
        }


    }, [itemList])

    useEffect(() => {
        let x
        let i
        for ([i, x] of unitList.entries()) {
            if (x.name === data.unit) {
                setDonasi({
                    ...donasi,
                    unit_id: x.id
                })
                setSelectedUnitIndex(i)
                break
            }
        }
    }, [unitList])

    const submitHandler = () => {
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/donations`,
            'PUT',
            JSON.stringify({
                donationItems: [
                    {
                        id: data.id,
                        donation_id: data.donation_id,
                        item_id: donasi.item_id,
                        unit_id: donasi.unit_id,
                        quantity: formState.inputs.quantity.value
                    }
                ]
            }),
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            console.log(responseData)
            history.goBack()
        })
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className="flex flex-row h-full w-full">
                <Sidebar role="Donatur" name={auth.name} links={links} />

                <div>
                    <div className="flex w-full flex-col p-8 md:p-16">
                        <Title>Informasi Barang</Title>
                        <form className="md:flex md:flex-row md:items-center mt-4">
                            <div className="flex flex-col lg:flex-row w-full lg:mb-5 lg:border-none lg:shadow-none border-gray-700 rounded-md shadow-md lg:p-0 p-4 relative">
                                <Select2
                                    label="Jenis Barang"
                                    divClassName="mr-3 lg:w-6/12 w-full mt-2 lg:mt-0"
                                    list={itemList}
                                    changeItem={changeItem}
                                    selectedIndex={selectedItemIndex}
                                />
                                <TextInput2
                                    divClassName="lg:w-6/12 w-full lg:4/12 lg:mr-3"
                                    id="quantity"
                                    type="text"
                                    label="Kuantitas"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    changeUnit={changeUnit}
                                    errorText="Mohon masukkan kuantitas barang."
                                    list={unitList}
                                    value={formState.inputs.quantity.value}
                                    selectedIndex={selectedUnitIndex}
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
                                isLoading ? <LoadingSpinner color="white" style={{ transform: 'translateY(-3px)' }} /> : 'SUBMIT'
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UpdateDonasi