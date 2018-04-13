import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode, getUserId, getOrderId } from '../../ducks/reducer';
import NavBar from '../NavBar/NavBar';
import AccountInfo from './AccountInfo';




class Profile extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: ''
        }
    }

    componentDidMount() {
        axios.get('/getUser').then(res => {
            console.log(res.data)
            if (res.data === 'Please log in or create an account') {
                this.setState({
                    loggedIn: false
                })
            } else {
                this.props.getUserId(res.data[0].id);
                this.props.firstName(res.data[0].firstname);
                this.props.lastName(res.data[0].lastname);
                this.props.phoneNumber(res.data[0].phone);
                this.props.location(res.data[0].address);
                this.props.cityLoc(res.data[0].city);
                this.props.stateLoc(res.data[0].state);
                this.props.zipCode(res.data[0].zipcode);
                this.setState({
                    loggedIn: true
                })
                if (this.state.loggedIn === true) {
                    axios.get(`/order/${this.props.userId}`).then(res => {
                        console.log(res.data)
                        this.props.getOrderId(res.data[0].orderid)
                    })
                }
            }
        })
    }

    resetId() {
        getUserId(0);
    }

    render() {
        if (this.state.loggedIn === true) {
            const { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode } = this.props;
            return (
                <div>
                    <NavBar />
                    <div className="profileOptionsContainer">
                        <div className="profileOptionsAndInfoContainer">
                            <div className="profileOptions">
                                <Link to="/profile/accountInfo"><button>Account Info</button></Link>
                                <Link to="/profile/cart"><button>Cart</button></Link>
                                <button>Order History</button>
                            </div>
                            <div className="nestedRoutesContainer">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                    <a href="http://localhost:3000/auth/logout">
                        <button onClick={() => this.resetId()}>Logout</button>
                    </a>
                </div>
            )
        } else if (this.state.loggedIn === false) {
            return (
                <div>
                    <NavBar />
                    <h1>Please create an account or log in!</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
    }
}


function mapStateToProps(state) {
    const { fName, lName, phone, address, city, stateLived, zip, userId, orderId } = state;

    return {
        fName,
        lName,
        phone,
        address,
        city,
        stateLived,
        zip,
        userId,
        orderId
    }
}
export default connect(mapStateToProps, { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode, getUserId, getOrderId })(Profile);