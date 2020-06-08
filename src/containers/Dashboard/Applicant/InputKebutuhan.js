import React, { useState, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { links } from '../../../components/Dashboard/pemohonLink'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import { AddCircle } from '@material-ui/icons'
import { Delete } from '@material-ui/icons'
import { useMediaQuery } from '../../../hooks/medquery-hook'

import * as actions from '../../../store/action/item'
import * as applicantActions from '../../../store/action/applicant'

import Select3 from '../../../components/UI/Select3'
import Sidebar from '../../../components/Dashboard/SideBar'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import ErrorModal from '../../../components/UI/ErrorModal'
import Button from '../../../components/UI/Button'
import WhiteButton from '../../../components/UI/WhiteButton'
import Select2 from '../../../components/UI/Select2'


const InputKebutuhan = (props) => {
    const mediaQuery = useMediaQuery('(max-width: 600px)')
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [submitError, setSubmitError] = useState()
    const auth = useContext(AuthContext)
    const [disable, setDisable] = useState(true)

    const unitList = useSelector(state => state.items.unit)
    const itemList = useSelector(state => state.items.item)
    const dispatch = useDispatch()

    const [kebutuhan, setKebutuhan] = useState([
        {
            item_id: '',
            quantity: '',
            unit_id: '',
            touch: 'false'
        }
    ])

    useEffect(() => {
        let tempDisable = false
        for (let i = 0; i < kebutuhan.length; i++) {
            if (kebutuhan[i].quantity.length === 0) {
                tempDisable = true
                break
            }
        }
        setDisable(tempDisable)
    }, [kebutuhan, dispatch])

    useEffect(() => {
        const fetchUnits = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
            ).then(responseData => {
                dispatch(actions.setUnits(responseData))
                let kebutuhanTemp = [...kebutuhan]
                kebutuhanTemp[0].unit_id = responseData[0].id
                setKebutuhan(kebutuhanTemp)
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
                let kebutuhanTemp = [...kebutuhan]
                kebutuhanTemp[0].item_id = responseData[0].id
                setKebutuhan(kebutuhanTemp)
            })
        }

        if (auth.token) {
            if (itemList.length === 0) {
                fetchItems()
            }
            if (unitList.length === 0) {
                fetchUnits()
            }
        }

        dispatch(applicantActions.setSubmitted(false))

    }, [auth.token, sendRequest, dispatch, itemList, unitList])

    const changeItem = (item_id, index) => {
        let kebutuhanTemp = [...kebutuhan]
        kebutuhanTemp[index].item_id = item_id
        setKebutuhan(kebutuhanTemp)
    }

    const changeUnit = (unit_id, index) => {
        let kebutuhanTemp = [...kebutuhan]
        kebutuhanTemp[index].unit_id = unit_id
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

    const moreNeeds = () => {
        let needsAdd = {
            item_id: itemList[0].id,
            quantity: '',
            unit_id: unitList[0].id,
            touch: false
        }
        let needsTemp = [...kebutuhan]
        needsTemp.push(needsAdd)
        setKebutuhan(needsTemp)
    }

    const deleteItem = (index) => {
        let needsTemp = [...kebutuhan]
        needsTemp.splice(index, 1)
        setKebutuhan(needsTemp)
    }

    const submitHandler = () => {
        let needs = {
            requestItems: []
        }
        kebutuhan.forEach((item, index) => {
            let tempItem = item
            delete tempItem['touch']
            needs.requestItems.push(tempItem)
        })
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/requests`,
            'POST',
            JSON.stringify(needs),
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            if (responseData.date != null) {
                props.history.push('/dashboard/riwayat-kebutuhan')
                dispatch(applicantActions.setSubmitted(true))
            }
            else {
                setSubmitError('Gagal menginput kebutuhan. Mohon coba lagi.')
            }
        })
    }

    const clearSubmitError = () => {
        setSubmitError(null)
    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <ErrorModal error={submitError} onClear={clearSubmitError} />
            <div className="p-8 py-4 block md:hidden md:text-left lg:pl-5 md:pl-3 inline-block bg-blue-700 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg w-full sm:w-auto">
                <h5 className="font-semibold text-base text-white">Dashboard Pemohon</h5>
                <h2 className="font-semibold text-lg text-white">{auth.name}</h2>
            </div>
            <div className="flex flex-row h-full w-full">
                <Sidebar role="" name="PEMOHON" links={links} />
                <div>
                    <div className="flex w-full flex-col p-8 pb-4 md:p-10 md:pb-8">
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
                                                value={item.item_id}
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
                                                            value={item.quantity}
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
                                                        value={item.unit_id}
                                                        index={index}
                                                    />
                                                    <Delete className="text-gray-700 mr-2 ml-5 mt-2 text-sm lg:relative absolute top-0 right-0" style={styles.container(mediaQuery)} onClick={() => deleteItem(index)} />

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </form>
                        <WhiteButton width={120} onClick={moreNeeds}>
                            <AddCircle className="text-blue-800 mr-2 text-sm" style={styles.container(mediaQuery)} /><span style={styles2.container(mediaQuery)} className="text-sm">TAMBAH</span>
                        </WhiteButton>
                    </div>

                    <div className="md:ml-10 ml-8">
                        <Button
                            width={200}
                            type="submit"
                            onClick={submitHandler}
                            disabled={disable}
                        >
                            {isLoading ? <LoadingSpinner color="white" style={{ transform: 'translateY(-3px)' }} /> : 'SUBMIT'}
                        </Button>
                    </div>
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

export default InputKebutuhan