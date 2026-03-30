/**
 * Relevant action types are imported from the constants/ActionTypes.js directory
 * This module creates action creators for coupon validation at checkout.
 * Valid coupons are looked up against a set of known coupon codes and their
 * associated discounts.
 */

import {
    VALIDATE_COUPON_REQUESTED,
    VALIDATE_COUPON_REJECTED,
    VALIDATE_COUPON_FULFILLED,
    CLEAR_COUPON
} from '../constants/ActionTypes.js';

/**
 * Known valid coupons and their discount percentages.
 * @type {Object}
 */
const VALID_COUPONS = {
    '12345': { discount: 0.10, description: '10% off your order' },
    'LONDON10': { discount: 0.10, description: '10% off your order' },
    'BUBBLE20': { discount: 0.20, description: '20% off your order' }
};

/**
 * Checkout Standard Action Creators
 */

/**
 * Action to be dispatched when coupon validation is in progress
 * @return {Object}
 */
function validateCouponRequestAction() {
    return {
        type: VALIDATE_COUPON_REQUESTED,
        isValidating: true,
        status: 'validating'
    };
}

/**
 * Action to be dispatched when coupon validation fails
 * @param {string} couponCode - The coupon code that was not found
 * @return {Object}
 */
function validateCouponRejectedAction(couponCode) {
    return {
        type: VALIDATE_COUPON_REJECTED,
        isValidating: false,
        status: 'error',
        error: `Coupon "${couponCode}" does not exist!`
    };
}

/**
 * Action to be dispatched when coupon validation succeeds
 * @param {string} couponCode - The valid coupon code
 * @param {Object} couponData - The coupon details (discount, description)
 * @return {Object}
 */
function validateCouponFulfilledAction(couponCode, couponData) {
    return {
        type: VALIDATE_COUPON_FULFILLED,
        isValidating: false,
        status: 'success',
        couponCode,
        discount: couponData.discount,
        description: couponData.description
    };
}

/**
 * Action to clear an applied coupon
 * @return {Object}
 */
export function clearCoupon() {
    return {
        type: CLEAR_COUPON
    };
}

/**
 * Checkout Async Action Creator (Thunk)
 * Validates a coupon code against the list of known valid coupons.
 * Normalises the input (trims whitespace, converts to uppercase where applicable)
 * before performing the lookup.
 *
 * @param {string} couponCode - The coupon code entered by the user
 * @return {function}
 */
export function validateCoupon(couponCode) {
    return function (dispatch) {
        dispatch(validateCouponRequestAction());

        const trimmed = couponCode.trim();
        const normalised = trimmed.toUpperCase();

        const couponKey = VALID_COUPONS[normalised] ? normalised : (VALID_COUPONS[trimmed] ? trimmed : null);
        const couponData = couponKey ? VALID_COUPONS[couponKey] : null;

        if (couponData) {
            dispatch(validateCouponFulfilledAction(couponKey, couponData));
        } else {
            dispatch(validateCouponRejectedAction(trimmed));
        }
    };
}
