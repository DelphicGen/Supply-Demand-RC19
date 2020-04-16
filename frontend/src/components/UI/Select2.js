import React, { useState, useEffect, useContext } from 'react'
// import {testProvider} from '../../containers/Dashboard/Donatur/UpdateDonasi'

const Select2 = props  => {

    const [selected, setSelected] = useState(props.selected)
    const [indeks, setIndeks] = useState(props.selectedIndex)

    useEffect(() => {
        setIndeks(props.selectedIndex)
    }, [props.selectedIndex])

    return (
        <div className={`flex flex-col ${props.divClassName}`}>
            <label htmlFor={props.id} className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">{props.label}</label>
            <select
            className={`w-full bg-gray-400 mb-3 bg-gray-400 text-gray-700 font-semibold outline-none p-2 rounded-md w-20 text-center`} 
            style={{width: props.width, maxWidth: props.maxWidth, height: 40}} 
            onChange={e => {
                props.changeItem(e.target.value)
                setSelected(e.target.value)
            }}
            >
            {props.list.map((item, index) => {
                if(index === indeks){
                    return(
                        <option key={item.id} value={item.id} selected className="text-gray-700 font-semibold text-sm outline-none capitalize">
                            {item.name}
                        </option>
                    )   
                }
                else{
                    return(
                        <option key={item.id} value={item.id} className="text-gray-700 font-semibold text-sm outline-none capitalize">
                            {item.name}
                        </option>
                    )
                }
            })}
            </select>
        </div>
    );
};


export default Select2 






