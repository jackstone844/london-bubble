import {
    GET_LOCATIONS_REQUESTED,
    GET_LOCATIONS_REJECTED,
    GET_LOCATIONS_FULFILLED
} from '../constants/ActionTypes.js';

/**
 * Redux calls our reducer with an undefined state for the first time
 * so initialState will be returned as our initial state
 * @type {object} initialState
 */
const initalState = {
    status: 'initial',
    isFetching: true,
};

/**
 * LocationFeed getReducer getReducer
 * @param {object} state 
 * @param {object} action
 * @return {object} state (next state as a result of dispatching the action) 
 */
export function getLocationsReducer(state = initalState, action) {
    switch(action.type){
        case GET_LOCATIONS_REQUESTED:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                status: action.status
            });
        case GET_LOCATIONS_FULFILLED:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                status: action.status,
                locations: action.locations
            });
        case GET_LOCATIONS_REJECTED:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                status: action.status
            })
        default:
            return state;
    }
}