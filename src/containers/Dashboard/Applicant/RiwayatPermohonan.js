import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { links } from '../../../components/Dashboard/pemohonLink'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import { Update, Delete } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

import * as applicantActions from '../../../store/action/applicant'

import ErrorModal from '../../../components/UI/ErrorModal'
import Sidebar from '../../../components/Dashboard/SideBar'
import Table from '../../../components/Dashboard/Table'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'

const RiwayatPermohonan = () => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const history = useHistory()
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
                data.requestItems.map(request => output.push(request.item.name))
                return output.join(', ')
            }
        },
        {
            Header: 'Stok',
            accessor: data => {
                let output = []
                data.requestItems.map(request => {
                    let quantity = request.quantity % 1 === 0 ? Math.round(request.quantity) : request.quantity
                    return output.push(`${quantity} ${request.unit.name}`)
                })
                return output.join(', ')
            }
        },
        {
            Header: 'Aksi',
            accessor: 'action'
        }
    ]

    const dataTable = useSelector(state => state.applicant.demandItems)
    const isSubmit = useSelector(state => state.applicant.isSubmit)
    const isDemandFetched = useSelector(state => state.applicant.isDemandFetched)
    const dispatch = useDispatch()

    const update = useCallback((id) => {
        history.push(`/dashboard/update-kebutuhan/${id}`)
    }, [history])

    const deleteRequest = useCallback(id => {
        setDeleteLoading(true)
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/requests/${id}`, {
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
                const filteredData = dataTable && dataTable.filter(data => data.requestId !== id)
                dispatch(applicantActions.setDemandIsFetched(filteredData))
            } else {
                setDeleteError('Maaf, donasi untuk barang ini sudah dialokasikan sehingga tidak bisa dihapus.')
            }
            setDeleteLoading(false)
        })
    }, [auth.token, dispatch, dataTable])

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
                                    temp = [...temp, {requestItems: data.requestItems, requestId: data.id}]
                            }
                        })

                        temp.forEach((data) => {
                            data.action = (
                                <div className="flex flex-row">
                                    <div data-tip data-for="update" className="inline py-1 pb-2 md:pb-1 px-3 mr-2 rounded-lg bg-blue-800 cursor-pointer" onClick={() => update(data.requestId)}>
                                        <Update fontSize="small" className="text-gray-100" style={{ transform: 'scale(0.95)' }} />
                                    </div>

                                    <div data-tip data-for="delete" className="inline py-1 pb-2 md:pb-1 px-3 rounded-lg bg-blue-800 cursor-pointer" onClick={() => deleteRequest(data.requestId)}>
                                        <Delete fontSize="small" className="text-gray-100" style={{ transform: 'scale(0.95)' }} />
                                    </div>
                                </div>
                            )
                        })
                        dispatch(applicantActions.setDemandIsFetched(temp))
                        dispatch(applicantActions.setSubmitted(false))
                    }
                }
            })
        }

        if (auth.token && (isSubmit || !isDemandFetched)) {
            fetchItems()
        }

    }, [auth.token, sendRequest, auth.id, update, deleteRequest, dispatch, isDemandFetched, isSubmit])

    let content = <LoadingSpinner />
    if (!isLoading && dataTable) {
        if (dataTable.length > 0) {
            content = <Table columns={columns} data={dataTable} />
        } else {
            content = <p className="text-sm font-semibold">Anda belum mengajukan permohonan.</p>
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <ErrorModal error={deleteError} onClear={() => setDeleteError(false)} />
            <div className="p-8 py-4 block md:hidden md:text-left lg:pl-5 md:pl-3 inline-block bg-blue-700 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg w-full sm:w-auto">
                <h5 className="font-semibold text-base text-white">Dashboard Pemohon</h5>
                <h2 className="font-semibold text-lg text-white">{auth.name}</h2>
            </div>
            <div className="flex flex-row">
                <Sidebar role="Pemohon" name={auth.name} links={links} />
                <div className="p-8 pb-24 md:p-16 w-full lg:w-11/12">
                    <div className="flex flex-row">
                        <Title>Permohonan Saya</Title>
                        {deleteLoading && <LoadingSpinner />}
                    </div>
                    <div className="h-3"></div>
                    {content}
                </div>
            </div>
        </React.Fragment>

    )
}


export default RiwayatPermohonan