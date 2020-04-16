import "react-datepicker/dist/react-datepicker.css";
import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker";

const MaterialUIPickers = (props) => {

  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) =>  {
    setStartDate(date)
    if(props.onSelectChange) props.onSelectChange(date)
    // console.log('dari date picker');
    // console.log(date);

  }

  useEffect( 

    () => {
      if(props.onSelectChange) props.onSelectChange(startDate)
      console.log(startDate);
    }, []
    
  );

  return (
    <div className={`flex flex-col ${props.divClassName}`}>
      <label htmlFor={props.id} className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">{props.label}</label>
        <DatePicker
          className={`mb-3 w-full bg-gray-400 text-blue-700 p-2 rounded-md focus:outline-none ${props.className}`}
          style={{width: props.width, maxWidth: props.maxWidth}} 
          showPopperArrow={false}
          selected={startDate}
          onChange={date => handleChange(date)}
        />
    </div> 
  );
};

export default MaterialUIPickers


// onChange={date => setStartDate(date)}