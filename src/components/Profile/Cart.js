import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Checkout from '../Checkout/Checkout';
import { getTotalPennies, getCart, updateCartTotal } from '../../ducks/reducer';



class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            cartTotal: 0
        }
    }
    componentDidMount() {
        console.log(this.props.orderId);
        axios.get(`/cart/${this.props.orderId}`).then(res => {
            console.log(res.data)
            let cartTotalObj = {
                total: res.data[1],
                orderid: this.props.orderId
            };
            this.props.updateCartTotal(res.data[1]);
            this.props.getCart(res.data[0]);
            this.props.getTotalPennies(Math.floor(res.data[1] * 100));
            axios.patch('/total', cartTotalObj).then(res => {
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
                console.log(res.data)
                this.props.getCart(res.data[0])
                this.props.updateCartTotal(res.data[1])
            })
        })
    }


    render() {
        let cartItemCards = this.props.cart.map((val, i) => {
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
                    <h2 className="totalPrice">{`$${this.props.total}`}</h2>
                    {/* <button className="checkoutButton">Checkout</button> */}
                    <Checkout/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { orderId, totalInCents, cart, total } = state;
    return {
        orderId,
        totalInCents,
        cart,
        total
    }
}
export default connect(mapStateToProps, { getTotalPennies, getCart, updateCartTotal })(Cart);