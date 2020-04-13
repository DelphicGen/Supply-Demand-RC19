import React, {useEffect, useState, useContext} from 'react'
import ImageUploader from "react-images-upload";
import {AddCircle, Delete} from '@material-ui/icons'
import {links} from '../../../components/Dashboard/adminLink'
import {AuthContext} from '../../../context/auth-context'
import {useForm} from '../../../hooks/form-hook'
import {useHttpClient} from '../../../hooks/http-hook'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_PASSWORD}from '../../../util/validator'

import Sidebar from '../../../components/Dashboard/SideBar'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import ErrorText from '../../../components/UI/ErrorText'
import Title from '../../../components/Dashboard/Title'
import WhiteButton from '../../../components/UI/WhiteButton'
import TextInput from '../../../components/Form/TextInput'
import Button from '../../../components/UI/Button'
import DatePicker from '../../../components/UI/DatePicker2'
import Select from '../../../components/UI/Select'

const AlokasiBantuan = (props) => {
  const [test, setTest] = useState([])
  const [pictures, setPictures] = useState([]);
  const [file, setFile] = useState('')
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [items, setItems] = useState([])
  const [formState, inputHandler] = useForm({
      itemName: {
          value: '',
          isValid: false
      }
  }, false)
  const {isLoading, error, sendRequest} = useHttpClient()
  const auth = useContext(AuthContext)


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleImageChange = (e) =>  {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {

      setFile(file)
      setImagePreviewUrl(reader.result)
    }

    reader.readAsDataURL(file)
  }

 
  useEffect(() => {
    
    const fetchItems = () => {
        sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
          'GET',
          null,
          {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
        ).then(responseData => {
            console.log(responseData);
        })
    }
    fetchItems()
  }, [auth.token, sendRequest])

  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };

  const deleteItem = id => {
      sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/v1/items/${id}`,
          'DELETE',
          null,
          {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
      ).then(() => setItems(prevItem => prevItem.filter(item => item.id !== id)))
      // setItems(prevItem => prevItem.filter(item => item.id !== id))
    }
    
   

  const addItem = event => {
      event.preventDefault()
      sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/v1/allocations`,
          'POST',
          JSON.stringify({
              name: formState.inputs.itemName.value
          }),
          {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
      ).then(responseData => {
          setItems(prevItem => prevItem.concat({
              id: responseData.id,
              name: responseData.name,
              delete: (
                  {/* <WhiteButton width={120} onClick={() => deleteItem(responseData.id)}>
                      <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
                  </WhiteButton> */}
              )
          }))
      })
      // setItems(prevItem => prevItem.concat({
      //     id: prevItem.length + 1, 
      //     item: formState.inputs.itemName.value, 
      //     delete: (
      //         <WhiteButton width={120} onClick={() => deleteItem(prevItem.length + 1)}>
      //             <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
      //         </WhiteButton>
      //     )
      // }))
      
    }

    function onSelectChange(event) {
      console.log(event.target.value);
    }

    const add = event => {
      event.preventDefault()
      sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/v1/allocations`,
          'POST',
          JSON.stringify({
              name: formState.inputs.itemName.value
          }),
          {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
      ).then(responseData => {
          setItems(prevItem => prevItem.concat({
              id: responseData.id,
              name: responseData.name,
              delete: (
                  <WhiteButton width={120} onClick={() => deleteItem(responseData.id)}>
                      <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
                  </WhiteButton>
              )
          }))
      })
      // setItems(prevItem => prevItem.concat({
      //     id: prevItem.length + 1, 
      //     item: formState.inputs.itemName.value, 
      //     delete: (
      //         <WhiteButton width={120} onClick={() => deleteItem(prevItem.length + 1)}>
      //             <Delete className="text-blue-800 mr-2" fontSize="inherit" /><span className="text-sm pt-1">HAPUS</span>
      //         </WhiteButton>
      //     )
      // }))
    }

    const fileUploadButton = () => {
        document.getElementById('fileButton').click();
    }
    

    const [selectedData, updateSelectedData] = useState("");

    const handleChange = (data) =>  {
      updateSelectedData(data)
      console.log(data);
      
    }

  

    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className=""
      style={{width: 400, maxHeight: 300}}  
      src={imagePreviewUrl} />);
    }

    

    return(

        <div className="flex flex-row h-full w-full">

            <Sidebar role="" name="ADMIN" links={links} />

            <div className="flex w-full flex-col p-8 md:p-16">
                <Title>Alokasikan Bantuan</Title>

                
                <form onSubmit={addItem} className="">
            
                <div className="flex flex-col lg:flex-row w-full lg:mb-5">
                   
                     <Select 
                      onSelectChange={handleChange}
                     label="Lembaga Penerima"
                     divClassName="mr-3 w-2/5"
                      arrayList={["map",2,3,3,4]} 
                      />

                    {/* <TextInput
                    divClassName="w-2/5 lg:4/12 "
                    id="itemName"
                    type="text"
                    label="Tanggal Penyerahan"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Mohon masukkan nama barang."
                   /> */}

                  <DatePicker 
                  label="Tanggal Penyerahan" 
                  divClassName="w-2/5"
                  />

                </div>
                

                <div className="flex flex-col lg:flex-row w-full lg:mb-5">
                     <Select 
                     
                      label="Jenis Barang"
                      divClassName="mr-3 w-2/5"
                      arrayList={[1,2,3,3,4]}/>

              
                    <TextInput
                    divClassName="w-1/5 lg:4/12 lg:mr-3"
                    id="itemName"
                    type="text"
                    label="Kuantitas"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Mohon masukkan kuantitas barang."
                    />

                    <Select 
                      placeholde={`as`}
                      arrayList={[1,2,3,3,4]}
                      divClassName="w-1/5 lg:4/12 lg:mr-3 lg:mt-6"/>


                          
                
                </div>


                <div className="flex flex-col w-full lg:mb-5">
                 
                   
                  <label htmlFor={props.id} className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">Upload Foto Penyerahan</label>

                  <div>
                    <form onSubmit={handleSubmit}>
                      <input id="fileButton" type="file" hidden onChange={handleImageChange} />
                      {/* <button type="submit" onClick={handleSubmit}>Upload Image</button> */}
                    </form>
                    {$imagePreview}
                  </div>




                  {/* white loading button */}
                  <div>
                  <WhiteButton width={125} type="submit" className="md:mt-3">
                        {!isLoading ? 
                            <React.Fragment>
                                <AddCircle className="text-blue-800 mr-2" fontSize="inherit" /> <span onClick={fileUploadButton} className="text-sm pt-1">Upload</span>
                            </React.Fragment> : 
                            <LoadingSpinner style={{transform: 'translateY(-3px)'}} />
                        }
                    </WhiteButton>

                  </div>

                  <Button
                    width={200}
                  
                    type="submit"
                      >{isLoading ? <LoadingSpinner color="white" style={{transform: 'translateY(-3px)'}} /> : 'SUBMIT'} </Button>

                     

                </div>

              

                </form>
                {/* Text-error */}
                {error && <ErrorText>{error}</ErrorText>}
            </div>

            

        </div>

        
    )
}

export default AlokasiBantuan