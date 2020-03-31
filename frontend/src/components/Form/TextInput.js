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

    let isFilled = inputState.value.length > 0

    const{id, onInput} = props
    const{value, isValid} = inputState

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, onInput, isValid, value])

    const changeHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value, validators: props.validators})
    }

    const touchHandler = () => {
        dispatch({type: 'TOUCH'})
    }

    return (
        <div className={`flex flex-col ${props.divClassName}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                className="mb-3 w-full"
                style={{width: props.width, maxWidth: props.maxWidth}} 
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler} />
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText} </p>}
        </div>
    )
}

export default TextInput