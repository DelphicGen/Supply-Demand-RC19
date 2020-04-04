
import React from 'react'









 const Select = props  => {



  
  return (
    <select
      className=" bg-gray-400 
      mb-3 bg-gray-400 text-blue-700 p-2 rounded-md w-20 text-center"
      style={{height:40}}
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
  );
};


export default Select 






