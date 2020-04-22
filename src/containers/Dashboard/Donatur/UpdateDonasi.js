import React, { useState, useContext, useEffect } from 'react'
import { links } from '../../../components/Dashboard/donaturLink'
import { AuthContext } from '../../../context/auth-context'
import { VALIDATOR_REQUIRE } from '../../../util/validator'
import { useForm } from '../../../hooks/form-hook'
import { useHttpClient } from '../../../hooks/http-hook'
import { useHistory } from 'react-router-dom'
import { Delete } from '@material-ui/icons'
import { useMediaQuery } from '../../../hooks/medquery-hook'

import Select3 from '../../../components/UI/Select3'
import Sidebar from '../../../components/Dashboard/SideBar'
import ErrorModal from '../../../components/UI/ErrorModal'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import TextInput2 from '../../../components/Form/TextInput2'
import Button from '../../../components/UI/Button'
import Select2 from '../../../components/UI/Select2'

const UpdateDonasi = (props) => {
    const mediaQuery = useMediaQuery('(max-width: 600px)')
    let data = JSON.parse(localStorage.getItem('selected'))
    const auth = useContext(AuthContext)
    let history = useHistory()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    // const [formState, inputHandler] = useForm({
    //     quantity: {
    //         value: data.quantity,
    //         isValid: true
    //     }
    // }, false)

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
    const [selectedItemIndex, setSelectedItemIndex] = useState([])
    const [selectedUnitIndex, setSelectedUnitIndex] = useState([])
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
            `${process.env.REACT_APP_BACKEND_URL}/v1/donations/${data.donation_id}`,
            'GET',
            null,
            { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        ).then(responseData => {
            // console.log(responseData)
            setDonasi(responseData.donationItems)
        })

    }, [auth.token, sendRequest])

    useEffect(() => {
        // console.log(donasi)
        let tempDisable = false
        for(let i = 0; i < donasi.length; i++){
            if(donasi[i].quantity.length === 0){
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

    useEffect(() => {
        // console.log(itemList)
        let x
        let i
        for ([i, x] of itemList.entries()) {
            if (x.name === data.item) {
                // setDonasi({
                //     ...donasi,
                //     item_id: x.id
                // })
                setSelectedItemIndex(i)
                break;
            }
        }


    }, [itemList])

    useEffect(() => {
        let x
        let i
        for ([i, x] of unitList.entries()) {
            if (x.name === data.unit) {
                // setDonasi({
                //     ...donasi,
                //     unit_id: x.id
                // })
                setSelectedUnitIndex(i)
                break
            }
        }
    }, [unitList])

    // useEffect(() => {
    //     let x1
    //     let i1
    //     let x2
    //     let i2
    //     let donasiTemp = [...donasi]
    //     for([i1, x1] of donasi.entries()){
    //         for ([i2, x2] of itemList.entries()) {
    //             if (x.name === data.item) {
    //                 // setDonasi({
    //                 //     ...donasi,
    //                 //     item_id: x.id
    //                 // })
    //                 let 
    //             }
    //         }
    //     }
    // }, [donasi])

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

    useEffect(() => {
        console.log(unitList, itemList) 
    }, [unitList, itemList])

    const submitHandler = () => {
        // sendRequest(
        //     `${process.env.REACT_APP_BACKEND_URL}/v1/donations`,
        //     'PUT',
        //     JSON.stringify({
        //         donationItems: [
        //             {
        //                 id: data.id,
        //                 donation_id: data.donation_id,
        //                 item_id: donasi.item_id,
        //                 unit_id: donasi.unit_id,
        //                 quantity: donasi.quantity
        //             }
        //         ]
        //     }),
        //     { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        // ).then(responseData => {
        //     console.log(responseData)
        //     history.goBack()
        // })
    }

    return(
        <div className="flex flex-row h-full w-full">
            <Sidebar role="Donatur" name={auth.name} links={links} />

            <div>

                <div className="flex w-full flex-col p-8 md:p-10">
                    <Title>Informasi Barang</Title>
                    <form className="mt-4">
                    {
                        donasi.map((item, index) => {
                            console.log(item)
                            return(
                                <div key={index} className="flex flex-col lg:flex-row w-full mb-5 lg:border-none lg:shadow-none border-gray-700 rounded-md shadow-xl lg:p-0 p-4 relative">
                                    <Select2
                                        label="Jenis Barang"
                                        divClassName="mr-3 lg:w-6/12 w-full mt-2 lg:mt-0"
                                        list={ itemList }
                                        changeItem={ changeItem }
                                        value={ item.item }
                                        index={ index }
                                    />
                                    <div className={`flex flex-col lg:w-1/2 w-full`}>
                                        <label className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">Kuantitas</label>
                                        <div className="flex">
                                            <div className="w-1/2">
                                                <input
                                                    className={`mb-3 inline-block w-full bg-gray-400 text-gray-700 p-2 rounded-md tex-sm font-semibold tracking-wide outline-none focus:shadow-outline focus:text-blue-700`} 
                                                    id={'quantity'}
                                                    type={'text'}
                                                    value={ item.quantity }
                                                    placeholder={`Masukkan kuantitas barang donasi`}
                                                    onChange={(event) => inputHandler(event, index)}
                                                    onBlur={() => handleBlur(index)} 
                                                />

                                                {item.quantity.length === 0 && item.touch === true && <p className="text-xs text-red-800 font-medium tracking-wider mb-3">Mohon masukkan kuantitas barang.</p>}
                                            </div>
                                            <Select3
                                                divClassName="ml-2 w-1/2 inline-block"
                                                list={ unitList }
                                                changeUnit={ changeUnit } 
                                                value={ item.unit }
                                                index={ index }
                                            />
                                            <Delete className="text-gray-700 mr-2 ml-5 mt-2 text-sm lg:relative absolute top-0 right-0" style={styles.container(mediaQuery)} onClick={() => deleteItem(index)} />
                                            
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
                                isLoading ? <LoadingSpinner color="white" style={{transform: 'translateY(-3px)'}} /> : 'SUBMIT'
                            } 
                        </Button>
                    </div>
            </div>
        </div>
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

export default UpdateDonasi