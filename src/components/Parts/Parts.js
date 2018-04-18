import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserId, getOrderId, loggedUser } from '../../ducks/reducer';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import NotLoggedIn from '../NotLoggedIn/NotLoggedIn';


class Parts extends Component {
    constructor() {
        super();
        this.state = {
            parts: [],
            quantity: 0,
            total: 0,
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

    async addToCart(prodid) {
        let loggingUser = await axios.get('/getUser').then(res => {
            console.log(res.data)
            if (res.data === 'Please log in or create an account') {
                this.props.loggedUser(false);
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
                    <input id="number" type="number" placeholder="0" onChange={e => this.updateQuantity(e.target.value)} />
                    <button onClick={() => this.addToCart(val.productid)}>Add To Cart</button>
                </div>
            )
        })
        if (this.props.loggedIn === '' || this.props.loggedIn === true) {
            return (
                <div className="Parts">
                    {/* <NavBar /> */}
                    {displayedParts}
                </div>
            )
        } else if(this.props.loggedIn === false) {
            return (
                <div className="Parts">
                    <NotLoggedIn/>
                </div>
            )
        }
    }
}





function mapStateToProps(state) {
    const { userId, orderId, loggedIn } = state;
    return {
        userId,
        orderId,
        loggedIn
    }
}
export default connect(mapStateToProps, { getUserId, getOrderId, loggedUser })(Parts);