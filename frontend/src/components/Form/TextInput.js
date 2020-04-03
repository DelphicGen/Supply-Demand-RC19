import React, {useReducer, useEffect} from 'react'
import {validate} from '../../util/validator'

const inputReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'TOUCH':
            return{
                ...state,
                isTouched: true
            }
        default:
            return state
    }
}

const TextInput = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || '', 
        isValid: props.valid || false, 
        isTouched: false,
    })

    const{id, onInput} = props
    const{value, isValid} = inputState

    useEffect(() => {
        onInput(id, value, isValid)
    }, [onInput, id, value, isValid])

    const changeHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value, validators: props.validators})
    }

    const touchHandler = () => {
        dispatch({type: 'TOUCH'})
    }

    return (
        <div className={`flex flex-col ${props.divClassName}`}>
            <label htmlFor={props.id} className="text-gray-700 tracking-widest font-medium text-sm md:text-base my-1">{props.label}</label>
            <input
                className={`mb-3 w-full bg-gray-400 text-gray-700 p-2 rounded-md focus:outline-none ${props.className}`}
                style={{width: props.width, maxWidth: props.maxWidth}} 
                id={props.id}
                type={props.type}
                value={inputState.value}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler} />
            {!inputState.isValid && inputState.isTouched && <p className="text-xs text-red-800 font-medium tracking-wider mt-1">{props.errorText} </p>}
        </div>
    )
}

export default TextInput