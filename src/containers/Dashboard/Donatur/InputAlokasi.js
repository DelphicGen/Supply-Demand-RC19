import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { links } from '../../../components/Dashboard/donaturLink'
import { AuthContext } from '../../../context/auth-context'
import { useForm } from '../../../hooks/form-hook'
import { useHttpClient } from '../../../hooks/http-hook'
import { VALIDATOR_REQUIRE, VALIDATOR_NUMBER } from '../../../util/validator'

import Sidebar from '../../../components/Dashboard/SideBar'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Title from '../../../components/Dashboard/Title'
import ErrorModal from '../../../components/UI/ErrorModal'
import TextInput2 from '../../../components/Form/TextInput2'
import Button from '../../../components/UI/Button'
import DatePicker from '../../../components/UI/DatePicker2'
import Select from '../../../components/UI/Select'

const InputAlokasi = () => {
  const requestId = useParams().requestId
  const [requestInfo, setRequestInfo] = useState()
  const [submitError, setSubmitError] = useState()
  const [itemList, setItemList] = useState([])
  const [unitList, setUnitList] = useState([])
  const [items, setItems] = useState(
    {
      item_id: '',
      unit_id: '',
      date_num: ''
    }
  )

  const [formState, inputHandler] = useForm({
    quantity: {
      value: '',
      isValid: false
    }
  }, false)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const auth = useContext(AuthContext)

  useEffect(() => {
    console.log(items.date_num)
  }, [items.date_num])

  useEffect(() => {
    const fetchRequest = () => {
      sendRequest(`${process.env.REACT_APP_BACKEND_URL}/v1/requests/${requestId}`,
        'GET',
        null,
        { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      ).then(responseData => {
        setRequestInfo(responseData)
        setItems(prev => ({
          ...prev,
          item_id: responseData.requestItems[0].item.id
        }))
        setItems(prev => ({
          ...prev,
          unit_id: responseData.requestItems[0].unit.id
        }))
        let newItemList = []
        let newUnitList = []
        responseData.requestItems.forEach(req => {
          newItemList.push(req.item)
          newUnitList.push(req.unit)
        })
        setItemList(newItemList)
        setUnitList(newUnitList)
      })
    }
    fetchRequest()
  }, [requestId, sendRequest])

  const submitHandler = () => {
    sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/v1/allocations`,
      'POST',
      JSON.stringify({
        requestID: requestId,
        date: items.date_num,
        items: [
          {
            item_id: items.item_id,
            unit_id: items.unit_id,
            quantity: formState.inputs.quantity.value
          }
        ]
      }),
      { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
    ).then(responseData => {
      if (responseData.error) {
        setSubmitError(responseData.error)
      }
    })
  }

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

  const clearSubmitError = () => {
    setSubmitError(null)
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <ErrorModal error={submitError} onClear={clearSubmitError} />
      <div className="flex flex-row h-full w-full">

        <Sidebar role="Donatur" name={auth.name} links={links} />
        <div className="flex w-full flex-col p-8 md:p-12 md:pr-16">
          <h3 className="font-bold text-sm lg:text-base mb-2 text-gray-800 capitalize">Penerima : {requestInfo && requestInfo.donationApplicant.name}</h3>
          <p className="text-gray-800 mb-2 text-sm">Daftar Kebutuhan :</p>
          {!requestInfo ? <LoadingSpinner /> :
            <React.Fragment>
              <div className="mb-6">
                {requestInfo.requestItems.map(request => (
                  <div className="block" key={request.id}>
                    <div className="pb-1 mb-2 border-gray-500 border-solid border-b-2 inline-block">
                      <p className="font-medium text-sm capitalize">
                        <span className="inline-block w-20">{request.item.name}</span>
                        <span className="ml-6 w-20 mr-5 inline-block">{(request.quantity % 1 === 0) ? Math.round(request.quantity) : request.quantity} {request.unit.name}</span>
                      </p>
                    </div>
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
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
                onInput={inputHandler}
                changeUnit={changeUnit}
                hideDelete={true}
                errorText="Mohon masukkan kuantitas barang dengan benar."
                list={unitList}
              />
            </div>

            <div className="flex flex-col lg:flex-row w-full lg:mb-5 lg:border-none lg:shadow-none border-gray-700 rounded-md shadow-lg lg:p-0 p-4 relative mb-5">
              <DatePicker
                label="Tanggal Penyerahan"
                divClassName="lg:w-6/12 w-full mt-2 lg:mt-0"
                onSelectChange={changeDate} />
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