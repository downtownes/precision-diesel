import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import AccountInfo from './components/Profile/AccountInfo';
import Parts from './components/Parts/Parts';
import Services from './components/Services/Services';
import Cart from './components/Profile/Cart';


export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" render={() => (
            <Profile>
                <Switch>
                    <Route path="/profile/accountInfo" component={AccountInfo} />
                    <Route path="/profile/cart" component={Cart} />
                </Switch>
            </Profile>
        )} />
        <Route path="/parts" component={Parts} />
        <Route path="/services" component={Services} />
    </Switch>
)