import React, { useState, useContext, useEffect } from 'react'
import { links } from '../../../components/Dashboard/donaturLink'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import { AddCircle } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from '../../../hooks/medquery-hook';

import ErrorModal from '../../../components/UI/ErrorModal'
import Sidebar from '../../../components/Dashboard/SideBar'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Table from '../../../components/Dashboard/Table'
import WhiteButton from '../../../components/UI/WhiteButton'
import Title from '../../../components/Dashboard/Title'

const DonasiSaya = (props) => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const requestError = error && 'Gagal memuat data, silakan coba lagi.'
    const history = useHistory()
    const mediaQuery = useMediaQuery('(max-width: 600px)')

    const columns = [
        {
            Header: 'No',
            accessor: 'no'
        },
        {
            Header: 'Nama Barang',
            accessor: data => {
                let output = []
                    output.push(data.item.name)
                return output.join(', ')
            }
        },
        {
            Header: 'Stok',
            accessor: data => {
                let output = []
                    output.push(`${Math.round(data.quantity)} ${data.unit.name}`)
                return output.join(', ')
            }
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

    const [dataTable, setDataTable] = useState([])

    useEffect(() => {
        const fetchItems = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/donations/user/${auth.id}?page=1&size=10000`,
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
            ).then(responseData => {
                if (responseData) {
                    let temp = []
                    if (responseData.data){
                        responseData.data.forEach((data, index) => {
                            if (data.donationItems && data.donator.id === auth.id) {
                                if(data.donationItems.length === 1){

                                    temp = [...temp, data.donationItems[0]]
                                    temp[temp.length-1].donation_id = responseData.data[index].id
                                    if (responseData.data[index].isDonated) {
                                        temp[temp.length-1].keterangan = (
                                            <div className="inline-block py-1 px-2 rounded-full text-red-800 bg-red-200">
                                                Habis
                                            </div>
                                        )
                                    } else {
                                        temp[temp.length-1].keterangan = (
                                            <div className="inline-block py-1 px-2 tracking-wide text-xs md:text-sm rounded-full text-green-500 bg-green-200">
                                                Ready
                                            </div>
                                        )
                                    }

                                } else {

                                    for(let i = 0; i < data.donationItems.length; i++){
                                        temp = [...temp, data.donationItems[i]]
                                        temp[temp.length-1].donation_id = responseData.data[index].id
                                        if (responseData.data[index].isDonated) {
                                            temp[temp.length-1].keterangan = (
                                                <div className="inline-block py-1 px-2 rounded-full text-red-800 bg-red-200">
                                                    Habis
                                                </div>
                                            )
                                        } else {
                                            temp[temp.length-1].keterangan = (
                                                <div className="inline-block py-1 px-2 tracking-wide text-xs md:text-sm rounded-full text-green-500 bg-green-200">
                                                    Ready
                                                </div>
                                            )
                                        }
                                    }

                                }
                            }
                        })

                        temp.forEach((data) => {

                            data.update = (
                                <WhiteButton width={120} onClick={() => update(data.donation_id)} donasi={true} >
                                    <AddCircle className="text-blue-800 mr-2 text-sm" style={styles.container(mediaQuery)} /><span style={styles2.container(mediaQuery)} className="text-sm">UPDATE</span>
                                </WhiteButton>
                            )
                        })

                        setDataTable(temp)
                    }
                }
            })
        }

        if (auth.token) {
            fetchItems()
        }
    }, [auth.token, sendRequest])

    const update = (donationId) => {
        props.history.push(`/dashboard/update-donasi/${donationId}`)
    }

    let content = <LoadingSpinner />
    if (!isLoading) {
        if (dataTable.length > 0) {
            content = <Table columns={columns} data={dataTable} donasi={true} />
        } else {
            content = <p className="text-sm font-semibold">Anda belum melakukan donasi.</p>
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={requestError} onClear={clearError} />
            <div className="p-8 py-4 block md:hidden md:text-left lg:pl-5 md:pl-3 inline-block bg-blue-700 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg w-full sm:w-auto">
                <h5 className="font-semibold text-md text-white">Dashboard Donatur</h5>
                <h2 className="font-semibold text-lg text-white">{auth.name}</h2>
            </div>
            <div className="flex flex-row">
                <Sidebar role="Donatur" name={auth.name} links={links} />
                <div className="p-8 pb-24 md:p-12 pl-2 pr-2 w-full lg:w-11/12">
                    <Title>Donasi Saya</Title>
                    <div className="h-2"></div>
                    {content}
                </div>
            </div>
        </React.Fragment>
    )
}

const styles = {
    container: mediaQuery => ({
        fontSize: mediaQuery ? '15' : '25'
    })
};

const styles2 = {
    container: mediaQuery => ({
        fontSize: mediaQuery && '10px'
    })
};

export default DonasiSaya