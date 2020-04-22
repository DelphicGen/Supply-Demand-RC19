import React, {useReducer, useEffect, useState} from 'react'
import {validate} from '../../util/validator'
import { useMediaQuery } from '../../hooks/medquery-hook'
import { Delete } from '@material-ui/icons'
import Select3 from '../UI/Select3'

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

const TextInput2 = props => {
    const mediaQuery = useMediaQuery('(max-width: 600px)')
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
            <label htmlFor={props.id} className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">{props.label}</label>
            <div className="flex">
                <div className="w-1/2">
                    <input
                        className={`mb-3 inline-block w-full bg-gray-400 text-gray-700 p-2 rounded-md tex-sm font-semibold tracking-wide outline-none focus:shadow-outline focus:text-blue-700 ${props.className}`}
                        style={{width: props.width, maxWidth: props.maxWidth}} 
                        id={props.id}
                        type={props.type}
                        value={inputState.value}
                        placeholder={props.placeholder}
                        onChange={changeHandler}
                        onBlur={touchHandler} 
                    />

                    {!inputState.isValid && inputState.isTouched && <p className="text-xs text-red-800 font-medium tracking-wider mb-3">{props.errorText} </p>}
                </div>
                <Select3
                    divClassName="ml-2 w-1/2 inline-block"
                    list={props.list}
                    changeUnit={props.changeUnit}
                    selectedIndex={ props.selectedIndex }
                    value={props.value}
                    index={ props.index }
                />
                <Delete className="text-gray-700 mr-2 ml-5 mt-2 text-sm lg:relative absolute top-0 right-0" style={styles.container(mediaQuery)} onClick={() => props.deleteItem(props.index)} />
                
            </div>
        </div>
    )
}
const styles = {
    container: mediaQuery => ({
        fontSize: mediaQuery ? '15' : '25'
    })
};


export default TextInput2