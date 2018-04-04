import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import AccountInfo from './components/Profile/AccountInfo';


export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" render={() => (
            <Profile>
                <Switch>
                    <Route path="/profile/accountInfo" component={AccountInfo}/>
                </Switch>
            </Profile>
        )} />
    </Switch>
)