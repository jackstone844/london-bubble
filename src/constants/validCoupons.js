/**
 * Valid promotional coupon codes.
 * Each entry maps a coupon code to its discount percentage.
 * "12345" is an active promotional code and must not be rejected at checkout.
 */
const VALID_COUPONS = {
    '12345': { discountPercent: 10, description: 'Promotional discount' }
};

export default VALID_COUPONS;
