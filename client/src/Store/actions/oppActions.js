export const handleErrors = response => {
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
}

export const FETCH_OPPORTUNITIES_BEGIN = "FETCH_OPPORTUNITIES_BEGIN";
export const FETCH_OPPORTUNITIES_SUCCESS = "FETCH_OPPORTUNITIES_SUCCESS";
export const FETCH_OPPORTUNITIES_FAILURE = "FETCH_OPPORTUNITIES_FAILURE";

export const fetchOpportunitiesBegin = () =>({
    type: FETCH_OPPORTUNITIES_BEGIN
});

export const fetchOpportunitiesSuccess = opportunities =>({
    type: FETCH_OPPORTUNITIES_SUCCESS,
    payload: { opportunities }
});

export const fetchOpportunitiesFailure = error =>({
    type: FETCH_OPPORTUNITIES_FAILURE,
    payload: { error }
});

export const loadOpportunities = () => {
    return dispatch => {
        dispatch(fetchOpportunitiesBegin());
        return fetch('/api/opp')
            .then(handleErrors)
            .then(res => res.json())
            .then(opportunities => {
                    dispatch(fetchOpportunitiesSuccess(opportunities));
                    return opportunities;
            })
            .catch(error => dispatch(fetchOpportunitiesFailure(error)))
    };
}

export const createOpportunity = opportunity => {
    console.log("ACTIONS CREATE opportunity:", opportunity)
    return dispatch => {
        fetch('/api/opp',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(opportunity)
        }).then(()=> dispatch(loadOpportunities()));
    }
}
