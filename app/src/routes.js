import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={UserList}/>
            <Route path="/user/:id" component={UserDetail}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;
