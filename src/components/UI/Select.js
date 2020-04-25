import React, { useState } from 'react'

const Select = (props) => {
  const [selectedData, updateSelectedData] = useState("");

  const handleChange = (event) => {
    updateSelectedData(event.target.value)
    if (props.onSelectChange) props.onSelectChange(event.target.value)

  }


  return (
    <div className={`flex ${props.landingPage ? 'flex-row' : 'flex-col'} ${props.divClassName}`}>
      <label htmlFor={props.id} className={props.landingPage ? 'mb-2 py-2 pl-0 pr-3 text-gray-800 font-semibold' : 'text-gray-700 tracking-wide font-medium text-sm md:text-base my-1'}>{props.label}</label>
      <select
        value={props.value || selectedData}
        className={`${props.landingPage ? 'w-auto mb-2' : 'w-full mb-3'} bg-gray-400 bg-gray-400 text-gray-700 p-2 rounded-md w-20 text-center font-semibold text-sm capitalize cursor-pointer outline-none focus:shadow-outline`}
        style={{ width: props.width, maxWidth: props.maxWidth, height: 40 }}
        onChange={handleChange}>
        if(props.arrayList) {
          props.arrayList.map((item, index) => (
            <option key={props.landingPage ? item.name : item.id} value={item.name} className="text-gray-700 font-semibold text-xs md:text-sm outline-none border-none capitalize cursor-pointer" >
              {item.name}
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default Select 