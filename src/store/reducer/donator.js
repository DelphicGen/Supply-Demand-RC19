import { SET_SUBMITTED, SET_DONATION_IS_FETCHED, SET_ALLOCATION_IS_FETCHED } from "../action/donator"

const initialState = {
    isSubmit: false,
    donationItems: null,
    isDonationFetched: false,
    allocationItems: null,
    isAllocationFetched: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_SUBMITTED:
            return{
                ...state,
                isSubmit: action.submit
            }
        case SET_DONATION_IS_FETCHED:
            return{
                ...state,
                donationItems: action.donationItems,
                isDonationFetched: true
            }
            case SET_ALLOCATION_IS_FETCHED:
                return{
                    ...state,
                    allocationItems: action.allocationItems,
                    isAllocationFetched: true
                }
        default:
            return state
    }
}