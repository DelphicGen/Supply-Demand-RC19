import React, { useEffect, useState, useContext } from 'react'
import { ArrowForward } from '@material-ui/icons'
import { links } from '../../../components/Dashboard/adminLink'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import { useMediaQuery } from '../../../hooks/medquery-hook'

import ErrorModal from '../../../components/UI/ErrorModal'
import Sidebar from '../../../components/Dashboard/SideBar'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Title from '../../../components/Dashboard/Title'
import Button from '../../../components/UI/Button'
import Table from '../../../components/Dashboard/Table'

const KonfirmasiDonasi = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [acceptLoading, setAcceptLoading] = useState(false)
    const [acceptError, setAcceptError] = useState()
    const auth = useContext(AuthContext)
    const columns = [
        {
            Header: 'No',
            accessor: 'no'
        },
        {
            Header: 'Tanggal Donasi',
            accessor: 'date'
        },
        {
            Header: 'Donatur',
            accessor: 'donator'
        },
        {
            Header: 'Nama Barang',
            accessor: data => {
                let output = []
                data.donationItems.map(donation => {
                    output.push(donation.item)
                })
                return output.join(', ')
            }
        },
        {
            Header: 'Stok',
            accessor: data => {
                let output = []
                data.donationItems.map(donation => {
                    output.push(donation.quantity)
                })
                return output.join(', ')
            }
        },
        {
            Header: '',
            accessor: 'confirm'
        }
    ]

    const [dataTable, setDataTable] = useState([])

    const confirm = (donationId) => {
        setAcceptLoading(true)
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/donations/${donationId}/accept`, {
            method: 'PUT',
            body: null,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            }
        }).then((res) => {
            return res.text()
        }).then(text => {
            if (!text.length) {
                setDataTable(prevData => prevData.filter(data => data.donation_id !== donationId))
                setAcceptLoading(false)
            } else {
                setAcceptError('Gagal mengkonfirmasi donasi. Silakan coba lagi')
                setAcceptLoading(false)
            }
        })
    }

    useEffect(() => {
        const fetchItems = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/donations?page=1&size=10000`,
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
            ).then(responseData => {
                if (responseData) {
                    let temp = []
                    if (responseData.data) {
                        responseData.data.forEach(data => {
                            temp = [...temp, { donationItems: data.donationItems }]
                        })
                        temp.forEach((data, index) => {
                            data.donation_id = responseData.data[index].id

                            let parsedDate = new Date(Date.parse(responseData.data[index].date))
                            let newDate = `${parsedDate.getDate()}/${('0' + (parsedDate.getMonth() + 1)).slice(-2)}/${parsedDate.getFullYear()}`
                            data.date = newDate

                            data.donator = responseData.data[index].donator.name
                            data.isAccepted = responseData.data[index].isAccepted
                        })

                        temp.forEach((data) => {
                            data.confirm = (
                                <div className="inline py-1 px-3 rounded-lg bg-blue-800 cursor-pointer" onClick={() => confirm(data.donation_id)}>
                                    <ArrowForward fontSize="small" className="text-gray-100 border-2 border-solid border-gray-100 rounded-full" style={{ transform: 'scale(0.8)' }} />
                                </div>
                            )
                        })
                        const filteredData = temp.filter(tmp => tmp.donationItems && !tmp.isAccepted)
                        setDataTable(filteredData)
                    }
                }
            })
        }

        if (auth.token) {
            fetchItems()
        }
    }, [auth.token, sendRequest])

    const clearAcceptError = () => {
        setAcceptError(null)
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <ErrorModal error={acceptError} onClear={clearAcceptError} />
            <div className="flex flex-row">
                <Sidebar role="" name="ADMIN" links={links} />

                <div className="p-8 pb-24 md:p-16 w-full lg:w-11/12">
                    <div className="flex flex-row items-center">
                        <Title>Konfirmasi Donasi</Title>
                        <div className="w-3"></div>
                        {acceptLoading && <LoadingSpinner />}
                    </div>
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

export default KonfirmasiDonasi