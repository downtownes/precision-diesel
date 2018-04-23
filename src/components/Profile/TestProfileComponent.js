import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import AccountInfo from './AccountInfo';
// import './Profile/Pro'


export default class NewProfile extends Component{
    constructor() {
        super();
        this.state = {
            activeItem: 'Account Information'
        }
        this.changeView = this.changeView.bind(this);
    }

    changeView(e, {name}) {
        this.setState({
            activeItem: name
        })
    }

    render() {
        let {activeItem} = this.state
        return (
            <Grid>
                <Grid.Column width={3}>
                    <Menu fluid vertical tabular>
                        <Menu.Item name="Account Information"active={activeItem === 'Account Information'} onClick={this.changeView} />
                        <Menu.Item name="Cart" active={activeItem === 'Cart'} onClick={this.changeView} />
                        <Menu.Item name="Order History" active={activeItem === 'Order History'} onClick={this.changeView} />
                    </Menu>
                </Grid.Column>
                <Grid.Column stretched width={12}>
                    <Segment>
                        {activeItem === 'Cart' ? <Cart/> : null}
                        {activeItem === 'Account Information' ? <AccountInfo/> : null}
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}