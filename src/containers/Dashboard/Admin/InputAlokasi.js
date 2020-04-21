import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ImageUploader from "react-images-upload"

import { links } from '../../../components/Dashboard/adminLink'
import { AuthContext } from '../../../context/auth-context'
import { useForm } from '../../../hooks/form-hook'
import { useHttpClient } from '../../../hooks/http-hook'
import { VALIDATOR_REQUIRE } from '../../../util/validator'

import Sidebar from '../../../components/Dashboard/SideBar'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Title from '../../../components/Dashboard/Title'
import ErrorModal from '../../../components/UI/ErrorModal'
import TextInput2 from '../../../components/Form/TextInput2'
import Button from '../../../components/UI/Button'
import DatePicker from '../../../components/UI/DatePicker2'
import Select from '../../../components/UI/Select'

const InputAlokasi = (props) => {
  // const [pictures, setPictures] = useState([])
  // const [file, setFile] = useState('')
  const requestId = useParams().requestId
  const [requestInfo, setRequestInfo] = useState()
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [itemList, setItemList] = useState([])
  const [unitList, setUnitList] = useState([])

  const [formState, inputHandler] = useForm({
    quantity: {
      value: '',
      isValid: false
    }
  }, false)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const auth = useContext(AuthContext)

  useEffect(() => {
    const fetchRequest = () => {
      sendRequest(`${process.env.REACT_APP_BACKEND_URL}/v1/requests/${requestId}`,
        'GET',
        null,
        { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      ).then(responseData => {
        setRequestInfo(responseData)
      })
    }
    fetchRequest()
  }, [requestId, sendRequest])

  useEffect(() => {
    console.log(requestInfo)
  }, [requestInfo])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // }

  // const handleImageChange = (e) =>  {
  //   e.preventDefault()

  //   let reader = new FileReader()
  //   let file = e.target.files[0]

  //   reader.onloadend = () => {

  //     setFile(file)
  //     setImagePreviewUrl(reader.result)
  //   }

  //   reader.readAsDataURL(file)
  // }




  useEffect(() => {

    const fetchItems = () => {
      sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
        'GET',
        null,
        { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
      ).then(responseData => {
        setItemList(responseData)
        setItems(prevDonasi => ({
          ...prevDonasi,
          item_id: responseData[0].id
        }))

      })
    }

    if (auth.token) {
      fetchItems()
    }
  }, [auth.token, sendRequest])

  useEffect(() => {
    const fetchUnits = () => {
      sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
        'GET',
        null,
        { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
      ).then(responseData => {
        setUnitList(responseData)
        setItems(id => ({
          ...id,
          unit_id: responseData[0].id
        }))
      })
    }

    if (auth.token) {
      fetchUnits()
    }
  }, [auth.token, sendRequest])

  const submitHandler = () => {
    console.log(items.item_id, items.unit_id, formState.inputs.quantity.value, items.date_num)
    sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/v1/allocations`,
      'POST',
      JSON.stringify({
        date: items.date_num,
        items: [
          {
            item_id: items.item_id,
            unit_id: items.unit_id,
            quantity: formState.inputs.quantity.value,

          }
        ]
      }),
      { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
    ).then(responseData => {
      console.log(responseData)
    })
  }

  const fileUploadButton = () => {
    document.getElementById('fileButton').click()
  }


  const [items, setItems] = useState(
    {
      item_id: '',
      unit_id: '',
      date_num: ''
    }
  )

  const changeItem = (item_id) => {
    setItems({
      ...items,
      item_id: item_id
    })
  }

  const changeUnit = (unit_id) => {
    setItems({
      ...items,
      unit_id: unit_id
    })
  }

  const changeDate = (date_num) => {
    setItems({
      ...items,
      date_num: date_num
    })
  }



  let $imagePreview = null
  if (imagePreviewUrl) {
    $imagePreview = (<img className={`bg-gray-400 text-gray-700 rounded-md w-full  `}
      style={{ width: 400, maxHeight: 300 }}
      src={imagePreviewUrl} />)
  }



  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="flex flex-row h-full w-full">

        <Sidebar role="" name="ADMIN" links={links} />
        <div className="flex w-full flex-col p-8 md:p-12">
          <h3 className="font-bold text-sm lg:text-base mb-2 text-gray-800 capitalize">Penerima : {requestInfo && requestInfo.donationApplicant.name}</h3>
          <p className="text-gray-800 mb-2 text-sm lg:text-base">Daftar Kebutuhan :</p>
          {!requestInfo ? <LoadingSpinner /> :
            <React.Fragment>
              <div className="mb-6">
                {requestInfo.requestItems.map(request => (
                  <div key={request.id} className="pb-1 mb-2 border-gray-500 border-solid border-b-2 inline-block">
                    <p className="font-medium text-sm">{request.item}<span className="ml-12 pr-12">{request.quantity} {request.unit}</span></p>
                  </div>
                ))}
              </div>
            </React.Fragment>
          }
          <Title>Alokasikan Bantuan</Title>

          <form onSubmit={submitHandler} className="mt-2">

            <div className="flex flex-col lg:flex-row w-full lg:mb-5 lg:border-none lg:shadow-none border-gray-700 rounded-md shadow-lg lg:p-0 p-4 relative">
              <Select
                onSelectChange={changeItem}
                label="Jenis Barang"
                divClassName="mr-3 lg:w-6/12 w-full mt-2 lg:mt-0"
                arrayList={itemList}
              />

              <TextInput2
                divClassName="lg:w-6/12 w-full lg:4/12 lg:mr-3"
                id="quantity"
                type="text"
                label="Kuantitas"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                changeUnit={changeUnit}
                errorText="Mohon masukkan kuantitas barang."
                list={unitList}
                value={items.unit_id}
              />
            </div>

            <div className="flex flex-col lg:flex-row w-full lg:mb-5 lg:border-none lg:shadow-none border-gray-700 rounded-md shadow-lg lg:p-0 p-4 relative mb-5">
              <DatePicker
                label="Tanggal Penyerahan"
                divClassName="lg:w-6/12 w-full mt-2 lg:mt-0"
                onSelectChange={changeDate}/>
            </div>
          </form>

          <div className="flex flex-col w-full lg:mb-5">
            <Button
              onClick={submitHandler}
              width={200}
              type="submit"
              disabled={!formState.isValid}>
              {isLoading ? <LoadingSpinner color="white" style={{ transform: 'translateY(-3px)' }} /> : 'SUBMIT'}
            </Button>
          </div>

        </div>
      </div>

    </React.Fragment>
  )
}

export default InputAlokasi