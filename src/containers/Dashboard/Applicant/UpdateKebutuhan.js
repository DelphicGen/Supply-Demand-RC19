import React, { useState, useContext, useEffect } from 'react'
import { links } from '../../../components/Dashboard/pemohonLink'
import { AuthContext } from '../../../context/auth-context'
import { VALIDATOR_REQUIRE }from '../../../util/validator'
import { useForm } from '../../../hooks/form-hook'
import {useHttpClient} from '../../../hooks/http-hook'
import { useMediaQuery } from '../../../hooks/medquery-hook';
import { useHistory } from 'react-router-dom'
import { Delete } from '@material-ui/icons'

import Select3 from '../../../components/UI/Select3'
import Sidebar from '../../../components/Dashboard/SideBar'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import TextInput2 from '../../../components/Form/TextInput2'
import Button from '../../../components/UI/Button'
import Select2 from '../../../components/UI/Select2'


const UpdateRiwayat = (props) => {
    const mediaQuery = useMediaQuery('(max-width: 600px)')
    let data = JSON.parse(localStorage.getItem('selected'))
    const auth = useContext(AuthContext)
    // const [name, setName] = useState(auth.name)
    let history = useHistory()
    const {isLoading, error, sendRequest} = useHttpClient()
    // // const [formState, inputHandler] = useForm({
    // //     quantity: {
    // //         value: data.quantity,
    // //         isValid: true
    // //     }
    // // }, false)

    // const [kebutuhan, setKebutuhan] = useState(
    //     {
    //         item_id: '',
    //         unit_id: ''
    //     }
    // )

    const [kebutuhan, setKebutuhan] = useState([
        {
            item: '',
            quantity: '',
            unit: '',
            touch: 'false'
        }
    ])

    const [unitList, setUnitList] = useState([])
    const [itemList, setItemList] = useState([])
    const [disable, setDisable] = useState(true)
    // const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    // const [selectedUnitIndex, setSelectedUnitIndex] = useState(0)


    // FETCHING DATA UNITNYA;
    useEffect(() => {
        console.log(data);
        console.log('isi object data from the row table');
        //REQUEST TO THE UNITS(KILO, BOX, BARANG;); 
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
            'GET',
            null,
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            setUnitList(responseData)
        })


        //REQUEST TO THE ITEMS(INDOMIE, NASI KOTAK, MASKER, APD); knp w juga ga tau; 
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
            'GET',
            null,
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            setItemList(responseData)
        })

        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/requests/${data.requestId}`,
            'GET',
            null,
            { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        ).then(responseData => {
            console.log(responseData)
            let kebutuhanTemp = [...responseData.requestItems]
            kebutuhanTemp.forEach((item, i) => {
                kebutuhanTemp[i].item = kebutuhanTemp[i].item.id
                kebutuhanTemp[i].unit = kebutuhanTemp[i].unit.id
                kebutuhanTemp[i].touch = false
            })
            setKebutuhan(kebutuhanTemp)
        })
    }, [auth.token, sendRequest]) //USE EFFECT END;

    useEffect(() => {
        console.log(kebutuhan)
        console.log(data)
        let tempDisable = false
        for(let i = 0; i < kebutuhan.length; i++){
            if(kebutuhan[i].quantity.length === 0){
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


    //FUNC GANTI ITEM;
    // const changeItem = (item_id) => {
    //     setKebutuhan({
    //         ...kebutuhan,
    //         item_id: item_id
    //     })
    // }


    // //set Unit KG BOX of the kebutuhan;
    // const changeUnit = (unit_id) => {
    //     setKebutuhan({
    //         ...kebutuhan,
    //         unit_id: unit_id
    //     })
    // }


    //EFFECT SET ITEM SELECTED; 
    // useEffect(() => {
    //     console.log(itemList)
    //     let x
    //     let i
    //     for([i, x] of itemList.entries()){
    //         if(x.name === data.item){
    //             setKebutuhan({
    //                 ...kebutuhan,
    //                 item_id: x.id
    //             })
    //             setSelectedItemIndex(i)
    //             break;
    //         }
    //     }


    // }, [itemList])

    //EFECT SELECTED UNIT; 
    // useEffect(() => {
    //     let x
    //     let i
    //     for([i, x] of unitList.entries()){
    //         if(x.name === data.unit) {
    //             setKebutuhan({
    //                 ...kebutuhan,
    //                 unit_id: x.id
    //             })
    //             setSelectedUnitIndex(i)
    //             break
    //         }
    //     }
    // }, [unitList])

    // useEffect(() => {
    //     console.log(kebutuhan)
    //     console.log(data)

    // }, [kebutuhan])

    // useEffect(() => {
    //     // inputHandler('quantity', data.quantity, true)
    //     // console.log(formState.inputs)
    //     // console.log(data, selectedItemIndex, selectedUnitIndex)
    //     console.log(selectedItemIndex)
    // }, [selectedItemIndex])

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

    const deleteItem = (index) => {
        let needsTemp = [...kebutuhan]
        needsTemp.splice(index, 1)
        setKebutuhan(needsTemp)
    }

    //SUBMIT BUTTON CLICK FOR UPDATING THE BARANG YANG DIREQUEST; 
    // const submitHandler = () => {
    //   console.log(data.request_id);
    //   console.log('this is the needs id');
    //   let idtest = `1aZXT935g3DU0FmBSGaAAJvzzWz`
    //   console.log(kebutuhan.item_id, kebutuhan.unit_id);
    //   console.log(`${process.env.REACT_APP_BACKEND_URL}/v1/requests/${idtest}`);
      
    //     sendRequest(
    //         `${process.env.REACT_APP_BACKEND_URL}/v1/requests/${data.request_id}`,
    //         // `${process.env.REACT_APP_BACKEND_URL}/v1/requests/${idtest}`,
    //         'PUT',
    //         JSON.stringify({
    //             requestItems: [
    //                 {
    //                     // id: data.id,
    //                     // needs_id: ,
    //                     item_id: kebutuhan.item_id,
    //                     unit_id: kebutuhan.unit_id,
    //                     quantity: formState.inputs.quantity.value
    //                 }
    //             ]
    //         }),
    //         {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
    //     ).then(responseData => {
    //         console.log(responseData)
    //         console.log('update the request is done');
    //         // history.goBack()
    //     })
    // }

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
        console.log(needs)
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/requests/${data.requestId}`,
            'PUT',
            JSON.stringify(needs),
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            console.log(responseData)
            history.goBack()
        })
    }


    //THE HTML COMPONENT; 
    return(
        <div className="flex flex-row h-full w-full">
          <Sidebar role="" name="PEMOHON" links={links} />

            {/* <div>

                <div className="flex w-full flex-col p-8 md:p-16">
                    <Title>Update</Title>
                    <form className="md:flex md:flex-row md:items-center mt-4">
                        <div className="flex flex-col lg:flex-row w-full lg:mb-5 lg:border-none lg:shadow-none border-gray-700 rounded-md shadow-md lg:p-0 p-4 relative">
                            <Select2
                                label="Jenis Barang"
                                divClassName="mr-3 lg:w-6/12 w-full mt-2 lg:mt-0"
                                list={ itemList }
                                changeItem={ changeItem }
                                selectedIndex={ selectedItemIndex }
                            />
                            <TextInput2
                                divClassName="lg:w-6/12 w-full lg:4/12 lg:mr-3"
                                id="quantity"
                                type="text"
                                label="Kuantitas"
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                                changeUnit={ changeUnit }
                                errorText="Mohon masukkan kuantitas barang."
                                list={unitList}
                                value={formState.inputs.quantity.value}
                                selectedIndex={ selectedUnitIndex }
                            />
                            
                        </div>
                    </form>
                </div>

                <div className="md:ml-16 ml-8">

                    <Button
                        width={200}
                        type="submit"
                        onClick={submitHandler}
                        disabled={!formState.isValid}>
                    >
                        {
                            isLoading ? <LoadingSpinner color="white" style={{transform: 'translateY(-3px)'}} /> : 'UPDATE'
                        } 
                    </Button>
                </div>
            </div> */}
            <div>
                <div className="flex w-full flex-col p-8 md:p-10">
                    <Title>Informasi Kebutuhan</Title>
                    <form className="mt-4">
                    {
                        kebutuhan.map((item, index) => {
                            // console.log(item)
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

export default UpdateRiwayat