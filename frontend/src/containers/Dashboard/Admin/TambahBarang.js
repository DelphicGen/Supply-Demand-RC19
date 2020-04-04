import React, {useEffect, useState, useContext} from 'react'
import {AddCircle, Delete} from '@material-ui/icons'
import {links} from '../../../components/Dashboard/adminLink'
import {AuthContext} from '../../../context/auth-context'
import {useForm} from '../../../hooks/form-hook'
import {useHttpClient} from '../../../hooks/http-hook'
import {VALIDATOR_REQUIRE} from '../../../util/validator'

import Sidebar from '../../../components/Dashboard/SideBar'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import ErrorText from '../../../components/UI/ErrorText'
import Title from '../../../components/Dashboard/Title'
import WhiteButton from '../../../components/UI/WhiteButton'
import TextInput from '../../../components/Form/TextInput'
import Table from '../../../components/Dashboard/Table'

const TambahBarang = () => {
    const columns = [
        {
            Header: 'No',
            accessor: 'id'
        },
        {
            Header: 'Nama Barang',
            accessor: 'item'
        },
        {
            Header: '',
            accessor: 'delete'
        }
    ]  
    const [items, setItems] = useState([])
    const [formState, inputHandler] = useForm({
        itemName: {
            value: '',
            isValid: false
        }
    }, false)
    const {isLoading, error, sendRequest} = useHttpClient()
    const auth = useContext(AuthContext)

    useEffect(() => {
       const fetchItems = () => {
           sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
            'GET',
            null,
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
           ).then(responseData => {
               setItems(responseData)
           })
       }
       fetchItems()
    }, [auth.token, sendRequest])

    const deleteItem = id => {
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/items/${id}`,
            'DELETE',
            null,
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(() => setItems(prevItem => prevItem.filter(item => item.id !== id)))
        // setItems(prevItem => prevItem.filter(item => item.id !== id))
    }

    const addItem = event => {
        event.preventDefault()
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
            'POST',
            JSON.stringify({
                name: formState.inputs.itemName.value
            }),
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            setItems(prevItem => prevItem.concat({
                id: responseData.id,
                name: responseData.name,
                delete: (
                    <WhiteButton width={120} onClick={() => deleteItem(responseData.id)}>
                        <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
                    </WhiteButton>
                )
            }))
        })
        // setItems(prevItem => prevItem.concat({
        //     id: prevItem.length + 1, 
        //     item: formState.inputs.itemName.value, 
        //     delete: (
        //         <WhiteButton width={120} onClick={() => deleteItem(prevItem.length + 1)}>
        //             <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
        //         </WhiteButton>
        //     )
        // }))
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
                        errorText="Mohon masukkan nama barang."
                        width={300} />
                    <WhiteButton width={125} type="submit" className="md:mt-3">
                        {!isLoading ? 
                            <React.Fragment>
                                <AddCircle className="text-blue-800 mr-2" fontSize="inherit" /> <span className="text-sm pt-1">TAMBAH</span>
                            </React.Fragment> : 
                            <LoadingSpinner style={{transform: 'translateY(-3px)'}} />
                        }
                    </WhiteButton>
                </form>
                <Table columns={ columns } data={ items } />
                {error && <ErrorText>{error}</ErrorText>}
            </div>

        </div>
    )
}

export default TambahBarang