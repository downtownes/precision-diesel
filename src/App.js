import React, { Component } from 'react';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        {routes}
        <div>
                <div className="footerContainer">
                    <h4>Contact Information</h4>
                    <p>Phone: 208*555*1692</p>
                    <p>Email: precisiondiesel@gmail.com</p>
                </div>
            </div>
      </div>
    );
  }
}

export default App;
