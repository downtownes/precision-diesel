import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';


class Parts extends Component {
    constructor() {
        super();
        this.state = {
            parts: []
        }
    }

    componentDidMount() {
        axios.get('/parts').then(res => {
            this.setState({
                parts: res.data
            })
        })
    }

    render() {
        let displayedParts = this.state.parts.map( (val, i) => {
            return (
                <div >
                    <img src={val.prodimage}/>
                    <p>{val.prodname}</p>
                    <p>{val.price}</p>
                    <button>Add To Cart</button> 
                </div>
            )
        })
        return (
            <div className="Parts">
                <NavBar/>
                {displayedParts}
            </div>
        )
    }
}






export default (Parts);