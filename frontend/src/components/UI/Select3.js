import React, { useState, useEffect } from 'react'

const Select3 = props  => {

    const [indeks, setIndeks] = useState(props.selectedIndex)

    useEffect(() => {
        setIndeks(props.selectedIndex)
    }, [props.selectedIndex])

    return (
        <div className={`flex flex-col ${props.divClassName}`}>
            <select
                className={`w-full bg-gray-400 mb-3 bg-gray-400 text-blue-700 p-2 rounded-md w-20 text-center`} 
                style={{width: props.width, maxWidth: props.maxWidth, height: 40}} 
                onChange={e => {
                    props.changeUnit(e.target.value)
                }}
            >
            if(props.list){
              props.list.map((unit, index) => {
                if(index === indeks){
                    return(
                        <option key={unit.id} value={unit.id} defaultValue>
                            {unit.name}
                        </option>
                    )   
                }
                else{
                    return(
                        <option key={unit.id} value={unit.id}>
                            {unit.name}
                        </option>
                    )
                }
            })}
            
            </select>
        </div>
    );
};


export default Select3






