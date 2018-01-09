import {
    GET_LOCATIONS_REQUESTED,
    GET_LOCATIONS_REJECTED,
    GET_LOCATIONS_FULFILLED
} from '../constants/ActionTypes.js';

const initalState = {
    status: 'initial',
    isFetching: true,
};
 
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