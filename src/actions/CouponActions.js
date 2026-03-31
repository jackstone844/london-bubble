/**
 * Coupon action creators for validating promotional codes at checkout.
 * Coupon "12345" is a valid promotional code and must be accepted.
 */

import VALID_COUPONS from '../constants/validCoupons.js';
import {
    VALIDATE_COUPON_REQUESTED,
    VALIDATE_COUPON_FULFILLED,
    VALIDATE_COUPON_REJECTED
} from '../constants/ActionTypes.js';

/**
 * Action to be dispatched when a coupon validation is in progress.
 * @return {Object}
 */
function validateCouponRequestedAction() {
    return {
        type: VALIDATE_COUPON_REQUESTED,
        isValidating: true,
        status: 'validating'
    };
}

/**
 * Action to be dispatched when a coupon is accepted as valid.
 * @param {string} code - The validated coupon code
 * @param {number} discountPercent - The discount percentage applied
 * @return {Object}
 */
function validateCouponFulfilledAction(code, discountPercent) {
    return {
        type: VALIDATE_COUPON_FULFILLED,
        isValidating: false,
        status: 'valid',
        couponCode: code,
        discountPercent: discountPercent
    };
}

/**
 * Action to be dispatched when a coupon code is not recognised.
 * @param {string} code - The unrecognised coupon code
 * @return {Object}
 */
function validateCouponRejectedAction(code) {
    return {
        type: VALIDATE_COUPON_REJECTED,
        isValidating: false,
        status: 'invalid',
        couponCode: code,
        error: `Coupon "${code}" does not exist!`
    };
}

/**
 * Validates a promotional coupon code and dispatches the appropriate action.
 * @param {string} couponCode - The coupon code to validate
 * @return {function}
 */
export function validateCoupon(couponCode) {
    return function (dispatch) {
        dispatch(validateCouponRequestedAction());

        const normalized = couponCode.trim();
        const coupon = VALID_COUPONS[normalized];

        if (coupon) {
            dispatch(validateCouponFulfilledAction(normalized, coupon.discountPercent));
        } else {
            dispatch(validateCouponRejectedAction(normalized));
        }
    };
}
