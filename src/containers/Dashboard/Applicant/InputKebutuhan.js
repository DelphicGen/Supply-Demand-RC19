// import React, { useState, useContext, useEffect } from 'react'
// import { AuthContext } from '../../../context/auth-context'
// import { useHttpClient } from '../../../hooks/http-hook'
// import { useForm } from '../../../hooks/form-hook'
// import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_PASSWORD } from '../../../util/validator'
import { links } from '../../../components/Dashboard/pemohonLink'

// import Select from '../../../components/UI/Select'
// import Sidebar from '../../../components/Dashboard/SideBar'
// import Title from '../../../components/Dashboard/Title'
// import TextInput from '../../../components/Form/TextInput'
// import Select2 from '../../../components/UI/Select2'
// import TextInput2 from '../../../components/Form/TextInput2'
// import Button from '../../../components/UI/Button'
// import ErrorModal from '../../../components/UI/ErrorModal'
// import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import React, { useState, useContext, useEffect } from 'react'
// import { links } from '../../../components/Dashboard/donaturLink'
import { AuthContext } from '../../../context/auth-context'
import {useHttpClient} from '../../../hooks/http-hook'
import { AddCircle } from '@material-ui/icons'
import { Delete } from '@material-ui/icons'
import { useMediaQuery } from '../../../hooks/medquery-hook'

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
    const [unitList, setUnitList] = useState([])
    const [itemList, setItemList] = useState([])
    const [check, setCheck] = useState(false)
    const [submit, setSubmit] = useState(false)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [submitError, setSubmitError] = useState()
    const auth = useContext(AuthContext)
    const [reqestItems, setRequestItems] = useState([])
    const [disable, setDisable] = useState(true)

    // const [formState, inputHandler] = useForm({
    //     quantity: {
    //         value: '',
    //         isValid: false
    //     }
    // }, false)

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
        for(let i = 0; i < kebutuhan.length; i++){
            if(kebutuhan[i].quantity.length === 0){
                tempDisable = true
                break
            }
        }
        setDisable(tempDisable)
    }, [kebutuhan])

    useEffect(() => {
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
            'GET',
            null,
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            setUnitList(responseData)
            let kebutuhanTemp = [...kebutuhan]
            kebutuhanTemp[0].unit_id = responseData[0].id
            setKebutuhan(kebutuhanTemp)
        })

        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
            'GET',
            null,
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            setItemList(responseData)
            let kebutuhanTemp = [...kebutuhan]
            kebutuhanTemp[0].item_id = responseData[0].id
            setKebutuhan(kebutuhanTemp)

        })
    }, [auth.token, sendRequest])

    // useEffect(() => {
    //     sendRequest(
    //         `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
    //         'GET',
    //         null,
    //         { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
    //     ).then(responseData => {
    //         setUnitList(responseData)
    //         setKebutuhan(prevKebutuhan => ({
    //             ...prevKebutuhan,
    //             unit_id: responseData[0].id
    //         }))
    //     })

    //     sendRequest(
    //         `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
    //         'GET',
    //         null,
    //         { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
    //     ).then(responseData => {
    //         setItemList(responseData)
    //         setKebutuhan(prevKebutuhan => ({
    //             ...prevKebutuhan,
    //             item_id: responseData[0].id
    //         }))

    //     })
    // }, [auth.token, sendRequest])

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
        let needsAdd ={
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

    // const changeItem = (item_id) => {
    //     setKebutuhan({
    //         ...kebutuhan,
    //         item_id: item_id
    //     })
    // }

    // const changeUnit = (unit_id) => {
    //     setKebutuhan({
    //         ...kebutuhan,
    //         unit_id: unit_id
    //     })
    // }

    const submitHandler = () => {
        let needs = {
            requestItems: [

            ]
        }
        kebutuhan.forEach((item, index) => {
            let tempItem = item
            delete tempItem['touch']
            needs.requestItems.push(tempItem)
        })
        console.log(needs)
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/requests`,
            'POST',
            JSON.stringify(needs),
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            console.log(responseData)
            if (responseData.date != null) {
                setSubmit(true)
                setCheck(true)
                props.history.push('/dashboard/riwayat-kebutuhan')
            }
            else {
                setSubmit(true)
                setCheck(false)
                setSubmitError('Gagal menginput kebutuhan. Mohon coba lagi.')
            }
        })
    }

    // const submitHandler = () => {
    //     let needs = {
    //         needsItems: [

    //         ]
    //     }
    //     donasi.forEach((item, index) => {
    //         let tempItem = item
    //         delete tempItem['touch']
    //         needs.needsItems.push(tempItem)
    //     })
    //     console.log(needs)
    //     sendRequest(
    //         `${process.env.REACT_APP_BACKEND_URL}/v1/needss`,
    //         'POST',
    //         JSON.stringify(
    //             needs
    //         ),
    //         {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
    //     ).then(responseData => {
    //         console.log(responseData)
    //         if(responseData.id.length > 0){
    //             // inputHandler("quantity", '', false)
    //             setDonasi([{
    //                 item_id: itemList[0].id,
    //                 quantity: '',
    //                 unit_id: unitList[0].id,
    //                 touch: false
    //             }])
    //             setSubmit(true)
    //             setCheck(true)
    //             flashMessage()
    //         }
    //         else{
    //             setSubmit(true)
    //             setCheck(false)
    //             flashMessage()
    //         }
    //     })
    // }

    const clearSubmitError = () => {
        setSubmitError(null)
    }

    let $addKebutuhan = null;
    const addKebutuhan = () => {

        $addKebutuhan = (<div className="flex flex-col lg:flex-row w-full lg:mb-5">
            {/* <div className="lg:hidden inline-block ml-auto mr-0 absolute right-0">
          <Delete className="text-gray-500" />
      </div> */}
            {/* <Select
                label="Jenis Barang"
                divClassName="mr-3 w-2/5 lg:4/12"
                arrayList={itemList}
                onSelectChange={changeItem}
            />
            <TextInput2
                divClassName="lg:w-4/12 w-full lg:4/12 lg:mr-3"
                id="quantity"
                type="text"
                label="Kuantitas"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                changeUnit={changeUnit}
                errorText="Mohon masukkan kuantitas barang."
                list={unitList}
            /> */}


        </div>)
    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <ErrorModal error={submitError} onClear={clearSubmitError} />
            <div className="flex flex-row h-full w-full">

                <Sidebar role="" name="PEMOHON" links={links} />

                <div>
                    <div className="flex w-full flex-col p-8 pb-4 md:p-10 md:pb-8">
                        <Title>Informasi Kebutuhan</Title>
                        <form className="mt-4">
                            {
                                kebutuhan.map((item, index) => {
                                    return(
                                        <div key={index} className="flex flex-col lg:flex-row w-full mb-5 lg:border-none lg:shadow-none border-gray-700 rounded-md shadow-xl lg:p-0 p-4 relative">
                                            <Select2
                                                label="Jenis Barang"
                                                divClassName="mr-3 lg:w-6/12 w-full mt-2 lg:mt-0"
                                                list={ itemList }
                                                changeItem={ changeItem }
                                                value={ item.item_id }
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
                                                            placeholder={``}
                                                            onChange={(event) => inputHandler(event, index)}
                                                            onBlur={() => handleBlur(index)} 
                                                        />

                                                        {item.quantity.length === 0 && item.touch === true && <p className="text-xs text-red-800 font-medium tracking-wider mb-3">Mohon masukkan kuantitas barang.</p>}
                                                    </div>
                                                    <Select3
                                                        divClassName="ml-2 w-1/2 inline-block"
                                                        list={ unitList }
                                                        changeUnit={ changeUnit } 
                                                        value={ item.unit_id }
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
                        <WhiteButton width={120} onClick={moreNeeds} width={200}>
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
                            {
                                isLoading ? <LoadingSpinner color="white" style={{transform: 'translateY(-3px)'}} /> : 'SUBMIT'
                            } 
                        </Button>
                    </div>
                </div>
                {/* <div className="flex w-full flex-col p-8 md:p-16">

                    <form >



                        <div className="flex w-full flex-col ">
                            <Title>Informasi Kebutuhan</Title>

                            <div className="flex flex-col lg:flex-row w-full lg:mb-5">
                                <Select2
                                    label="Jenis Barang"
                                    divClassName="mr-3 w-2/5 lg:4/12"
                                    list={itemList}
                                    changeItem={changeItem}
                                />
                                <TextInput
                                    divClassName="w-1/5 lg:4/12 lg:mr-3"
                                    id="quantity"
                                    type="text"
                                    label="Kuantitas"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    errorText="Mohon masukkan kuantitas barang."
                                />

                                <Select
                                    arrayList={unitList}
                                    onSelectChange={changeUnit}
                                    label="Jenis Barang"
                                    divClassName="mr-3 w-1/5" />

                            </div>
                            {$addKebutuhan}

                        </div>
                    </form>
                    <div className="flex w-full flex-col">

                        <Button
                            width={200}
                            type="submit"
                            onClick={submitHandler}
                            disabled={!formState.isValid}>
                            {
                                isLoading ? <LoadingSpinner color="white" style={{ transform: 'translateY(-3px)' }} /> : 'SUBMIT'
                            }
                        </Button>
                    </div>
                </div> */}

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