import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserId } from '../../ducks/reducer';
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
    }

    componentDidMount() {
        axios.get('/parts').then(res => {
            console.log(res.data);
            this.setState({
                parts: res.data
            })
        })
    }

    updateQuantity(qty) {
        this.setState({
            quantity: qty
        })
    }

    addToCart(prodid) {
        let orderInfo = {
            id: this.props.userId,
            productId: prodid,
            qty: this.state.quantity
        }
        console.log(orderInfo)
        axios.post('/order', orderInfo).then(res => {
        });
    }

    render() {
        let displayedParts = this.state.parts.map((val, i) => {
            return (
                <div key={i}>
                    <img src={val.prodimage} />
                    <p>{val.prodname}</p>
                    <p>{val.price}</p>
                    <input id="number" type="number" onChange={ e => this.updateQuantity(e.target.value)}/>
                    <button onClick={() => this.addToCart(val.productid)}>Add To Cart</button>
                </div>
            )
        })
        return (
            <div className="Parts">
                <NavBar />
                {displayedParts}
            </div>
        )
    }
}





function mapStateToProps(state) {
    const { userId } = state;
    return {
        userId
    }
}
export default connect(mapStateToProps, {getUserId})(Parts);