import React, { Component } from 'react';
import { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode } from '../../ducks/reducer';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';

class AccountInfo extends Component {
    constructor() {
        super();
        this.state = {
            edit: false,
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            cityLoc: '',
            stateLoc: '',
            zipCode: ''
        }
        this.submitChanges = this.submitChanges.bind(this);
        this.editInformation = this.editInformation.bind(this);
        this.changeText = this.changeText.bind(this);
    }

    editInformation(info) {
        this.setState({
            edit: true
        })
    }

    submitChanges() {
        let userProfile = {
            id: this.props.userId,
            first: this.state.firstName,
            last: this.state.lastName,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.cityLoc,
            state: this.state.stateLoc,
            zip: this.state.zipCode
        }
        console.log(userProfile)
        axios.put('/profile', userProfile).then(res => {
            // this.props.history.push('/profile')
            this.setState({
                edit: false
            })
                this.props.firstName(this.state.firstName);
                this.props.lastName(this.state.lastName);
                this.props.phoneNumber(this.state.phone);
                this.props.location(this.state.address);
                this.props.cityLoc(this.state.cityLoc);
                this.props.stateLoc(this.state.stateLoc);
                this.props.zipCode(this.state.zipCode);
        })
        // _.map(userProfile, (val, i, obj) => {
        //     if(val === '') {
        //         this.setState({
        //             [i]: this.props.i
        //         })
        //     }
        // })
    }

    changeText(info) {
        if (info.name === "zipCode") {
            let intoNumber = parseInt(info.value, 10);
            this.setState({
                [info.name]: intoNumber
            })
        } else if(info.name !== "zipCode") {
            this.setState({
                [info.name]: info.value
            })
        }
    }

    render() {
        const { firstName, lastName, phoneNumber, location, cityLoc, stateLoc, zipCode } = this.props;
        if (this.state.edit === false) {
            return (
                <div>
                    {this.props.fName !== '' && this.props.fName !== null && this.props.fName !== undefined ? <h4>{`First Name: ${this.props.fName}`}</h4> : <h4>{`First Name: `}</h4>}
                    {this.props.lName !== 'false' && this.props.lName !== null && this.props.lName !== undefined ? <h4>{`Last Name: ${this.props.lName}`}</h4> : <h4>{`Last Name: `}</h4>}
                    {this.props.phone !== 'false' && this.props.phone !== null && this.props.phone !== undefined ? <h4>{`Phone Number: ${this.props.phone}`}</h4> : <h4>{`Phone: `}</h4>}
                    {this.props.address !== 'false' && this.props.address !== null && this.props.address !== undefined ? <h4>{`Address: ${this.props.address}`}</h4> : <h4>{`Address: `}</h4>}
                    {this.props.city !== 'false' && this.props.city !== null && this.props.city !== undefined ? <h4>{`City: ${this.props.city}`}</h4> : <h4>{`City: `}</h4>}
                    {this.props.stateLived !== 'false' && this.props.stateLived !== null && this.props.stateLived !== undefined ? <h4>{`State: ${this.props.stateLived}`}</h4> : <h4>{`State: `}</h4>}
                    {this.props.zip !== 'false' && this.props.zip !== null && this.props.zip !== undefined ? <h4>{`Zip Code: ${this.props.zip}`}</h4> : <h4>{`Zip Code: `}</h4>}
                    <button onClick={() => { this.editInformation() }}>Edit Profile</button>
                </div>
            )
        } else if (this.state.edit === true) {
            return (
                <Form>
                    <Form.Group>
                        <Form.Input name="firstName" label='First Name' placeholder='First Name' width={6} value={this.state.firstName} onChange={e => { this.changeText(e.target) }} />
                        <Form.Input name="lastName" label='Last Name' placeholder='Last Name' width={6} value={this.state.lastName} onChange={e => { this.changeText(e.target) }} />
                        <Form.Input name="phone" label='Phone' placeholder='(xxx)xxx-xxxx' width={4} value={this.state.phone} onChange={e => { this.changeText(e.target) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input name="address" label="Address" placeholder='12 Wide' width={12} value={this.state.address} onChange={e => { this.changeText(e.target) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input name="cityLoc" label="City" placeholder='8 Wide' width={8} value={this.state.cityLoc} onChange={e => { this.changeText(e.target) }} />
                        <Form.Input name="stateLoc" label="State" placeholder='6 Wide' width={6} value={this.state.stateLoc} onChange={e => { this.changeText(e.target) }} />
                        <Form.Input name="zipCode" label="ZIP Code" placeholder='2 Wide' width={2} value={this.state.zipCode} onChange={e => { this.changeText(e.target) }} />
                    </Form.Group>
                    <button type='submit' onClick={() => this.submitChanges()}>Submit</button>
                </Form>
            )
        }
    }
}


function mapStateToProps(state) {
    const { fName, lName, phone, address, city, stateLived, zip, userId } = state;

    return {
        userId,
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