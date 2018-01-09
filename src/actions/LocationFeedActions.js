import database from '../firebase.config.js';
import {
    GET_LOCATIONS_REQUESTED,
    GET_LOCATIONS_REJECTED,
    GET_LOCATIONS_FULFILLED
} from '../constants/ActionTypes.js';

/*
Locations Action Creators 
*/

/**
 * Action dispatched when requesting locations
 * from FireBase
 * 
 * @return {Object}
 */
 function getLocationsRequestAction() {
     return {
         type: GET_LOCATIONS_REQUESTED,
         isFetching: true, 
         status: 'fetching'
     }
 }

/**
 * Action dispatched if request for locations
 * is rejected 
 *
 * @return {Object}
 */
 function getLocationsRejectedAction(error) {
    return {
        type: GET_LOCATIONS_REJECTED,
        isFetching: false,
        status: error
    }
 }

/**
 * Action dispatched if request for locations
 * is fulfilled 
 * 
 * @return {Object}
 */
 function getLocationsFulfilledAction(locations) {
    return {
        type: GET_LOCATIONS_FULFILLED,
        isFetching: false, 
        status: 'success',
        locations: locations
    } 
 }

 /**
 * Thunk function to dispatch the Action Creators
 * 
 * @return {Object}
 */

 /* 
 By calling dispatch(action), the redux store will pass 
 the current state tree and the action object that was
 dispatched to the root reducer, in this case, the root 
 reducer only has the getReducer function
 */
 
 export function getLocations() {
     return dispatch => {

        dispatch(getLocationsRequestAction());

        return database.ref('/location').once('value', snap => {
            const locations = snap.val();

            dispatch(getLocationsFulfilledAction(locations));
        })
        .catch((error) => {
            console.log(error);
            dispatch(getLocationsRejectedAction(error));
        }); 
     }
 }

