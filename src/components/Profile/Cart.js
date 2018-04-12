import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';



class Cart extends Component {
    constructor(){
        super();
        this.state = {
            cart: []
        }
    }
    componentDidMount() {
        axios.get(`/getCart/${this.props.orderId}`).then(res => {
            this.setState({
                cart: res.data
            })
        })
    }
    render() {
        return (
            <div>
                <div className="itemContainer">
                    <img />
                    <h4>--Product Name--</h4>
                    <h4>Qty:</h4>
                    <h4>Total:</h4>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { orderId } = state;
    return {
        orderId
    }
}
export default (Cart);