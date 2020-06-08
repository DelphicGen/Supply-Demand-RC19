import React, { useState, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { links } from '../../../components/Dashboard/pemohonLink'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import { useHistory } from 'react-router-dom'

import * as actions from '../../../store/action/item'
import * as applicantActions from '../../../store/action/applicant'

import Select3 from '../../../components/UI/Select3'
import Sidebar from '../../../components/Dashboard/SideBar'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Button from '../../../components/UI/Button'
import Select2 from '../../../components/UI/Select2'
import ErrorModal from '../../../components/UI/ErrorModal'

const UpdateRiwayat = (props) => {
    const requestId = useParams().requestId
    const auth = useContext(AuthContext)
    let history = useHistory()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [kebutuhan, setKebutuhan] = useState([
        {
            item: '',
            quantity: '',
            unit: '',
            touch: 'false'
        }
    ])

    const unitList = useSelector(state => state.items.unit)
    const itemList = useSelector(state => state.items.item)
    const [disable, setDisable] = useState(true)
    const [updateError, setUpdateError] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUnits = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
            ).then(responseData => {
                dispatch(actions.setUnits(responseData))
            })
        }

        const fetchItems = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
            ).then(responseData => {
                dispatch(actions.setItems(responseData))
            })
        }

        const fetchRequest = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/requests/${requestId}`,
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            ).then(responseData => {
                let kebutuhanTemp = [...responseData.requestItems]
                kebutuhanTemp.forEach((item, i) => {
                    kebutuhanTemp[i].item = kebutuhanTemp[i].item.id
                    kebutuhanTemp[i].unit = kebutuhanTemp[i].unit.id
                    kebutuhanTemp[i].touch = false
                })
                setKebutuhan(kebutuhanTemp)
            })
        }

        if(auth.token){
            if (itemList.length === 0) {
                fetchItems()
            }
            if (unitList.length === 0) {
                fetchUnits()
            }
            fetchRequest()
        }

        dispatch(applicantActions.setSubmitted(false))

    }, [auth.token, sendRequest, requestId, dispatch, itemList, unitList])

    useEffect(() => {
        let tempDisable = false
        for (let i = 0; i < kebutuhan.length; i++) {
            if (kebutuhan[i].quantity.length === 0) {
                tempDisable = true
                break
            }
        }
        setDisable(tempDisable)
    }, [kebutuhan])

    const changeItem = (item_id, index) => {
        let kebutuhanTemp = [...kebutuhan]
        kebutuhanTemp[index].item = item_id
        setKebutuhan(kebutuhanTemp)
    }

    const changeUnit = (unit_id, index) => {
        let kebutuhanTemp = [...kebutuhan]
        kebutuhanTemp[index].unit = unit_id
        setKebutuhan(kebutuhanTemp)
    }

    const inputHandler = (event, index) => {
        let kebutuhanTemp = [...kebutuhan]
        kebutuhanTemp[index].quantity = event.target.value
        setKebutuhan(kebutuhanTemp)
    }

    const handleBlur = (index) => {
        let tempKebutuhan = [...kebutuhan]
        tempKebutuhan[index].touch = true
        setKebutuhan(tempKebutuhan)
    }

    const submitHandler = () => {
        let needs = {
            requestItems: [

            ]
        }
        kebutuhan.forEach((item, index) => {
            let tempItem = item
            tempItem.item_id = tempItem.item
            tempItem.unit_id = tempItem.unit
            delete tempItem['touch']
            delete tempItem['item']
            delete tempItem['unit']
            needs.requestItems.push(tempItem)
        })
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/requests/${requestId}`,
            'PUT',
            JSON.stringify(needs),
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            if (responseData.error) {
                setUpdateError('Maaf, kebutuhan yang sudah dimasukkan ke dalam sistem tidak dapat dihapus.')
            } else {
                dispatch(applicantActions.setSubmitted(true))
                history.goBack()
            }
        })
    }

    const clearUpdateError = () => {
        setUpdateError(null)
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <ErrorModal error={updateError} onClear={clearUpdateError} />
            <div className="flex flex-row h-full w-full">
                <Sidebar role="" name="PEMOHON" links={links} />
                <div>
                    <div className="flex w-full flex-col p-8 md:p-10 md:pb-0">
                        <Title>Informasi Kebutuhan</Title>
                        <form className="mt-4">
                            {
                                kebutuhan.map((item, index) => {
                                    return (
                                        <div key={index} className="flex flex-col lg:flex-row w-full mb-5 lg:border-none lg:shadow-none border-gray-700 rounded-md shadow-xl lg:p-0 p-4 relative">
                                            <Select2
                                                label="Jenis Barang"
                                                divClassName="mr-3 lg:w-6/12 w-full mt-2 lg:mt-0"
                                                list={itemList}
                                                changeItem={changeItem}
                                                value={item.item}
                                                index={index}
                                            />
                                            <div className={`flex flex-col lg:w-1/2 w-full`}>
                                                <label className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">Kuantitas</label>
                                                <div className="flex">
                                                    <div className="w-1/2">
                                                        <input
                                                            className={`mb-3 inline-block w-full bg-gray-400 text-gray-700 p-2 rounded-md tex-sm font-semibold tracking-wide outline-none focus:shadow-outline focus:text-blue-800`}
                                                            id={'quantity'}
                                                            type={'text'}
                                                            value={(item.quantity % 1 === 0) ? Math.floor(item.quantity) : item.quantity}
                                                            placeholder={``}
                                                            onChange={(event) => inputHandler(event, index)}
                                                            onBlur={() => handleBlur(index)}
                                                        />

                                                        {item.quantity.length === 0 && item.touch === true && <p className="text-xs text-red-800 font-medium tracking-wider mb-3">Mohon masukkan kuantitas barang.</p>}
                                                    </div>
                                                    <Select3
                                                        divClassName="ml-2 w-1/2 inline-block"
                                                        list={unitList}
                                                        changeUnit={changeUnit}
                                                        value={item.unit}
                                                        index={index}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                    <div className="md:ml-10 ml-8">
                        <Button
                            width={200}
                            type="submit"
                            onClick={submitHandler}
                            disabled={disable}
                        >
                            {
                                isLoading ? <LoadingSpinner color="white" style={{ transform: 'translateY(-3px)' }} /> : 'SUBMIT'
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UpdateRiwayat