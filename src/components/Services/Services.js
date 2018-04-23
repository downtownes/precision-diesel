import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image, Popup } from 'semantic-ui-react';
import axios from 'axios';
import { loggedUser, getOrderId } from '../../ducks/reducer';
import NavBar from '../NavBar/NavBar';
import NotLoggedIn from '../NotLoggedIn/NotLoggedIn';



class Services extends Component {
    constructor() {
        super();
        this.state = {
            services: []
        }
    }

    componentDidMount() {
        axios.get('/services').then(res => {
            this.setState({
                services: res.data
            })
        })
    }

    updateQuantityOnState(quant) {
        console.log(quant);
        // this.setState({
        //     inputName: quant[1],
        // })
        this.props.updateQuant(quant[0])
    }

    async addServiceToCart(prodid) {
        let loggingUser = await axios.get('/getUser').then(res => {
            console.log(res.data)
            if (res.data === 'Please log in or create an account') {
                this.props.loggedUser(false);
            }
        })
        let orderInfo = {
            id: this.props.userId,
            productId: prodid,
            quantity: 1
        }
        axios.post('/order', orderInfo).then(res => {
            this.props.getOrderId(res.data.orderID);
        });
    }

    render() {
        console.log(this.state.services)
        let serviceCards = this.state.services.map((val, i) => {
            return (
                <Card key={i} className="cardStyling">
                    <Image className="cardImage" src={val.servimage} />
                    <Card.Content>
                        <Card.Header>
                            {val.servname} <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>${val.price}</p>
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {val.servdesc}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <Popup
                            trigger={<button style={{ color: 'white' }} onClick={() => this.addServiceToCart(val.serviceid)}>Add To Cart</button>}
                            content='Added to cart!'
                            on='click'
                            hideOnScroll
                        />
                    </Card.Content>
                </Card>
            )
        })
        if (this.props.loggedIn === '' || this.props.loggedIn === true) {
            return (
                <div className="Parts">
                    <div className="cardContainer">
                        {serviceCards}
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
    let { loggedIn, userId } = state;
    return {
        loggedIn,
        userId
    }
}
export default connect(mapStateToProps, { loggedUser, getOrderId, })(Services)