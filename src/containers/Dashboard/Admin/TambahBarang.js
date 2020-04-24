import React, {useEffect, useState, useContext, useCallback} from 'react'
import {AddCircle, Delete} from '@material-ui/icons'
import {links} from '../../../components/Dashboard/adminLink'
import {AuthContext} from '../../../context/auth-context'
import {useForm} from '../../../hooks/form-hook'
import {useHttpClient} from '../../../hooks/http-hook'
import {useMediaQuery} from '../../../hooks/medquery-hook'
import {VALIDATOR_REQUIRE} from '../../../util/validator'

import ErrorModal from '../../../components/UI/ErrorModal'
import Sidebar from '../../../components/Dashboard/SideBar'
import RadioInput from '../../../components/Form/RadioInput'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Title from '../../../components/Dashboard/Title'
import WhiteButton from '../../../components/UI/WhiteButton'
import TextInput from '../../../components/Form/TextInput'
import Table from '../../../components/Dashboard/Table'

const TambahBarang = () => {
    const columns = [
        {
            Header: 'No',
            accessor: 'no'
        },
        {
            Header: 'Nama Barang',
            accessor: 'name'
        },
        {
            Header: '',
            accessor: 'delete'
        }
    ]  
    const unitColumns = [
        {
            Header: 'No',
            accessor: 'no'
        },
        {
            Header: 'Satuan',
            accessor: 'name'
        },
        {
            Header: '',
            accessor: 'delete'
        }
    ]
    const mediaQuery = useMediaQuery('(max-width: 767px)')
    const [items, setItems] = useState([])
    const [units, setUnits] = useState([])
    const [itemPage, setItemPage] = useState(0)
    const [unitPage, setUnitPage] = useState(0)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(false)
	const [table, setTable] = useState('item')
    const [formState, inputHandler] = useForm({
        itemName: {
            value: '',
            isValid: false
        },
        unit: {
            value: '',
            isValid: false
        }
    }, false)
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const auth = useContext(AuthContext)

    const deleteItem = useCallback(id => {
        setDeleteLoading(true)
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${auth.token}`
            }
        }).then((res) => {
            return res.text()
        }).then(text => {
            if(!text.length){
                setItems(prevItem => prevItem.filter(item => item.id !== id))
            } else {
                setDeleteError('Maaf, barang tidak dapat dihapus karena masalah koneksi internet atau sedang digunakan dalam proses supply atau demand.')
            }
            setDeleteLoading(false)
        })
    }, [auth.token])

    const deleteUnit = useCallback(id => {
        setDeleteLoading(true)
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/units/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${auth.token}`
            }
        }).then((res) => {
            return res.text()
        }).then(text => {
            if(!text.length){
                setUnits(prevUnit => prevUnit.filter(unit => unit.id !== id))
            } else {
                setDeleteError('Maaf, satuan tidak dapat dihapus karena masalah koneksi internet atau sedang digunakan dalam proses supply atau demand.')
            }
            setDeleteLoading(false)
        }).catch(err => {
            setDeleteLoading(false)
        })
    }, [auth.token])

    useEffect(() => {
       const fetchItems = () => {
           sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
            'GET',
            null,
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
           ).then(responseData => {
               if(responseData){
                responseData.forEach(data => data.delete = (
                    <WhiteButton width={120} onClick={() => deleteItem(data.id)}>
                        <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
                    </WhiteButton>
                ))
                setItems(responseData)
               }
           })
       }

       if(auth.token){
            fetchItems()
       }
    }, [auth.token, sendRequest, deleteItem])

    useEffect(() => {
        const fetchUnits = () => {
            sendRequest(
             `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
             'GET',
             null,
             {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
            ).then(responseData => {
                if(responseData){
                 responseData.forEach(data => data.delete = (
                     <WhiteButton width={120} onClick={() => deleteUnit(data.id)}>
                         <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
                     </WhiteButton>
                 ))
                 setUnits(responseData)
                }
            })
        }
 
        if(auth.token){
             fetchUnits()
        }
     }, [auth.token, sendRequest, deleteUnit])

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
            setItemPage(items.length)
        })
    }

    const addUnit = event => {
        event.preventDefault()
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
            'POST',
            JSON.stringify({
                name: formState.inputs.unit.value
            }),
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            setUnits(prevUnit => prevUnit.concat({
                id: responseData.id,
                name: responseData.name,
                delete: (
                    <WhiteButton width={120} onClick={() => deleteUnit(responseData.id)}>
                        <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
                    </WhiteButton>
                )
            }))
            setUnitPage(units.length)
        })
    }
	
	const radioChangeHandler = (event) => {
        setTable(event.target.value)
    }

    const clearDeleteError = () => {
        setDeleteError(null)
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <ErrorModal error={deleteError} onClear={clearDeleteError} />
            <div className="flex flex-row">
                <Sidebar role="" name="ADMIN" links={links} />

                <div className="p-8 pb-20 md:p-12">
                    <Title>Tambahkan Jenis Barang atau Satuan</Title>
                    {table === 'item' && <form onSubmit={addItem} className="md:flex md:flex-row md:items-center">
                        <TextInput
                            className="md:mr-3"
                            id="itemName"
                            type="text"
                            label="Nama Barang"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                            customClear={styles.container(mediaQuery)}
                            dashboardWidth={styles2.container(mediaQuery)}
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
                    }

                    {table === 'unit' && <form onSubmit={addUnit} className="md:flex md:flex-row md:items-center">
                        <TextInput
                            className="md:mr-3"
                            id="unit"
                            type="text"
                            label="Satuan (Liter, Box, Botol, dll)"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                            customClear={styles.container(mediaQuery)}
                            dashboardWidth={styles2.container(mediaQuery)}
                            errorText="Mohon masukkan satuan."
                            width={300} />
                        <WhiteButton width={125} type="submit" className="md:mt-3">
                            {(isLoading || deleteLoading) ? 
                                <LoadingSpinner style={{transform: 'translateY(-3px)'}} /> :
                                <React.Fragment>
                                    <AddCircle className="text-blue-800 mr-2" fontSize="inherit" /> <span className="text-sm pt-1">TAMBAH</span>
                                </React.Fragment>
                            }
                        </WhiteButton>
                    </form>
                    }
                    
                    <div className="flex flex-row my-3">
                        <RadioInput
                            changed={radioChangeHandler}
                            id="item"
                            isSelected={table === 'item'}
                            label="Barang"
                            value="item" />

                        <RadioInput
                            changed={radioChangeHandler}
                            id="unit"
                            isSelected={table === 'unit'}
                            label="Satuan"
                            value="unit" />
                    </div>

                    {(items.length > 0 || units.length > 0) && (
                        <React.Fragment>
                            <Title>{`Daftar ${table === 'item' ? 'Barang' : 'Satuan'}`} </Title>
                            <div className="h-3"></div>
                            <Table columns={table === 'item' ? columns : unitColumns} data={table === 'item' ? items : units} pageToGo={table === 'item' ? itemPage : unitPage} />
                        </React.Fragment>
                    )}
                </div>

            </div>
        </React.Fragment>
    )
}

const styles = {
    container: mediaQuery => ({
        right: mediaQuery ? 8 : 18,
        top: 10
    })
}

const styles2 = {
    container: mediaQuery => ({
        width: mediaQuery ? 300 : 'auto'
    })
}

export default TambahBarang