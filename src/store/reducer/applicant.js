import { SET_SUBMITTED, SET_DEMAND_IS_FETCHED } from "../action/applicant"

const initialState = {
    isSubmit: false,
    demandItems: null,
    isDemandFetched: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_SUBMITTED:
            return{
                ...state,
                isSubmit: action.submit
            }
        case SET_DEMAND_IS_FETCHED:
            return{
                ...state,
                demandItems: action.demandItems,
                isDemandFetched: true
            }
        default:
            return state
    }
}