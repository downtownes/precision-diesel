import React, { Component } from 'react';
import { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode } from '../../ducks/reducer';
import { connect } from 'react-redux';

class AccountInfo extends Component {
    constructor(){
        super();
        this.state = {
            edit: false
        }
    }
    render() {
        const { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode } = this.props;
        return (
            <div>
                {this.props.fName !== '' && this.props.firstName !== null && this.props.fName !== undefined ? <h4>{`First Name: ${this.props.fName}`}</h4> : <h4>{`First Name: `}</h4>}
                {this.props.lName !== 'false' && this.props.lName !== null && this.props.lName !== undefined ? <h4>{`Last Name: ${this.props.lName}`}</h4> : <h4>{`Last Name: `}</h4>}
                {this.props.phone !== 'false' && this.props.phone !== null && this.props.phone !== undefined ? <h4>{`Phone Number: ${this.props.phone}`}</h4> : <h4>{`Phone: `}</h4>}
                {this.props.address !== 'false' && this.props.address !== null && this.props.address !== undefined ? <h4>{`Address: ${this.props.address}`}</h4> : <h4>{`Address: `}</h4>}
                {this.props.city !== 'false' && this.props.city !== null && this.props.city !== undefined ? <h4>{`City: ${this.props.city}`}</h4> : <h4>{`City: `}</h4>}
                {this.props.stateLived !== 'false' && this.props.stateLived !== null && this.props.state !== undefined ? <h4>{`State: ${this.props.stateLived}`}</h4> : <h4>{`State: `}</h4>}
                {this.props.zip !== 'false' && this.props.zip !== null && this.props.zip !== undefined ? <h4>{`Zip Code: ${this.props.zip}`}</h4> : <h4>{`Zip Code: `}</h4>}
                <button>Edit Profile</button>
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
export default connect(mapStateToProps, { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode })(AccountInfo)