import React, { Component } from 'react';
import Navbar from '../NavBar/NavBar';


class Cart extends Component { 
    render() {
        return (
            <div>
                <Navbar/>
                <div className="cartItemsContianer">
                    <div classNam="cartItem">
                        <img/>
                        <h4></h4>
                        <h4>Qty</h4>
                        <h4>Price</h4>
                    </div>
                </div>
            </div>
        )
    }
}




export default (Cart);