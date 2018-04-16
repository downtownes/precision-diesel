import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';



class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            cartTotal: 0
        }
    }
    componentDidMount() {
        axios.get(`/cart/${this.props.orderId}`).then(res => {
            console.log(res.data)
            this.setState({
                cart: res.data[0],
                cartTotal: res.data[1]
            })
        })
    }

    deleteFromCart(productid) {
        console.log(productid)
        let product = {
            prodid: productid,
            ordid: this.props.orderId
        }
        axios.post(`/cartItem`, product).then(res => {
            axios.get(`/cart/${this.props.orderId}`).then(res => {
                this.setState({
                    cart: res.data
                })
            })
        })
    }


    render() {
        let cartItemCards = this.state.cart.map((val, i) => {
            return (
                <div key={i} className="itemContainer">
                    <button value={val.productid} className="deleteButton" onClick={(e) => this.deleteFromCart(e.target.value)}>X</button>
                    <img className="cartCardImage" src={val.prodimage} />
                    <h4>{val.prodname}</h4>
                    <h4>Qty: {val.quantity}</h4>
                    <h4 className="cartCardPriceDisplay">Price: {val.price}</h4>
                </div>
            )
        })
        return (
            <div className="Cart">
                <div className="cartItems">
                    {cartItemCards}
                </div>
                <div>
                    <h2 className="totalPrice">{`$${this.state.cartTotal}.00`}</h2>
                    <button className="checkoutButton">Checkout</button>
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