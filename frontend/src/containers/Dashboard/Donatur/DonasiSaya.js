import React, { useMemo, useState, useContext, useEffect } from 'react'
import { links } from '../../../components/Dashboard/donaturLink'
import {AuthContext} from '../../../context/auth-context'
import {useHttpClient} from '../../../hooks/http-hook'
import {AddCircle} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Sidebar from '../../../components/Dashboard/SideBar'
import Table from '../../../components/Dashboard/Table'
import WhiteButton from '../../../components/UI/WhiteButton'
import Title from '../../../components/Dashboard/Title'
import UpdateDonasi from './UpdateDonasi'

const DonasiSaya = () => {
    const auth = useContext(AuthContext)
    const [name, setName] = useState(auth.name)
    const {isLoading, error, sendRequest} = useHttpClient()

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'no'
            },
            {
                Header: 'Nama Barang',
                accessor: 'item'
            },
            {
                Header: 'Stok',
                accessor: 'quantity'
            },
            {
                Header: 'Keterangan',
                accessor: 'keterangan'
            },
            {
                Header: 'Update',
                accessor: 'update'
            }
        ]       
    )

    const [dataTable, setDataTable] = useState([])
    const [selected, setSelected] = useState()

    useEffect(() => {
        const fetchItems = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/donations`,
                'GET',
                null,
                {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
            ).then(responseData => {
                console.log(responseData)
 
                if(responseData){
                    let temp = []
                    responseData.data.forEach(data => {
                        temp = [...temp, data.donationItems[0]]
                    })
                    temp.forEach((data, index) => data.donation_id = responseData.data[index].id)
                    temp.forEach((data, index) => {
                        if(responseData.data[index].isDonated){
                            return(
                                data.keterangan = (
                                    <div className="inline-block py-1 px-2 rounded-full text-red-600 bg-red-400">
                                        Habis
                                    </div>
                                )
                            )
                        } else{
                            return(
                                data.keterangan = (
                                    <div className="inline-block py-1 px-2 rounded-full text-green-600 bg-green-400">
                                        Ready
                                    </div>
                                )
                            )
                        }
                    })

                    temp.forEach(data => data.update = (
                        <Link to="/dashboard/donatur/donasi-saya/update">
                            <WhiteButton width={120} onClick={() => update(data)} >
                                <AddCircle className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">UPDATE</span>
                            </WhiteButton>
                        </Link>
                    ))

                    setDataTable(temp)
                }
            })
        }

        if(auth.token){
            fetchItems()
        }
    }, [auth.token, sendRequest])

    useEffect(() => {
        console.log(dataTable)
    }, [dataTable])

    const update = (data) => {
        setSelected(data)
    }

    return(
        <BrowserRouter>
             <Switch>
                <Route path="/dashboard/donatur/donasi-saya/update" exact render={() => <UpdateDonasi selected={selected} />}></Route>
            </Switch>
            <div className="flex items-center md:pt-0 pt-10 md:pb-0 pb-24">
                <Sidebar role="Donatur" name={name} links={links} />
                <div className="flex w-full flex-col p-8 md:p-16">
                    <Title>Donasi Saya</Title>
                    <Table columns={ columns } data={ dataTable } />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default DonasiSaya