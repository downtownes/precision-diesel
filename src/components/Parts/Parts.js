import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserId, getOrderId } from '../../ducks/reducer';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';


class Parts extends Component {
    constructor() {
        super();
        this.state = {
            parts: [],
            quantity: 0,
            total: 0
        }
        this.updateQuantity = this.updateQuantity.bind(this);
    }

    componentDidMount() {
        axios.get('/parts').then(res => {
            console.log(res.data);
            this.setState({
                parts: res.data
            })
        })
    }

    updateQuantity(quant) {
        this.setState({
            quantity: quant
        })
    }

    addToCart(prodid) {
        axios.get('/getUser').then(res => {
            if (res.data === 'Please log in or create an account') {
                
            }
        })
        let orderInfo = {
            id: this.props.userId,
            productId: prodid,
            quantity: this.state.quantity
        }
        axios.post('/order', orderInfo).then(res => {
            this.props.getOrderId(res.data.orderID);
            this.updateQuantity(0);
        });
    }

    render() {
        let displayedParts = this.state.parts.map((val, i) => {
            return (
                <div key={i}>
                    <img src={val.prodimage} />
                    <p>{val.prodname}</p>
                    <p>{val.price}</p>
                    <input id="number" type="number" placeholder="0" onChange={ e => this.updateQuantity(e.target.value)}/>
                    <button onClick={() => this.addToCart(val.productid)}>Add To Cart</button>
                </div>
            )
        })
        return (
            <div className="Parts">
                {/* <NavBar /> */}
                {displayedParts}
            </div>
        )
    }
}





function mapStateToProps(state) {
    const { userId, orderId } = state;
    return {
        userId,
        orderId
    }
}
export default connect(mapStateToProps, {getUserId, getOrderId})(Parts);