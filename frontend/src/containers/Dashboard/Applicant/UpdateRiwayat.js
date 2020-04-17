
import React, { useState, useContext, useEffect } from 'react'
import { links } from '../../../components/Dashboard/pemohonLink'
import { AuthContext } from '../../../context/auth-context'
import { VALIDATOR_REQUIRE }from '../../../util/validator'
import { useForm } from '../../../hooks/form-hook'
import {useHttpClient} from '../../../hooks/http-hook'
import { useMediaQuery } from '../../../hooks/medquery-hook';
import { useHistory } from 'react-router-dom'

import Sidebar from '../../../components/Dashboard/SideBar'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import TextInput2 from '../../../components/Form/TextInput2'
import Button from '../../../components/UI/Button'
import Select2 from '../../../components/UI/Select2'

// export const testProvider = React.createContext(false)

const UpdateRiwayat = (props) => {
    //DATA DARI EACH ROW
    let data = JSON.parse(localStorage.getItem('selected'))
    // let selectedUnitIndex = JSON.parse(localStorage.getItem('selectedUnitIndex'))
    // let selectedItemIndex = JSON.parse(localStorage.getItem('selectedItemIndex'))
    const auth = useContext(AuthContext)
    const [name, setName] = useState(auth.name)
    let history = useHistory()
    const {isLoading, error, sendRequest} = useHttpClient()
    const [formState, inputHandler] = useForm({
        quantity: {
            value: data.quantity,
            isValid: true
        }
    }, false)

    const [kebutuhan, setKebutuhan] = useState(
        {
            item_id: '',
            unit_id: ''
        }
    )

    const [unitList, setUnitList] = useState([])
    const [itemList, setItemList] = useState([])
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    const [selectedUnitIndex, setSelectedUnitIndex] = useState(0)


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
    }, [auth.token, sendRequest]) //USE EFFECT END;


    //FUNC GANTI ITEM;
    const changeItem = (item_id) => {
        setKebutuhan({
            ...kebutuhan,
            item_id: item_id
        })
    }


    //set Unit KG BOX of the kebutuhan;
    const changeUnit = (unit_id) => {
        setKebutuhan({
            ...kebutuhan,
            unit_id: unit_id
        })
    }


    //EFFECT SET ITEM SELECTED; 
    useEffect(() => {
        console.log(itemList)
        let x
        let i
        for([i, x] of itemList.entries()){
            if(x.name === data.item){
                setKebutuhan({
                    ...kebutuhan,
                    item_id: x.id
                })
                setSelectedItemIndex(i)
                break;
            }
        }


    }, [itemList])

    //EFECT SELECTED UNIT; 
    useEffect(() => {
        let x
        let i
        for([i, x] of unitList.entries()){
            if(x.name === data.unit) {
                setKebutuhan({
                    ...kebutuhan,
                    unit_id: x.id
                })
                setSelectedUnitIndex(i)
                break
            }
        }
    }, [unitList])

    // useEffect(() => {
    //     console.log(donasi)
    //     console.log(data)

    // }, [donasi])

    useEffect(() => {
        // inputHandler('quantity', data.quantity, true)
        // console.log(formState.inputs)
        // console.log(data, selectedItemIndex, selectedUnitIndex)
        console.log(selectedItemIndex)
    }, [selectedItemIndex])


    //SUBMIT BUTTON CLICK FOR UPDATING THE BARANG YANG DIREQUEST; 
    const submitHandler = () => {
      console.log(data.request_id);
      console.log('this is the donation id');
      let idtest = `1aZXT935g3DU0FmBSGaAAJvzzWz`
      console.log(kebutuhan.item_id, kebutuhan.unit_id);
      console.log(`${process.env.REACT_APP_BACKEND_URL}/v1/requests/${idtest}`);
      
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/requests/${data.request_id}`,
            // `${process.env.REACT_APP_BACKEND_URL}/v1/requests/${idtest}`,
            'PUT',
            JSON.stringify({
                requestItems: [
                    {
                        // id: data.id,
                        // donation_id: ,
                        item_id: kebutuhan.item_id,
                        unit_id: kebutuhan.unit_id,
                        quantity: formState.inputs.quantity.value
                    }
                ]
            }),
            {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            console.log(responseData)
            console.log('update the request is done');
            // history.goBack()
        })
    }


    //THE HTML COMPONENT; 
    return(
        <div className="flex flex-row h-full w-full">
          <Sidebar role="" name="PEMOHON" links={links} />

            <div>

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
            </div>
        </div>  
    )
}






export default UpdateRiwayat