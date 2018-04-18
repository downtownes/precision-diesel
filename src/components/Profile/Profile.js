import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode, getUserId, getOrderId, loggedUser } from '../../ducks/reducer';
import NavBar from '../NavBar/NavBar';
import AccountInfo from './AccountInfo';
import TestProfileComponent from './TestProfileComponent';




class Profile extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        axios.get('/getUser').then(res => {
            console.log(res.data)
            if (res.data === 'Please log in or create an account') {
                this.props.loggedUser(false);
                // this.setState({
                //     loggedIn: false
                // })
            } else {
                this.props.getUserId(res.data[0].id);
                this.props.firstName(res.data[0].firstname);
                this.props.lastName(res.data[0].lastname);
                this.props.phoneNumber(res.data[0].phone);
                this.props.location(res.data[0].address);
                this.props.cityLoc(res.data[0].city);
                this.props.stateLoc(res.data[0].state);
                this.props.zipCode(res.data[0].zipcode);
                this.props.loggedUser(true);
                // this.setState({
                //     loggedIn: true
                // })
                if (this.props.loggedIn === true) {
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
        if (this.props.loggedIn === true) {
            const { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode } = this.props;
            return (
                <div className="Profile">
                    <TestProfileComponent/>
                    <a href="http://localhost:3000/auth/logout">
                        <button onClick={() => this.resetId()}>Logout</button>
                    </a>
                </div>
            )
        } else if (this.props.loggedIn === false) {
            return (
                <div>
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
    const { fName, lName, phone, address, city, stateLived, zip, userId, orderId, loggedIn } = state;

    return {
        fName,
        lName,
        phone,
        address,
        city,
        stateLived,
        zip,
        userId,
        orderId,
        loggedIn
    }
}
export default connect(mapStateToProps, { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode, getUserId, getOrderId, loggedUser })(Profile);