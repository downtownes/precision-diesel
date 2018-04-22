import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserId, getOrderId, loggedUser } from '../../ducks/reducer';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
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
        // this.updateQuantityOnState = this.updateQuantityOnState.bind(this);
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
        console.log(quant);
        console.log('this.input', this.input);
        let qty = document.getElementById(quant[1]).value
        console.log(qty);
        let newQty = parseInt(qty, 10) + quant[0]
        console.log('newQty', newQty)
        if (newQty < 0) {
            newQty = 0;
        }

        document.getElementById(quant[1]).value = newQty;
        console.log('mod newQty', newQty);
        return newQty;
    }

    updateQuantityOnState(quant) {
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

            let name = val.productid
            console.log(name)
            return (
                <Card className="cardStyling" key={i}>
                    <Image className="cardImage" verticalAlign="middle" src={val.prodimage} />
                    <Card.Content >
                        <Card.Header>
                            {val.prodname}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                {val.prod}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {val.proddesc}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        {/* <a>
                    <Icon name='user' />
                    22 Friends
                </a> */}
                        <button style={{ color: 'white' }} onClick={() => this.addToCart(val.productid)}>Add To Cart</button>
                        <div className="quantityContainer">
                            <div className="quantityChangerContainer">
                            <div className="buttonsContainer">
                                <button className="quantityChanger" id="up" onClick={() => { this.updateQuantity([1, name]) }}>+</button>
                                <button className="quantityChanger" id="down" onClick={() => { this.updateQuantity([-1, name]) }}>-</button>
                            </div>
                                <input className="quantityInputDisplay" onChange={(e) => this.updateQuantityOnState(e.target.value)} id={val.productid} ref={val.productid = () => {
                                    this.input = val.productid
                                }} value="0" />
                            </div>
                        </div>
                    </Card.Content>
                </Card>
            )
        })
        if (this.props.loggedIn === '' || this.props.loggedIn === true) {
            return (
                <div className="Parts">
                    {/* <NavBar /> */}
                    <div className="cardContainer">
                        {displayedParts}
                    </div>
                </div>
            )
        } else if (this.props.loggedIn === false) {
            return (
                <div className="Parts">
                    <NotLoggedIn />
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