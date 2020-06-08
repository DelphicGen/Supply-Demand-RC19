export const SET_SUBMITTED = 'SET_SUBMITTED'
export const SET_DONATION_IS_FETCHED = 'SET_DONATION_IS_FETCHED'
export const SET_ALLOCATION_IS_FETCHED = 'SET_ALLOCATION_IS_FETCHED'

export const setSubmitted = isSubmit => {
    return {type: SET_SUBMITTED, submit: isSubmit}
}

export const setDonationIsFetched = donations => {
    return {type: SET_DONATION_IS_FETCHED, donationItems: donations}
}

export const setAllocationIsFetched = allocations => {
    return {type: SET_ALLOCATION_IS_FETCHED, allocationItems: allocations}
}