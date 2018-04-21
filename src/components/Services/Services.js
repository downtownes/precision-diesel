import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';



class Services extends Component {
    constructor() {
        super();
        this.state = {
            services: []
        }
    }

    componentDidMount() {
        axios.get('/services').then(res => {
            this.setState({
                services: res.data
            })
        })
    }

    render() {
        console.log(this.state.services)
        let serviceCards = this.state.services.map((val, i) => {
            return (
                <Card key={i} className="cardStyling">
                    <Image className="cardImage" src={val.servimage} />
                    <Card.Content>
                        <Card.Header>
                            {val.servname}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {val.servdesc}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <button style={{ color: 'white' }} onClick={() => this.addToCart(val.serviceid)}>Add To Cart</button>
                    </Card.Content>
                </Card>
            )
        })
        return (
            <div className="Parts">
                <div className="cardContainer">
                    {serviceCards}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {

    }
}
export default Services