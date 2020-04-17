import React, {useEffect, useState, useContext} from 'react'
import ImageUploader from "react-images-upload";

import {links} from '../../../components/Dashboard/adminLink'
import {AuthContext} from '../../../context/auth-context'
import {useForm} from '../../../hooks/form-hook'
import {useHttpClient} from '../../../hooks/http-hook'
import { VALIDATOR_REQUIRE}from '../../../util/validator'

import Sidebar from '../../../components/Dashboard/SideBar'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import ErrorText from '../../../components/UI/ErrorText'
import Title from '../../../components/Dashboard/Title'

import TextInput from '../../../components/Form/TextInput'
import Button from '../../../components/UI/Button'
import DatePicker from '../../../components/UI/DatePicker2'
import Select from '../../../components/UI/Select'

const AlokasiBantuan = (props) => {
  // const [pictures, setPictures] = useState([]);
  // const [file, setFile] = useState('')
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [itemList, setItemList] = useState([]) 
  const [unitList, setUnitList] = useState([]) 
  const [lembagaList, setLembagaList] = useState([])
  const [units, setUnits] = useState([])

  const [formState, inputHandler] = useForm({
      quantity: {
        value: '',
        isValid: false
    }
  }, false)
  const {isLoading, error, sendRequest} = useHttpClient()
  const auth = useContext(AuthContext)

  // let kebutuhanData = JSON.parse(localStorage.getItem('kebutuhan'))




  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // }

  // const handleImageChange = (e) =>  {
  //   e.preventDefault();

  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   reader.onloadend = () => {

  //     setFile(file)
  //     setImagePreviewUrl(reader.result)
  //   }

  //   reader.readAsDataURL(file)
  // }

  

 
  useEffect(() => {

    // localStorage.setItem('kebutuhan', {
    //   penerima: 'Puskesmas Depok',
    //   daftarKebutuhan: [
    //     { 
    //       id: 1,
    //       item: 'Hand Sanitizer',
    //       kuantitas: '12',
    //       unit: 'linter'
    //     },
    //     { id: 1,
    //       item: 'Hand Sanitizer',
    //       kuantitas: '12',
    //       unit: 'linter'
    //     }
    //   ],
    //   tanggal: '11 Januari 2020'
    // })
    
    const fetchItems = () => {
        sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
          'GET',
          null,
          {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
          console.log(responseData)
          setItemList(responseData)
          setItems(prevDonasi => ({
              ...prevDonasi,
              item_id: responseData[0].id
          }))

        })
    }

    const fetchLembaga = () => {
      sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/v1/requests`,
        'GET',
        null,
        {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
      ).then(responseData => {
        let data = responseData.data
        console.log(responseData.data)
        console.log('applicant lembaga');
     

        let lembagaListTemp = []
        
        if(data != null ){
          data.forEach(element => {
            let applicantName = element.donationApplicant.name
            let applicantId  = element.donationApplicant.id
            let applicantRequest = element.requestItems
            applicantRequest.forEach(item => {
              console.log(item);
               lembagaListTemp.push({
                  id: item.id,
                  name : `lembaga ${applicantName} butuh ${item.item} jumlah ${item.quantity} ${item.unit}`
                })
            })


        

          });
        }
        console.log('lembaga lsit temp');
        console.log(lembagaListTemp);
        setLembagaList(lembagaListTemp)
        // lembaga1.push(lembagaListTemp)
       
        // setItems(prevLembaga => ({
        //     ...prevLembaga,
        //     unit_id: responseData[0].donationApplicant.role
        // }))

      })
  }

  if(auth.token){
         fetchItems()
         fetchLembaga()
    }
  }, [auth.token, sendRequest])

  useEffect(() => {
    const fetchUnits = () => {
        sendRequest(
         `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
         'GET',
         null,
         {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            console.log(responseData);
            console.log('log unit');
            setUnitList(responseData)
            setItems(id => ({
              ...id,
              unit_id: responseData[0].id
            }))
            

            if(responseData){
            //  responseData.forEach(data => data.delete = (
            //      <WhiteButton width={120} onClick={() => deleteUnit(data.id)}>
            //          <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
            //      </WhiteButton>
            //  ))
             setUnits(responseData)
            }

            console.log(units);
            console.log('clg state unit');
           
        })
    }

    if(auth.token){
         fetchUnits()
    }
 }, [auth.token, sendRequest])

 const submitHandler = () => {
  console.log('data submit');
  console.log(items.item_id, items.unit_id, formState.inputs.quantity.value ,items.date_num);
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
      {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
  ).then(responseData => {
      console.log('ini respon data');
      console.log(responseData)
      console.log('ini respon data end');
      // if(responseData.id.length > 0){
      //     inputHandler("quantity", '', false)
      //     setSubmit(true)
      //     setCheck(true)
      //     flashMessage()
      // }
      // else{
      //     setSubmit(true)
      //     setCheck(false)
      //     flashMessage()
      // }
  })
}

  // const addItem = event => {
  //     event.preventDefault()
  //     sendRequest(
  //         `${process.env.REACT_APP_BACKEND_URL}/v1/allocations`,
  //         'POST',
  //         JSON.stringify({
  //             name: formState.inputs.itemName.value
  //         }),
  //         {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
  //     ).then(responseData => {
  //         setItems(prevItem => prevItem.concat({
  //             id: responseData.id,
  //             name: responseData.name,
  //             delete: (
  //                 <WhiteButton width={120} onClick={() => deleteItem(responseData.id)}>
  //                     <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
  //                 </WhiteButton>
  //             )
  //         }))
  //     })
  //     setItems(prevItem => prevItem.concat({
  //         id: prevItem.length + 1, 
  //         item: formState.inputs.itemName.value, 
  //         delete: (
  //             <WhiteButton width={120} onClick={() => deleteItem(prevItem.length + 1)}>
  //                 <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
  //             </WhiteButton>
  //         )
  //     }))
      
  //   }

  

    // const add = event => {
    //   event.preventDefault()
    //   sendRequest(
    //       `${process.env.REACT_APP_BACKEND_URL}/v1/allocations`,
    //       'POST',
    //       JSON.stringify({
    //           name: formState.inputs.itemName.value
    //       }),
    //       {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
    //   ).then(responseData => {
    //       setItems(prevItem => prevItem.concat({
    //           id: responseData.id,
    //           name: responseData.name,
    //           delete: (
    //               <WhiteButton width={120} onClick={() => deleteItem(responseData.id)}>
    //                   <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
    //               </WhiteButton>
    //           )
    //       }))
    //   })
    //   // setItems(prevItem => prevItem.concat({
    //   //     id: prevItem.length + 1, 
    //   //     item: formState.inputs.itemName.value, 
    //   //     delete: (
    //   //         <WhiteButton width={120} onClick={() => deleteItem(prevItem.length + 1)}>
    //   //             <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
    //   //         </WhiteButton>
    //   //     )
    //   // }))
    // }

    const fileUploadButton = () => {
        document.getElementById('fileButton').click();
    }


    const [items, setItems] = useState(
      {
          item_id: '',
          unit_id: '',
          lembaga_id: '',
          date_num: ''
      }
    )
    

    const [selectedData, updateSelectedData] = useState("");

    const handleChange = (data) =>  {
      updateSelectedData(data)
      console.log(data);
      
    }

    const changeLembaga = (lembaga_id) => {
      setItems({
          ...items,
          lembaga_id: lembaga_id
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

    const lembaga1 = [{name: 'rs panti rapih', id: 1}, {name: 'rs bhayangkara', id:2}]

  

    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className={`bg-gray-400 text-gray-700 rounded-md w-full  `}
      style={{width: 400, maxHeight: 300}}  
      src={imagePreviewUrl} />);
    }

    

    return(

        <div className="flex flex-row h-full w-full">

            <Sidebar role="" name="ADMIN" links={links} />

         
            

            <div className="flex w-full flex-col p-8 md:p-16">

              <div>
                <Title>Penerima: Puskesmas Depok</Title>

                <label className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">Daftar Kebutuhan</label>

                <div className="flex flex-col lg:flex-row w-full lg:mb-5">
                <h4 className="text-left text-xs md:text-sm font-medium md:font-semibold pr-3 py-4">Hand Sanitizer</h4>
                <h4 className="text-left text-xs md:text-sm font-medium md:font-semibold px-3 py-4">50 Liter</h4>
              
                </div>

                





                </div>

                


                <Title>Alokasikan Bantuan</Title>

                
                <form onSubmit={submitHandler} className="">
            
                <div className="flex flex-col lg:flex-row w-full lg:mb-5">
                   
                <Select 
                      onSelectChange={changeLembaga}
                      label="Permohonan"
                      divClassName="mr-3 w-2/5"
                      arrayList={lembagaList} 
                      />

      
                  <DatePicker 
                  label="Tanggal Penyerahan" 
                  divClassName="w-2/5"
                  onSelectChange={changeDate}
                  />

                </div>
                

                <div className="flex flex-col lg:flex-row w-full lg:mb-5">
                     <Select 
                      onSelectChange={changeItem}
                      label="Jenis Barang"
                      divClassName="mr-3 w-2/5"
                      arrayList={itemList} 
                      />

              
                    <TextInput
                        divClassName="w-1/5 lg:4/12 lg:mr-3"
                        id="quantity"
                        type="text"
                        label="Kuantitas"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Mohon masukkan nama barang."
                    />

                    <Select 
                        arrayList={unitList} 
                        onSelectChange={changeUnit}
                        label="Jenis Barang"
                        divClassName="mr-3 w-1/5"/>
                </div>

                </form>

                <div className="flex flex-col w-full lg:mb-5">

                  <Button
                    onClick={submitHandler}
                    width={200}
                    type="submit"
                    disabled={!formState.isValid}>
                    {isLoading ? <LoadingSpinner color="white" style={{transform: 'translateY(-3px)'}} /> : 'SUBMIT'}
                  </Button>

                    

              </div>

          
                {/* Text-error */}
                {error && <ErrorText>{error}</ErrorText>}
            </div>

            

        </div>

        
    )
}

export default AlokasiBantuan