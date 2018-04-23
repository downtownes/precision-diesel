import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCart, updateCartTotal } from '../../ducks/reducer';

class TakeMoney extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalInCents: this.props.totalInCents
        }
    }
    onToken = (token) => {
        let {userId, orderId} = this.props;
        token.card = void 0;
        axios.post('/saveToken', { token, amount: this.props.totalInCents, userId, orderId }).then(res => {
            console.log(res.data);
            alert(`We are in business, ${this.props.fName}`);
            this.props.getCart([]);
            this.props.updateCartTotal(0);
        });
    }

    // ...

    render() {
        return (
            // ...
            <StripeCheckout
                token={this.onToken}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                amount={this.props.totalInCents}
                panelLabel="Checkout"
            >
            <button className="checkoutButton">Checkout</button>
            </StripeCheckout>
            
        )
    }
}

function mapStateToProps(state) {
    const { totalInCents, userId, orderId, cart, fName } = state;

    return {
        totalInCents,
        userId,
        orderId,
        cart,
        fName
    }
}
export default connect(mapStateToProps, { getCart, updateCartTotal })(TakeMoney)