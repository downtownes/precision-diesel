import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';



class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: []
        }
    }
    componentDidMount() {
        axios.get(`/cart/${this.props.orderId}`).then(res => {
            console.log(res.data)
            this.setState({
                cart: res.data
            })
        })
    }
    render() {
        return (
            <div className="Cart">
                <div className="cartItems">
                    <div className="itemContainer">
                        <img />
                        <h4>--Product Name--</h4>
                        <h4>Qty:</h4>
                        <h4>Price:</h4>
                    </div>
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
export default connect(mapStateToProps)(Cart);