export const SET_ITEMS = 'SET_ITEMS'
export const SET_UNITS = 'SET_UNITS'

export const setItems = items => {
    return {type: SET_ITEMS, items}
}

export const setUnits = units => {
    return {type: SET_UNITS, units}
}