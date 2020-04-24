import React, { useEffect, useState, useContext, useCallback } from 'react'
import { ArrowForward } from '@material-ui/icons'
import { links } from '../../../components/Dashboard/adminLink'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'

import ErrorModal from '../../../components/UI/ErrorModal'
import Sidebar from '../../../components/Dashboard/SideBar'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Title from '../../../components/Dashboard/Title'
import Table from '../../../components/Dashboard/Table'

const AlokasiBantuan = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [acceptError, setAcceptError] = useState()
    const auth = useContext(AuthContext)
    const columns = [
        {
            Header: 'No',
            accessor: 'no'
        },
        {
            Header: 'Tanggal',
            accessor: 'date'
        },
        {
            Header: 'Lembaga Pemohon',
            accessor: 'applicantName'
        },
        {
            Header: 'Barang Kebutuhan',
            accessor: data => {
                let output = []
                data.requestItems.map(request => output.push(request.item.name))
                return output.join(', ')
            }
        },
        {
            Header: 'Alokasi',
            accessor: 'allocate'
        }
    ]

    const [dataTable, setDataTable] = useState([])

    const allocate = useCallback((reqId) => {
        props.history.push(`/dashboard/alokasi/${reqId}`)
    }, [props.history])

    useEffect(() => {
        const fetchItems = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/requests?page=1&size=10000`,
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
            ).then(responseData => {
                if (responseData) {
                    console.log(responseData)
                    let temp = []
                    if (responseData.data) {
                        responseData.data.forEach(data => {
                            temp = [...temp, {
                                requestId: data.id,
                                applicantId: data.donationApplicant.id,
                                applicantName: data.donationApplicant.name,
                                requestItems: data.requestItems,
                                isFulfilled: data.isFulfilled
                            }]
                        })

                        temp.forEach((data, index) => {
                            let parsedDate = new Date(Date.parse(responseData.data[index].date))
                            let newDate = `${parsedDate.getDate()}/${('0' + (parsedDate.getMonth() + 1)).slice(-2)}/${parsedDate.getFullYear()}`
                            data.date = newDate
                        })

                        temp.forEach((data) => {
                            data.allocate = (
                                <div className="inline py-1 px-3 rounded-lg bg-blue-800 cursor-pointer" onClick={() => allocate(data.requestId)}>
                                    <ArrowForward fontSize="small" className="text-gray-100 border-2 border-solid border-gray-100 rounded-full" style={{ transform: 'scale(0.8)' }} />
                                </div>
                            )
                        })
                        const filteredData = temp.filter(tmp => tmp.requestItems && !tmp.isFulfilled)
                        setDataTable(filteredData)
                    }
                }
            })
        }

        if (auth.token) {
            fetchItems()
        }
    }, [auth.token, sendRequest, allocate])

    const clearAcceptError = () => {
        setAcceptError(null)
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <ErrorModal error={acceptError} onClear={clearAcceptError} />
            <div className="flex flex-row">
                <Sidebar role="" name="ADMIN" links={links} />

                <div className="p-8 pb-24 md:p-12 w-full lg:w-11/12">
                    <Title>Alokasi Bantuan</Title>
                    <div className="h-3"></div>
                    {isLoading && dataTable.length === 0 ?
                        <LoadingSpinner /> :
                        <Table columns={columns} data={dataTable} />
                    }
                </div>

            </div>
        </React.Fragment>
    )
}

export default AlokasiBantuan