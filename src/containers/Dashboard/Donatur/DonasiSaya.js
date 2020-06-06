import React, { useState, useContext, useEffect, useCallback } from 'react'
import { links } from '../../../components/Dashboard/donaturLink'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import { Update, Delete } from '@material-ui/icons'
import ReactTooltip from 'react-tooltip'

import ErrorModal from '../../../components/UI/ErrorModal'
import Sidebar from '../../../components/Dashboard/SideBar'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Table from '../../../components/Dashboard/Table'
import Title from '../../../components/Dashboard/Title'

const DonasiSaya = (props) => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const requestError = error && 'Gagal memuat data, silakan coba lagi.'
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(false)

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
                let quantity = data.quantity % 1 === 0 ? Math.round(data.quantity) : data.quantity
                output.push(`${quantity} ${data.unit.name}`)
                return output.join(', ')
            }
        },
        {
            Header: 'Aksi',
            accessor: 'action'
        }
    ]

    const [dataTable, setDataTable] = useState([])

    const update = useCallback((donationId) => {
        props.history.push(`/dashboard/update-donasi/${donationId}`)
    }, [props.history])

    const deleteDonation = useCallback(id => {
        setDeleteLoading(true)
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/donations/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            }
        }).then((res) => {
            return res.text()
        }).then(text => {
            if (!text.length) {
                setDataTable(prevData => prevData.filter(data => data.donation_id !== id))
            } else {
                setDeleteError('Maaf, barang ini sudah dikonfirmasi admin sehingga tidak bisa dihapus.')
            }
            setDeleteLoading(false)
        })
    }, [auth.token])

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
                    if (responseData.data) {
                        responseData.data.forEach((data, index) => {
                            if (data.donationItems && data.donator.id === auth.id) {
                                if (data.donationItems.length === 1) {

                                    temp = [...temp, data.donationItems[0]]
                                    temp[temp.length - 1].donation_id = responseData.data[index].id
                                    temp[temp.length - 1].isAccepted = responseData.data[index].isAccepted
                                    temp[temp.length - 1].isDonated = responseData.data[index].isDonated

                                    // if (responseData.data[index].isDonated) {
                                    //     temp[temp.length - 1].keterangan = (
                                    //         <div className="inline-block py-1 px-2 rounded-full text-red-800 bg-red-200">
                                    //             Habis
                                    //         </div>
                                    //     )
                                    // } else {
                                    //     if (responseData.data[index].isAccepted) {
                                    //         temp[temp.length - 1].keterangan = (
                                    //             <div className="inline-block py-1 px-2 tracking-wide text-xs md:text-sm rounded-full text-green-500 bg-green-200">
                                    //                 Ready
                                    //             </div>
                                    //         )
                                    //     } else {
                                    //         temp[temp.length - 1].keterangan = (
                                    //             <div className="inline-block py-1 px-2 tracking-wide text-xs md:text-sm rounded-full text-center text-orange-500 bg-orange-200">
                                    //                 Belum terkonfirmasi
                                    //             </div>
                                    //         )
                                    //     }
                                    // }

                                } else {

                                    for (let i = 0; i < data.donationItems.length; i++) {
                                        temp = [...temp, data.donationItems[i]]
                                        temp[temp.length - 1].donation_id = responseData.data[index].id
                                        temp[temp.length - 1].isAccepted = responseData.data[index].isAccepted
                                        temp[temp.length - 1].isDonated = responseData.data[index].isDonated
                                        // if (responseData.data[index].isDonated) {
                                        //     temp[temp.length - 1].keterangan = (
                                        //         <div className="inline-block py-1 px-2 rounded-full text-red-800 bg-red-200">
                                        //             Habis
                                        //         </div>
                                        //     )
                                        // } else {
                                        //     if (responseData.data[index].isAccepted) {
                                        //         temp[temp.length - 1].keterangan = (
                                        //             <div className="inline-block py-1 px-2 tracking-wide text-xs md:text-sm rounded-full text-green-500 bg-green-200">
                                        //                 Ready
                                        //             </div>
                                        //         )
                                        //     } else {
                                        //         temp[temp.length - 1].keterangan = (
                                        //             <div className="inline-block py-1 px-2 tracking-wide text-xs md:text-sm rounded-full text-center text-orange-500 bg-orange-200">
                                        //                 Belum terkonfirmasi
                                        //             </div>
                                        //         )
                                        //     }
                                        // }
                                    }

                                }
                            }
                        })

                        temp.forEach((data) => {

                            data.action = (
                                <div className="flex flex-row">
                                    <div data-tip data-for="update" className="inline py-1 pb-2 md:pb-1 px-3 mr-2 rounded-lg bg-blue-800 cursor-pointer" onClick={() => update(data.donation_id)}>
                                        <Update fontSize="small" className="text-gray-100" style={{ transform: 'scale(0.95)' }} />
                                    </div>
                                    <ReactTooltip id="update">
                                        <span className="text-xs md:text-sm">Update</span>
                                    </ReactTooltip>

                                    <div data-tip data-for="delete" className="inline py-1 pb-2 md:pb-1 px-3 rounded-lg bg-blue-800 cursor-pointer" onClick={() => deleteDonation(data.donation_id)}>
                                        <Delete fontSize="small" className="text-gray-100" style={{ transform: 'scale(0.95)' }} />
                                    </div>
                                    <ReactTooltip id="delete">
                                        <span className="text-xs md:text-sm">Hapus</span>
                                    </ReactTooltip>
                                </div>
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
    }, [auth.token, sendRequest, auth.id, update, deleteDonation])

    let content = <LoadingSpinner />
    if (!isLoading) {
        if (dataTable.length > 0) {
            content = <Table columns={columns} data={dataTable} donasi={true} />
        } else {
            content = <p className="text-sm font-semibold text-gray-800">Anda belum melakukan donasi.</p>
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={requestError} onClear={clearError} />
            <ErrorModal error={deleteError} onClear={() => setDeleteError(false)} />
            <div className="p-8 py-4 block md:hidden md:text-left lg:pl-5 md:pl-3 inline-block bg-blue-700 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg w-full sm:w-auto">
                <h5 className="font-semibold text-base text-white">Dashboard Donatur</h5>
                <h2 className="font-semibold text-lg text-white">{auth.name}</h2>
            </div>
            <div className="flex flex-row">
                <Sidebar role="Donatur" name={auth.name} links={links} />
                <div className="p-8 pb-24 md:p-12 pl-2 pr-2 w-full lg:w-11/12">
                    <div className="flex flex-row">
                        <Title>Donasi Saya</Title>
                        {deleteLoading && <LoadingSpinner />}
                    </div>
                    <div className="h-2"></div>
                    {content}
                </div>
            </div>
        </React.Fragment>
    )
}

export default DonasiSaya