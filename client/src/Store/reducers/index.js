import storeState from '../state';
import { combineReducers } from 'redux';
import { 
    FETCH_OPPORTUNITIES_BEGIN,
    FETCH_OPPORTUNITIES_SUCCESS,
    FETCH_OPPORTUNITIES_FAILURE,
} from '../actions/oppActions';

const opportunities = (state = storeState, action) => {
    switch(action.type){
        case FETCH_OPPORTUNITIES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_OPPORTUNITIES_SUCCESS:
            return {
                ...state,
                loading: false, 
                opportunities: action.payload.opportunities
            };
        case FETCH_OPPORTUNITIES_FAILURE:
            return {
                ...state, 
                loading: false,
                error: action.payload.error,
                opportunities: []
            };
        default:
            return state;
    }
}

const checkedOpps = (state = storeState.checkedOpps, action) => {
    switch(action.type){
        case "ADD_CHECKED_OPP":
            const newOpps = state.map(opp => opp)
            newOpps.push(action.value)
            return newOpps;
        case "REMOVE_CHECKED_OPP":
            const removedOpp = state.map(o => o)
            removedOpp.splice(action.value, 1)
            return removedOpp;
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    opportunities, checkedOpps
});

export default rootReducer;