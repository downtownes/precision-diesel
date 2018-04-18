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
        token.card = void 0;
        axios.post('/saveToken', { token, amount: this.props.totalInCents }).then(data => {
            alert(`We are in business, ${this.props.fname}`);
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
    const { totalInCents } = state;

    return {
        totalInCents
    }
}
export default connect(mapStateToProps)(TakeMoney)