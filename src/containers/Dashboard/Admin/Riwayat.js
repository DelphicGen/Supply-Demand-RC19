import React, { useEffect, useState, useContext } from 'react'
import { links } from '../../../components/Dashboard/adminLink'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'

import ErrorModal from '../../../components/UI/ErrorModal'
import Sidebar from '../../../components/Dashboard/SideBar'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Title from '../../../components/Dashboard/Title'
import Table from '../../../components/Dashboard/Table'

const Riwayat = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
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
            Header: 'Donatur',
            accessor: 'allocator'
        },
        {
            Header: 'Lembaga Pemohon',
            accessor: 'applicant'
        },
        {
            Header: 'Barang Bantuan',
            accessor: data => data.item[0].item.name
        },
        {
            Header: 'Kuantitas',
            accessor: data => {
                let quantity = data.item[0].quantity % 1 === 0 ? Math.round(data.item[0].quantity) : data.item[0].quantity
                return `${quantity} ${data.item[0].unit.name}`
            }
        }
    ]

    const [dataTable, setDataTable] = useState([])

    useEffect(() => {
        const fetchAllocation = () => {
            sendRequest(
                'https://api.pedulicorona.site/api/v1/allocations',
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
            ).then(responseData => {
                if (responseData) {
                    let temp = []
                    if (responseData.data) {
                        responseData.data.forEach(data => {
                            temp = [...temp, {
                                allocator: data.allocator.name,
                                applicant: data.request.donationApplicant.name,
                                item: data.items
                            }]
                        })

                        temp.forEach((data, index) => {
                            let parsedDate = new Date(Date.parse(responseData.data[index].date))
                            let newDate = `${parsedDate.getDate()}/${('0' + (parsedDate.getMonth() + 1)).slice(-2)}/${parsedDate.getFullYear()}`
                            data.date = newDate
                        })
                        setDataTable(temp)
                    }
                }
            })
        }

        if (auth.token) {
            fetchAllocation()
        }
    }, [auth.token, sendRequest])

    let content = <LoadingSpinner />
    if (!isLoading) {
        if (dataTable.length === 0) {
            content = <p className="text-sm font-semibold text-gray-800">Belum ada donasi yang dialokasikan.</p>
        } else {
            content = <Table columns={columns} data={dataTable} />
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className="flex flex-row">
                <Sidebar role="Admin" name={auth.name} links={links} />

                <div className="p-8 pb-24 md:p-12 w-full lg:w-11/12">
                    <Title>Riwayat Alokasi</Title>
                    <div className="h-3"></div>
                    {content}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Riwayat