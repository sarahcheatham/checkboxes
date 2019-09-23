export const addOpp = opp => {
    return {
        type: "ADD_CHECKED_OPP",
        value: opp
    }
}

export const removeOpp = oppIndex => {
    return {
        type: "REMOVE_CHECKED_OPP",
        value: oppIndex
    }
}