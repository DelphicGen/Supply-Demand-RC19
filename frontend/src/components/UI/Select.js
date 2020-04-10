import React, {useState} from 'react'

const Select = props  => {
const [pageSize, setPageSize] = useState();

  return (
    <div className={`flex flex-col ${props.divClassName}`}>
      <label htmlFor={props.id} className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">{props.label}</label>
      <select
        className={`w-full bg-gray-400 mb-3 bg-gray-400 text-blue-700 p-2 rounded-md w-20 text-center`} 
        style={{width: props.width, maxWidth: props.maxWidth, height: 40}} 
        value={pageSize}
        onChange={e => {
            setPageSize(Number(e.target.value))
        }}
        >
        {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
            {pageSize}
            </option>
        ))}
      </select>
    </div>
  );
};

export default Select 