import React, {useState} from 'react'

const Select =  (props, )  => {

  const [arrayList] = useState(props.arrayList);
  const [selectedData, updateSelectedData] = useState("");


  const handleChange = (event) =>  {
    updateSelectedData(event.target.value)
    if(props.onSelectChange) props.onSelectChange(event.target.value)

  }

  let options  = arrayList.map(data => (
    <option key={data.id} value={data}>
      {data}
    </option>
  ));


    return (
      <div className={`flex flex-col ${props.divClassName}`}>
        <label htmlFor={props.id} className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">{props.label}</label>
        <select
          value={selectedData}
          className={`w-full bg-gray-400 mb-3 bg-gray-400 text-blue-700 p-2 rounded-md w-20 text-center`} 
          style={{width: props.width, maxWidth: props.maxWidth, height: 40}} 
          onChange={handleChange}
          >

          {options}
        </select>
      </div>
    );
 

  
};

export default Select 