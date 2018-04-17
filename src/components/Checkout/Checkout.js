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
        let tokenObj = {
            key: token,
            totalInCents: this.state.totalInCents
        }
        axios.post('/saveToken', { tokenObj }).then(data => {
            alert(`TWe are in business, ${this.props.fname}`);
        });
    }

    // ...

    render() {
        return (
            // ...
            <StripeCheckout
                token={this.onToken}
                stripeKey={process.env.SECRET_KEY}
                amount={this.props.totalInCents}
            />
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