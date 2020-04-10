import React, { useState, useEffect } from 'react'
import {useHttpClient} from '../../hooks/http-hook'

const Select2 = props  => {

    const {isLoading, error, sendRequest} = useHttpClient('')

    return (
        <div className={`flex flex-col ${props.divClassName}`}>
            <label htmlFor={props.id} className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">{props.label}</label>
            <select
            className={`w-full bg-gray-400 mb-3 bg-gray-400 text-blue-700 p-2 rounded-md w-20 text-center`} 
            style={{width: props.width, maxWidth: props.maxWidth, height: 40}} 
            value={props.list}
            onChange={e => {
                console.log(e.target)
                props.changeItem(e.target.name, e.target.value)
            }}
            >
            {props.list.map(item => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
            {/* {['Masker', 'Hand Sanitizer'].map(item => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))} */}
            </select>
        </div>
    );
};


export default Select2 






