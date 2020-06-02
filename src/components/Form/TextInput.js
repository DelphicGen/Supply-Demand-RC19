import React, {useReducer, useEffect, useState} from 'react'
import {RemoveRedEye, Clear} from '@material-ui/icons'
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
        case 'CLEAR':
            return{
                ...state,
                value: ''
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

    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        onInput(id, value, isValid)
    }, [onInput, id, value, isValid])

    const changeHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value, validators: props.validators})
    }

    const touchHandler = () => {
        dispatch({type: 'TOUCH'})
    }

    const clearHandler = () => {
        dispatch({type: 'CLEAR'})
    }

    if(props.isPassword){
        return(
            <div className={`flex flex-col ${props.divClassName}`}>
            <label htmlFor={props.id} className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">{props.label}</label>
            <div className="relative w-full">
                <input
                    className={`mb-3 w-full bg-gray-400 text-gray-700 p-2 pr-10 tex-sm font-semibold tracking-wide rounded-md outline-none focus:shadow-outline focus:text-blue-800 ${props.className}`}
                    style={{width: props.width, maxWidth: props.maxWidth}} 
                    id={props.id}
                    type={hidden ? 'password' : 'text'}
                    value={inputState.value}
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    onBlur={touchHandler} />
                <RemoveRedEye 
                    className={`${hidden ? 'text-gray-700' : 'text-blue-800'} absolute cursor-pointer`} 
                    fontSize="default"
                    style={{right: 10, top: 8}}
                    onClick={() => setHidden(prev => !prev)} />
            </div>
            {!inputState.isValid && inputState.isTouched && <p className="text-xs text-red-800 font-medium tracking-wider mb-3">{props.errorText} </p>}
        </div>            
        )
    }

    return (
        <div className={`flex flex-col ${props.divClassName}`}>
            <label htmlFor={props.id} className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">{props.label}</label>
            <div className="relative" style={props.dashboardWidth || {width: 'auto'}}>
                <input
                    className={`mb-3 w-full bg-gray-400 text-gray-700 p-2 rounded-md tex-sm font-semibold tracking-wide outline-none focus:shadow-outline focus:text-blue-800 ${props.className}`}
                    style={{width: props.width, maxWidth: props.maxWidth}} 
                    id={props.id}
                    type={props.type}
                    value={inputState.value}
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    onBlur={touchHandler} />

                {inputState.value !== '' && (
                    <Clear
                        className={`${hidden ? 'text-gray-700' : 'text-blue-800'} absolute cursor-pointer`} 
                        fontSize="small"
                        style={props.customClear || {right: 8, top: 10}}
                        onClick={clearHandler} />
                )}
            </div>
            {!inputState.isValid && inputState.isTouched && <p className="text-xs text-red-800 font-medium tracking-wider mb-3">{props.errorText} </p>}
        </div>
    )
}

export default TextInput