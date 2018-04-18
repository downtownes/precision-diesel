import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { connect } from 'react-redux';

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
        axios.post('/saveToken', { token, amount: this.props.totalInCents, userId, orderId }).then(data => {
            alert(`We are in business, ${this.props.firstname}`);
        });
    }

    // ...

    render() {
        console.log(this.state.totalInCents);
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
    const { totalInCents, userId, orderId } = state;

    return {
        totalInCents,
        userId,
        orderId
    }
}
export default connect(mapStateToProps)(TakeMoney)