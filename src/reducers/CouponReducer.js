/**
 * Coupon reducer — manages coupon validation state at checkout.
 */

import {
    VALIDATE_COUPON_REQUESTED,
    VALIDATE_COUPON_FULFILLED,
    VALIDATE_COUPON_REJECTED
} from '../constants/ActionTypes.js';

/**
 * Initial state for coupon validation.
 * @type {object}
 */
const initialState = {
    status: 'initial',
    isValidating: false,
    couponCode: null,
    discountPercent: 0,
    error: null
};

/**
 * Coupon reducer
 * @param {object} state
 * @param {object} action
 * @return {object} next state
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
                discountPercent: action.discountPercent,
                error: null
            });
        case VALIDATE_COUPON_REJECTED:
            return Object.assign({}, state, {
                isValidating: action.isValidating,
                status: action.status,
                couponCode: action.couponCode,
                discountPercent: 0,
                error: action.error
            });
        default:
            return state;
    }
}
