import React from 'react';
import NavBar from '../NavBar/NavBar';




export default function Home() {
    return (
        <div className="Home">
            <div className="welcomeContainer">
                <h1>WELCOME TO PRECISION DIESEL SERVICE</h1>
                <p className="companyDescription">We are a family owned and operated diesel mechanic service based in Preston, Idaho. We have been operating for more than twenty-three years to bring you all of your semi, diesel truck, and tractor needs.</p>
                <div className="contactInfo">
                    <h4>Contact Info</h4>
                    <p>Phone: 208*852*2756</p>
                    <p>Email: precisiondiesel@gmail.com</p>
                </div>
            </div>
        </div>
    )
}