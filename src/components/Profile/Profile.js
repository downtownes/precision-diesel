import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode } from '../../ducks/reducer';
import NavBar from '../NavBar/NavBar';
import AccountInfo from './AccountInfo';




class Profile extends Component {

    componentDidMount() {
        axios.get('/getUser').then(res => {
            console.log(res.data)
            this.props.firstName(res.data[0].firstname);
            this.props.lastName(res.data[0].lastname);
            this.props.phoneNumber(res.data[0].phone);
            this.props.location(res.data[0].address);
            this.props.cityLoc(res.data[0].city);
            this.props.stateLoc(res.data[0].state);
            this.props.zipCode(res.data[0].zipcode);
        })
    }

    render() {
        const { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode } = this.props;
        return (
            <div>
                <NavBar />
                <div className="profileOptionsContainer">
                    <div className="profileOptions">
                        <Link to="/profile/accountInfo"><button>Account Info</button></Link>
                        <button>Cart</button>
                        <button>Order History</button>
                    </div>
                    <div className="nestedRoutesContainer">
                        {this.props.children}
                    </div>
                </div>
                <a href="http://localhost:3000/auth/logout">
                    <button>Logout</button>
                </a>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { fName, lName, phone, address, city, stateLived, zip } = state;

    return {
        fName,
        lName,
        phone,
        address,
        city,
        stateLived,
        zip
    }
}
export default connect(mapStateToProps, { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode })(Profile);