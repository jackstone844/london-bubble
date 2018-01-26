/**
 * Relevant action types are imported from the constants/ActionTypes.js directory
 * This module creates three standard action creators that will be dispatched 
 * by the store in a Thunk action creator as an async operation.
 * Objective of Thunk action creator is to fetch the locations data from 
 * FireBase database and update the store / state.
 */ 

import database from '../firebase.config.js';
import {
    GET_LOCATIONS_REQUESTED,
    GET_LOCATIONS_REJECTED,
    GET_LOCATIONS_FULFILLED
} from '../constants/ActionTypes.js';

/*
Locations Standard Action Creators 
*/

/**
 * Action to be dispatched when requesting locations from FireBase
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
 * Action to be dispatched when the request for locations from FireBase is rejected
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
 * Action to be dispatched when the request for locations from FireBase is resolved/fullfilled
 * @param {object} locations - locations obj is returned in the Thunk before this action is dispatched
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
 * LocationFeed Async Action Creator (Thunk)
 * @return {Object}
 */
 
 export function getLocations() {
     return function (dispatch) {

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

