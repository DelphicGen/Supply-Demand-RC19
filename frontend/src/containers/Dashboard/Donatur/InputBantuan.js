import React, { useState, useContext, useEffect } from 'react'
import { links } from '../../../components/Dashboard/donaturLink'
import { AuthContext } from '../../../context/auth-context'
import { VALIDATOR_REQUIRE }from '../../../util/validator'
import { useForm } from '../../../hooks/form-hook'
import { AddCircle, Delete } from '@material-ui/icons';
import {useHttpClient} from '../../../hooks/http-hook'
import { useMediaQuery } from '../../../hooks/medquery-hook';

import Sidebar from '../../../components/Dashboard/SideBar'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import WhiteButton from '../../../components/UI/WhiteButton'
import TextInput from '../../../components/Form/TextInput'
import TextInput2 from '../../../components/Form/TextInput2'
import Button from '../../../components/UI/Button'
import Select2 from '../../../components/UI/Select2'

const InputBantuan = () => {
    const auth = useContext(AuthContext)
    const [name, setName] = useState(auth.name)
    const mediaQuery = useMediaQuery('(min-width: 768px)')
    const {isLoading, error, sendRequest} = useHttpClient()
    const [formState, inputHandler] = useForm({
        quantity: {
            value: '',
            isValid: false
        }
    }, false)

    const [donatur, setDonatur] = useState({
        name: '',
        nomor: ''
    })

    const [donasi, setDonasi] = useState(
        {
            item_id: '',
            unit_id: '',
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
            console.log(responseData)
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
            console.log(responseData)
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

    useEffect(() => {
        console.log(donasi)
        console.log(formState)
    }, [donasi])

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
            inputHandler("quantity", '', false)
        })
    }

    return(
        <React.Fragment>
            
         <div className="p-8 py-4 block md:hidden md:text-left lg:pl-5 md:pl-3 inline-block bg-blue-700 rounded-r-lg">
            <h5 className="font-semibold text-md text-white">{`Dashboard Donatur`} </h5>
            <h2 className="font-semibold text-lg text-white">{name}</h2>
         </div>
            <div className="flex flex-row h-full w-full">
                <Sidebar role="Donatur" name={name} links={links} />

                <div>
                    {/* Kata Mas Gavin bagian ini tidak usah */}
                    {/* <div className="flex w-full flex-col pl-8 md:p-16">
                        <Title>Informasi Donatur</Title>
                        <form className="md:flex md:flex-row md:items-center mt-4">
                            <div className="flex flex-col lg:flex-row w-full lg:mb-5">
                                <TextInput
                                    divClassName="w-2/5 lg:4/12 lg:mr-3"
                                    id="namaKontak"
                                    type="text"
                                    label="Nama Kontak"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    errorText="Mohon masukkan nama barang."
                                />

                                <TextInput
                                    divClassName="w-2/5 lg:4/12 "
                                    id="nomorKontak"
                                    type="text"
                                    label="Nomor Kontak"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    errorText="Mohon masukkan nama barang."
                                />

                            </div>
                        </form>
                    </div> */}

                    <div className="flex w-full flex-col p-8 md:p-16">
                        <Title>Informasi Barang</Title>
                        <form className="md:flex md:flex-row md:items-center mt-4">
                            <div className="flex flex-col lg:flex-row w-full lg:mb-5 lg:border-none lg:shadow-none border-gray-700 rounded-md shadow-md lg:p-0 p-4 relative">
                                {/* <div className="lg:hidden inline-block ml-auto mr-0 absolute right-0">
                                    <Delete className="text-gray-500" />
                                </div> */}
                                <Select2
                                    label="Jenis Barang"
                                    divClassName="mr-3 lg:w-6/12 w-full mt-2 lg:mt-0    "
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

                                {/* <TextInput
                                    divClassName="w-4/12 lg:4/12 "
                                    id="sasaran"
                                    type="text"
                                    label="Sasaran"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    errorText="Mohon masukkan sasaran donasi."
                                /> */}
                                {/* <div className="lg:inline-block hidden">
                                    <Delete style={styles.container(mediaQuery)} className="text-gray-500" fontSize="large" />
                                </div> */}
                            </div>
                        </form>
                    </div>

                    {/* <WhiteButton width={125} type="submit" className="md:mt-1 md:ml-16 ml-8">
                        <AddCircle className="text-blue-800 mr-2" fontSize="inherit" /> <span className="text-sm pt-1">Tambah</span>
                    </WhiteButton> */}

                    <div className="md:ml-16 ml-8">
                        <Button
                            width={200}
                            type="submit"
                            onClick={submitHandler}
                            disabled={!formState.isValid}>
                        >
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

const styles = {
    container: mediaQuery => ({
      marginTop: mediaQuery && '35px'
    })
 };

export default InputBantuan