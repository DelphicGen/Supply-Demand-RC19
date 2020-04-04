import React, {useEffect, useState, useContext} from 'react'
import {AddCircle, Delete} from '@material-ui/icons'
import {links} from '../../../components/Dashboard/adminLink'
import {AuthContext} from '../../../context/auth-context'
import {useForm} from '../../../hooks/form-hook'
import {useHttpClient} from '../../../hooks/http-hook'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_PASSWORD}from '../../../util/validator'


import Sidebar from '../../../components/Dashboard/SideBar'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import ErrorText from '../../../components/UI/ErrorText'
import Title from '../../../components/Dashboard/Title'
import WhiteButton from '../../../components/UI/WhiteButton'
import TextInput from '../../../components/Form/TextInput'
import Button from '../../../components/UI/Button'

const AlokasiBantuan = () => {

  const [pageSize, setPageSize] = useState()
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
        <div className="flex flex-row h-full w-full">

            {/* sidebar */}

            <Sidebar role="" name="ADMIN" links={links} />

            <div className="flex w-full flex-col p-8 md:p-16">
                <Title>Alokasikan Bantuan</Title>

                
                <form onSubmit={addItem} className="md:flex md:flex-row md:items-center mt-4">
                <div className="flex flex-col lg:flex-row w-full lg:mb-5">
                    <TextInput
                        divClassName="w-2/5 lg:4/12 lg:mr-3"
                        id="itemName"
                        type="text"
                        label="Lembaga Penerima"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Mohon masukkan nama barang."
                     />

                    <TextInput
                    divClassName="w-2/5 lg:4/12 "
                    id="itemName"
                    type="text"
                    label="Tanggal Penyerahan"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Mohon masukkan nama barang."
                   />

                  

                    

                </div>

                </form>
                

                <div className="flex flex-col lg:flex-row w-full lg:mb-5">
                  <TextInput
                    divClassName="w-2/5 lg:4/12 lg:mr-3"
                    id="itemName"
                    type="text"
                    label="Jenis Barang"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Mohon masukkan nama barang."
                  />

               

                    <TextInput
                    divClassName="w-1/5 lg:4/12 lg:mr-3"
                    id="itemName"
                    type="text"
                    label="Kuantitas"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Mohon masukkan nama barang."
                    />

                    <TextInput
                    divClassName="w-1/5 lg:4/12 lg:mr-3 lg:mt-6"
                    id="itemName"
                    type="text"
                    
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Mohon masukkan nama barang."
                   />

                   <select
                        className=" bg-gray-400 
                        mb-3 bg-gray-400 text-blue-700 p-2 rounded-md w-20 text-center"
                        style={{height:40}}
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                            {pageSize}
                            </option>
                        ))}
                        </select>

                
                
                </div>


                <div className="flex flex-col w-full lg:mb-5">
                  <TextInput
                    divClassName="w-2/5 lg:4/12 lg:mr-3"
                    id="itemName"
                    type="text"
                    label="Upload Foto Penyerahan"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Mohon masukkan nama barang."
                  />
                  <div>
                  <WhiteButton width={125} type="submit" className="md:mt-3">
                        {!isLoading ? 
                            <React.Fragment>
                                <AddCircle className="text-blue-800 mr-2" fontSize="inherit" /> <span className="text-sm pt-1">Upload</span>
                            </React.Fragment> : 
                            <LoadingSpinner style={{transform: 'translateY(-3px)'}} />
                        }
                    </WhiteButton>

                  </div>

                  <Button
                    width={200}
                  
                    type="submit"
                      >{isLoading ? <LoadingSpinner color="white" style={{transform: 'translateY(-3px)'}} /> : 'SUBMIT'} </Button>

                     

                </div>


                {/* Text-error */}
                {error && <ErrorText>{error}</ErrorText>}
            </div>

        </div>
    )
}

export default AlokasiBantuan