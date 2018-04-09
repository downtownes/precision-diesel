import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



export default class NavBar extends Component {

    render() {
        return (
            <div className="NavBar">
                <div className="logoContainer">
                    <img className="logo" src={require('../../images/Precision-Diesel.png')} />
                </div>
                <div className="navBarOptions">
                    <Link to="/"><p>Home</p></Link>
                    <Link to="/services"><p>Services</p></Link>
                    <Link to="/parts"><p>Parts</p></Link>
                    <p>About</p>
                </div>
                <div className="cartLoginButtons">
                    <Link to="/profile"><img className="navBarLogos" src="https://www.freeiconspng.com/uploads/profile-icon-9.png" /></Link>
                    <img className="navBarLogos" src={require('../../images/shopping-cart.png')} />
                    <a href={process.env.REACT_APP_LOGIN}>
                        <button className="loginButton">Login</button>
                    </a>
                </div>
            </div>
        )
    }
}