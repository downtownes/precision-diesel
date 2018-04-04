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
                {this.state.edit === false ? <h4>{`First Name: ${this.props.fName}`}</h4> : <h4>{`First Name: ${<input/>}`}</h4>}
                {this.state.edit === false ? <h4>{`Last Name: ${this.props.lName}`}</h4> : <h4>{`Last Name: ${<input/>}`}</h4>}
                {this.state.edit === false ? <h4>{`Phone Number: ${this.props.phone}`}</h4> : <h4>{`Phone: ${<input/>}`}</h4>}
                {this.state.edit === false ? <h4>{`Address: ${this.props.address}`}</h4> : <h4>{`Address: ${<input/>}`}</h4>}
                {this.state.edit === false ? <h4>{`City: ${this.props.city}`}</h4> : <h4>{`City: ${<input/>}`}</h4>}
                {this.state.edit === false ? <h4>{`State: ${this.props.stateLived}`}</h4> : <h4>{`State: ${<input/>}`}</h4>}
                {this.state.edit === false ? <h4>{`Zip Code: ${this.props.zip}`}</h4> : <h4>{`Zip Code: ${<input/>}`}</h4>}
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