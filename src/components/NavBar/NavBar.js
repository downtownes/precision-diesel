import React, { Component } from 'react';



export default class NavBar extends Component {
    render() {
        return (
            <div className="NavBar">
                <div className="logoContainer">
                    <img className="logo" src={require('../../images/Precision-Diesel.png')}/>
                </div>
                <div className="navBarOptions">
                    <p>Home</p>
                    <p>Services</p>
                    <p>Parts</p>
                    <p>About</p>
                </div>
                <div className="cartLoginButtons">
                    <img className="shoppingCartLogo" src={require('../../images/shopping-cart.png')}/>
                    <a href="http://localhost:3005/auth">
                    <button className="loginButton">Login</button>
                    </a>
                </div>
            </div>
        )
    }
}