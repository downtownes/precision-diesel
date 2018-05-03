import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserId, getOrderId, loggedUser, updateQuant } from '../../ducks/reducer';
import { Card, Icon, Image, Button, Popup } from 'semantic-ui-react';
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
            updatedQty: 0,
            updateBool: false,
            inputName: ''
        }
        // this.updateQuantity = this.updateQuantity.bind(this);
        this.updateQuantityOnState = this.updateQuantityOnState.bind(this);
    }

    componentDidMount() {
        axios.get('/parts').then(res => {
            console.log(res.data);
            this.setState({
                parts: res.data
            })
        })
    }

    // updateQuantity(quant) {
    //     console.log('this.input', this.input);
    //     this.setState({

    //     })
    // }

    updateQuantityOnState(quant) {
        console.log(quant);
        this.setState({
            inputName: quant[1],
        })
        this.props.updateQuant(quant[0])
    }

    async addToCart(prodid) {
        let loggingUser = await axios.get('/getUser').then(res => {
            console.log(res.data)
            if (res.data === 'Please log in or create an account') {
                this.props.loggedUser(false);
            }
            console.log(prodid)
        })
        let orderInfo = {
            id: this.props.userId,
            productId: prodid,
//-----THIS WILL BE THE DIFFERENCE BETWEEN PARTS AND SERVICES-----//
            // subId: '',
            quantity: this.props.quantity
        }
        axios.post('/order', orderInfo).then(res => {
            this.props.getOrderId(res.data.orderID);
            this.updateQuantityOnState(0);
        });
    }

    render() {
        let displayedParts = this.state.parts.map((val, i) => {
            return (
                <Card className="cardStyling" key={i}>
                    <Image className="cardImage" verticalAlign="middle" src={val.prodimage} />
                    <Card.Content >
                        <Card.Header>
                            {val.prodname} <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>${val.price}</p>
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
                        <Popup
                            trigger={<button style={{ color: 'white' }} onClick={() => this.addToCart(val.productid)}>Add To Cart</button>}
                            content='Added to cart!'
                            on='click'
                            hideOnScroll
                        />
                        {/* <button style={{ color: 'white' }} onClick={() => this.addToCart(val.productid)}>Add To Cart</button> */}
                        <div className="quantityContainer">
                            <div className="quantityChangerContainer">
                                <input type="number" name={this.state.inputName} className="quantityInputDisplay" value={this.state.inputName != val.prodname ? this.state.quantity : this.props.quantity} onChange={e => { this.updateQuantityOnState([e.target.value, val.prodname]) }} />
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
    const { userId, orderId, loggedIn, quantity } = state;
    return {
        userId,
        orderId,
        loggedIn,
        quantity
    }
}
export default connect(mapStateToProps, { getUserId, getOrderId, loggedUser, updateQuant })(Parts);