import React from 'react';
import { connect } from 'react-redux';
import { validateCoupon, clearCoupon } from '../actions/CheckoutActions.js';
import {
    FormGroup,
    FormControl,
    Button,
    Alert,
    ControlLabel
} from 'react-bootstrap';

export class CheckoutForm extends React.Component {
    /**
     * Initialise state & bind functions in the constructor.
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            couponInput: ''
        };

        this.couponInputHandler = this.couponInputHandler.bind(this);
        this.applyCouponHandler = this.applyCouponHandler.bind(this);
        this.removeCouponHandler = this.removeCouponHandler.bind(this);
    }

    /**
     * Updates the local state as the user types in the coupon input field.
     * @param {Object} event - onChange event
     */
    couponInputHandler(event) {
        this.setState({ couponInput: event.target.value });
    }

    /**
     * Dispatches the validateCoupon action when the user submits the coupon form.
     * @param {Object} event - onSubmit or onClick event
     */
    applyCouponHandler(event) {
        event.preventDefault();
        const { couponInput } = this.state;
        if (couponInput.trim()) {
            this.props.onValidateCoupon(couponInput);
        }
    }

    /**
     * Clears the applied coupon from state and resets the input field.
     */
    removeCouponHandler() {
        this.setState({ couponInput: '' });
        this.props.onClearCoupon();
    }

    render() {
        const { status, couponCode, discount, description, error, isValidating } = this.props.checkout;

        return (
            <div className="container checkout-container">
                <div className="row">
                    <div className="col col-md-6 col-md-offset-3">
                        <h2>Checkout</h2>

                        <div className="checkout-coupon-section">
                            <h4>Have a coupon?</h4>

                            {status === 'success' && couponCode ? (
                                <Alert bsStyle="success">
                                    <strong>Coupon applied!</strong> {description} ({couponCode})
                                    <Button
                                        bsStyle="link"
                                        onClick={this.removeCouponHandler}
                                        className="pull-right"
                                    >
                                        Remove
                                    </Button>
                                </Alert>
                            ) : (
                                <form onSubmit={this.applyCouponHandler}>
                                    <FormGroup>
                                        <ControlLabel>Coupon Code</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter coupon code"
                                            value={this.state.couponInput}
                                            onChange={this.couponInputHandler}
                                            id="couponCodeInput"
                                        />
                                    </FormGroup>
                                    {status === 'error' && error && (
                                        <Alert bsStyle="danger">{error}</Alert>
                                    )}
                                    <Button
                                        bsStyle="primary"
                                        type="submit"
                                        disabled={isValidating || !this.state.couponInput.trim()}
                                    >
                                        {isValidating ? 'Applying...' : 'Apply Coupon'}
                                    </Button>
                                </form>
                            )}

                            {status === 'success' && discount && (
                                <p className="checkout-discount-summary">
                                    <strong>Discount:</strong> {Math.round(discount * 100)}% off
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Injects the checkout state into CheckoutForm component props
 * (react-redux bindings)
 *
 * @param {Object} state - Redux state
 * @return {Object} - checkout state slice
 */
const mapStateToProps = (state) => {
    return {
        checkout: state.Checkout
    };
};

/**
 * Injects the dispatch object and action creators into CheckoutForm component
 * (react-redux bindings)
 *
 * @param {Object} dispatch - Redux dispatch object
 * @return {Object} - mapped dispatch functions
 */
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        onValidateCoupon: (couponCode) => { dispatch(validateCoupon(couponCode)); },
        onClearCoupon: () => { dispatch(clearCoupon()); }
    };
};

const checkoutContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

export default checkoutContainer;
