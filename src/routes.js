import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import AccountInfo from './components/Profile/AccountInfo';
import Parts from './components/Parts/Parts';
import Services from './components/Services/Services';


export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" render={() => (
            <Profile>
                <Switch>
                    <Route path="/profile/accountInfo" component={AccountInfo} />
                </Switch>
            </Profile>
        )} />
        <Route path="/parts" component={Parts} />
        <Route path="/services" component={Services} />
    </Switch>
)