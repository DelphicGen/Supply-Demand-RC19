import React, {useEffect, useState} from 'react'
import {AddCircle} from '@material-ui/icons'
import {links} from '../../../components/Dashboard/adminLink'
import {useForm} from '../../../hooks/form-hook'
import {VALIDATOR_REQUIRE} from '../../../util/validator'

import Sidebar from '../../../components/Dashboard/SideBar'
import Title from '../../../components/Dashboard/Title'
import WhiteButton from '../../../components/UI/WhiteButton'
import TextInput from '../../../components/Form/TextInput'

const TambahBarang = () => {
    const [items, setItems] = useState([])
    const [formState, inputHandler, setFormData] = useForm({
        itemName: {
            value: '',
            isValid: false
        }
    }, false)

    useEffect(() => {
        console.log(formState.inputs.itemName)
    }, [formState])

    const addItem = event => {
        event.preventDefault()
        setItems(prevItem => prevItem.concat(formState.inputs.itemName.value))
        setFormData({
            ...formState.inputs,
            itemName: {
                value: '',
                isValid: false
            }
        }, false)
    }

    return(
        <div className="flex flex-row">
            <Sidebar role="" name="ADMIN" links={links} />
            <div className="p-8 md:p-16">
                <Title>Tambahkan Jenis Barang</Title>
                <form onSubmit={addItem} className="md:flex md:flex-row md:items-center">
                    <TextInput
                        className="md:mr-3"
                        id="itemName"
                        type="text"
                        label="Nama Barang"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        value={formState.inputs.itemName.value}
                        errorText="Mohon masukkan nama barang."
                        width={300} />
                    <WhiteButton width={125} type="submit" className="md:mt-3">
                        <AddCircle className="text-blue-800 mr-2" fontSize="inherit" /> <span className="text-sm pt-1">TAMBAH</span>
                    </WhiteButton>
                </form>
            </div>
        </div>
    )
}

export default TambahBarang