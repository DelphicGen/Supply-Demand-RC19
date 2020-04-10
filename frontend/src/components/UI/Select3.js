import React, { useState, useEffect } from 'react'

const Select3 = props  => {

    const [selectedUnit, setSelectedUnit] = useState('')

    return (
        <div className={`flex flex-col ${props.divClassName}`}>
            <select
                className={`w-full bg-gray-400 mb-3 bg-gray-400 text-blue-700 p-2 rounded-md w-20 text-center`} 
                style={{width: props.width, maxWidth: props.maxWidth, height: 40}} 
                value={selectedUnit}
                onChange={e => {
                    setSelectedUnit(e.target.value)
                }}
            >
            {/* Masih error karena blm ada unit */}
            {/* {props.list.map(unit => (
                <option key={unit.id} value={unit.id}>
                    {unit}
                </option>
            ))} */}
            {['Liter', 'Kg', 'Botol', 'Kotak', 'Buah'].map(unit => (
                <option key={unit} value={unit}>
                    {unit}
                </option>
            ))}
            </select>
        </div>
    );
};


export default Select3






