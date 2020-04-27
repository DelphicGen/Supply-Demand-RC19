import React, { useState, useContext, useEffect, useCallback } from 'react'
import { links } from '../../../components/Dashboard/pemohonLink'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import { Update } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

import ErrorModal from '../../../components/UI/ErrorModal'
import Sidebar from '../../../components/Dashboard/SideBar'
import Table from '../../../components/Dashboard/Table'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'

const RiwayatPermohonan = () => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const history = useHistory()

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

    const update = useCallback((id) => {
        history.push(`/dashboard/update-kebutuhan/${id}`)
    }, [history])

    useEffect(() => {
        const fetchItems = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/requests/user/${auth.id}`,
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
            ).then(responseData => {
                if (responseData) {
                    let temp = []
                    if (responseData.data) {
                        responseData.data.forEach((data, index) => {
                            if (data.requestItems && data.donationApplicant.id === auth.id) {
                                if (data.requestItems.length === 1) {
                                    temp = [...temp, data.requestItems[0]]
                                    temp[temp.length - 1].requestId = responseData.data[index].id
                                    if (!responseData.data[index].isFulfilled) {
                                        temp[temp.length - 1].keterangan = (
                                            <div className="inline-block py-1 px-2 rounded-full text-red-800 bg-red-200 text-center">
                                                Belum diproses
                                            </div>
                                        )
                                    } else {
                                        temp[temp.length - 1].keterangan = (
                                            <div className="inline-block py-1 px-2 tracking-wide text-xs md:text-sm rounded-full text-green-500 bg-green-200 text-center">
                                                Sedang diproses
                                            </div>
                                        )
                                    }

                                } else {

                                    for (let i = 0; i < data.requestItems.length; i++) {
                                        temp = [...temp, data.requestItems[i]]
                                        temp[temp.length - 1].requestId = responseData.data[index].id
                                        if (!responseData.data[index].isFulfilled) {
                                            temp[temp.length - 1].keterangan = (
                                                <div className="inline-block py-1 px-2 rounded-full text-red-800 bg-red-200 text-center">
                                                    Belum diproses
                                                </div>
                                            )
                                        } else {
                                            temp[temp.length - 1].keterangan = (
                                                <div className="inline-block py-1 px-2 tracking-wide text-xs md:text-sm rounded-full text-green-500 bg-green-200 text-center">
                                                    Sedang diproses
                                                </div>
                                            )
                                        }
                                    }

                                }
                            }
                        })

                        temp.forEach((data) => {

                            data.update = (
                                <div className="inline py-1 pb-2 md:pb-1 px-3 rounded-lg bg-blue-800 cursor-pointer" onClick={() => update(data.requestId)}>
                                    <Update fontSize="small" className="text-gray-100" style={{ transform: 'scale(0.95)' }} />
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
    }, [auth.token, sendRequest, auth.id, update])

    let content = <LoadingSpinner />
    if (!isLoading) {
        if (dataTable.length > 0) {
            content = <Table columns={columns} data={dataTable} />
        } else {
            content = <p className="text-sm font-semibold">Anda belum mengajukan permohonan.</p>
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className="p-8 py-4 block md:hidden md:text-left lg:pl-5 md:pl-3 inline-block bg-blue-700 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg w-full sm:w-auto">
                <h5 className="font-semibold text-md text-white">Dashboard Pemohon</h5>
                <h2 className="font-semibold text-lg text-white">{auth.name}</h2>
            </div>
            <div className="flex flex-row">
                <Sidebar role="Pemohon" name={auth.name} links={links} />
                <div className="p-8 pb-24 md:p-16 w-full lg:w-11/12">
                    <Title>Permohonan Saya</Title>
                    <div className="h-3"></div>
                    {content}
                </div>
            </div>
        </React.Fragment>

    )
}


export default RiwayatPermohonan