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
        let cartItemCards = this.state.cart.map( (val, i) => {
            return (
                <div key={i} className="itemContainer">
                        <button className="deleteButton">X</button>
                        <img />
                        <h4>--Product Name--</h4>
                        <h4>Qty:</h4>
                        <h4>Price:</h4>
                    </div>
            )
        })
        return (
            <div className="Cart">
                <div className="cartItems">
                    
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