/**
 * Reducers specify how the apps state changes in response to actions sent to the store.
 * The store dispatches actions to the reducer and expects a pure function to return a
 * pure object as the next state.
 * A reducer takes the previous state, an action and returns the next state ... (prev state, action) => nextState
 */

import {
    VALIDATE_COUPON_REQUESTED,
    VALIDATE_COUPON_REJECTED,
    VALIDATE_COUPON_FULFILLED,
    CLEAR_COUPON
} from '../constants/ActionTypes.js';

/**
 * Redux calls our reducer with an undefined state for the first time
 * so initialState will be returned as our initial state
 * @type {object} initialState
 */
const initialState = {
    status: 'initial',
    isValidating: false,
    couponCode: null,
    discount: null,
    description: null,
    error: null
};

/**
 * Checkout couponReducer
 * @param {object} state
 * @param {object} action
 * @return {object} state (next state as a result of dispatching the action)
 */
export function couponReducer(state = initialState, action) {
    switch (action.type) {
        case VALIDATE_COUPON_REQUESTED:
            return Object.assign({}, state, {
                isValidating: action.isValidating,
                status: action.status,
                error: null
            });
        case VALIDATE_COUPON_FULFILLED:
            return Object.assign({}, state, {
                isValidating: action.isValidating,
                status: action.status,
                couponCode: action.couponCode,
                discount: action.discount,
                description: action.description,
                error: null
            });
        case VALIDATE_COUPON_REJECTED:
            return Object.assign({}, state, {
                isValidating: action.isValidating,
                status: action.status,
                couponCode: null,
                discount: null,
                description: null,
                error: action.error
            });
        case CLEAR_COUPON:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}
