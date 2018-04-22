import React, { Component } from 'react';
import routes from './routes';
import NavBar3 from './components/NavBar/NavBar2';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar3 />
        {routes}
        {/* <div>
          <div className="footerContainer">
            <h4 className="footerInfo">Contact Information</h4>
            <p className="footerInfo">Phone: 208*555*1692</p>
            <p className="footerInfo">Email: precisiondiesel@gmail.com</p>
          </div>
        </div> */}
      </div>
    );
  }
}

export default App;
