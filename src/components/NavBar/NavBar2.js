import React, { Component } from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavBar3 extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='massive'>
        <Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item as={Link} to="/services" name='services' active={activeItem === 'services'} onClick={this.handleItemClick} />
        <Menu.Item as={Link} to="/parts" name='parts' active={activeItem === 'parts'} onClick={this.handleItemClick} />

        <Menu.Menu position='right'>
          {/* <Dropdown item text='Profile'>
            <Dropdown.Menu>
              <Dropdown.Item><Link to="/profile/accountInfo">Account Information</Link></Dropdown.Item>
              <Dropdown.Item>Cart</Dropdown.Item>
              <Dropdown.Item>Order History</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

          <Menu.Item>
            <Button as={Link} to="/profile" icon="user" primary></Button>
          </Menu.Item>

          <Menu.Item>
            <a href={process.env.REACT_APP_LOGIN}>
              <Button primary>Login</Button>
            </a>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}


function mapStateToProps(state) {
  let { userId } = state;
  return {
    userId
  }
}
export default connect(mapStateToProps)(NavBar3);