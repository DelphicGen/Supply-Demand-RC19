import React, {useState} from 'react'

const Select =  (props)  => {

  
  const [selectedData, updateSelectedData] = useState("");


  const handleChange = (event) =>  {
    updateSelectedData(event.target.value)
    if(props.onSelectChange) props.onSelectChange(event.target.value)

  }


    return (
      <div className={`flex flex-col ${props.divClassName}`}>
        <label htmlFor={props.id} className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">{props.label}</label>
        <select
          value={selectedData}
          className={`w-full bg-gray-400 mb-3 bg-gray-400 text-gray-700 p-2 rounded-md w-20 text-center font-semibold text-sm`} 
          style={{width: props.width, maxWidth: props.maxWidth, height: 40}} 
          onChange={handleChange}
          >
          <option className="text-gray-700 font-semibold text-sm outline-none capitalize" defaultValue disabled>Select Item</option>
          if(props.arrayList) {
            props.arrayList.map((item, index) => (
            <option key={item.id} value={item.name} className="text-gray-700 font-semibold text-sm outline-none capitalize" >
              {item.name}
            </option> 
           ))
          }
        </select>
      </div>
    );
};

export default Select 