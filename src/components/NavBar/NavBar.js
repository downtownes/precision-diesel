import React, { Component } from 'react';
import './NavBar.css';



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
                    <button className="loginButton">Login</button>
                </div>
            </div>
        )
    }
}