import { SET_ITEMS, SET_UNITS } from "../action/item"

const initialState = {
    item: [],
    unit: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_ITEMS:
            const fetchedItems = action.items
            return{
                ...state,
                item: fetchedItems
            }
        case SET_UNITS:
            const fetchedUnits = action.units
            return{
                ...state,
                unit: fetchedUnits
            }
        default:
            return state
    }
}