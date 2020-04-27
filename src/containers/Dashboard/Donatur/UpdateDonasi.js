import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { links } from '../../../components/Dashboard/donaturLink'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import { useHistory } from 'react-router-dom'
import { Delete } from '@material-ui/icons'
import { useMediaQuery } from '../../../hooks/medquery-hook'

import Select3 from '../../../components/UI/Select3'
import Sidebar from '../../../components/Dashboard/SideBar'
import ErrorModal from '../../../components/UI/ErrorModal'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Button from '../../../components/UI/Button'
import Select2 from '../../../components/UI/Select2'

const UpdateDonasi = () => {
    const donationId = useParams().donationId
    const mediaQuery = useMediaQuery('(max-width: 600px)')
    const [submitError, setSubmitError] = useState()
    const auth = useContext(AuthContext)
    let history = useHistory()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [donasi, setDonasi] = useState([
        {
            item: '',
            quantity: '',
            unit: '',
            touch: 'false'
        }
    ])

    const [unitList, setUnitList] = useState([])
    const [itemList, setItemList] = useState([])
    // const [selectedItemIndex, setSelectedItemIndex] = useState([])
    // const [selectedUnitIndex, setSelectedUnitIndex] = useState([])
    const [disable, setDisable] = useState(true)



    useEffect(() => {
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
            'GET',
            null,
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            setUnitList(responseData)
        })

        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
            'GET',
            null,
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            setItemList(responseData)
        })

        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/donations/${donationId}`,
            'GET',
            null,
            { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        ).then(responseData => {
            let donasiTemp = [...responseData.donationItems]
            donasiTemp.forEach((item, i) => {
                donasiTemp[i].item = donasiTemp[i].item.id
                donasiTemp[i].unit = donasiTemp[i].unit.id
                donasiTemp[i].touch = false
            })
            setDonasi(donasiTemp)
        })

    }, [auth.token, sendRequest, donationId])

    useEffect(() => {
        let tempDisable = false
        for (let i = 0; i < donasi.length; i++) {
            if (donasi[i].quantity.length === 0) {
                tempDisable = true
                break
            }
        }
        setDisable(tempDisable)
    }, [donasi])

    const changeItem = (item_id, index) => {
        let donasiTemp = [...donasi]
        donasiTemp[index].item = item_id
        setDonasi(donasiTemp)
    }

    const changeUnit = (unit_id, index) => {
        let donasiTemp = [...donasi]
        donasiTemp[index].unit = unit_id
        setDonasi(donasiTemp)
    }


    const inputHandler = (event, index) => {
        let donasiTemp = [...donasi]
        donasiTemp[index].quantity = event.target.value
        setDonasi(donasiTemp)
    }

    const handleBlur = (index) => {
        let tempDonasi = [...donasi]
        tempDonasi[index].touch = true
        setDonasi(tempDonasi)
    }

    const deleteItem = (index) => {
        let donationTemp = [...donasi]
        donationTemp.splice(index, 1)
        setDonasi(donationTemp)
    }

    const submitHandler = () => {
        let donation = {
            donationItems: [

            ]
        }
        donasi.forEach((item, index) => {
            let tempItem = item
            tempItem.item_id = tempItem.item
            tempItem.unit_id = tempItem.unit
            delete tempItem['touch']
            delete tempItem['item']
            delete tempItem['unit']
            donation.donationItems.push(tempItem)
        })
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/donations/${donationId}`,
            'PUT',
            JSON.stringify(donation),
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then((responseData) => {
            if(responseData.error){
                setSubmitError(responseData.error)
            } else {
                history.goBack()
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
                <h5 className="font-semibold text-md text-white">Dashboard Donatur</h5>
                <h2 className="font-semibold text-lg text-white">{auth.name}</h2>
            </div>
            <div className="flex flex-row h-full w-full">
                <Sidebar role="Donatur" name={auth.name} links={links} />

                <div>

                    <div className="flex w-full flex-col p-8 md:p-10 md:pb-0">
                        <Title>Informasi Barang</Title>
                        <form className="mt-4">
                            {
                                donasi.map((item, index) => {
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
                                                            className={`mb-3 inline-block w-full bg-gray-400 text-gray-700 p-2 rounded-md tex-sm font-semibold tracking-wide outline-none focus:shadow-outline focus:text-blue-700`}
                                                            id="quantity"
                                                            type="number"
                                                            value={item.quantity % 1 === 0 ? Math.round(item.quantity) : item.quantity}
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
                                                    <Delete className="text-gray-700 mr-2 ml-5 mt-2 text-sm lg:relative absolute top-0 right-0 cursor-pointer" style={styles.container(mediaQuery)} onClick={() => deleteItem(index)} />

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

const styles = {
    container: mediaQuery => ({
        fontSize: mediaQuery ? '15' : '25'
    })
}

export default UpdateDonasi