export const SET_SUBMITTED = 'SET_SUBMITTED'
export const SET_DEMAND_IS_FETCHED = 'SET_DEMAND_IS_FETCHED'

export const setSubmitted = isSubmit => {
    return {type: SET_SUBMITTED, submit: isSubmit}
}

export const setDemandIsFetched = demands => {
    return {type: SET_DEMAND_IS_FETCHED, demandItems: demands}
}