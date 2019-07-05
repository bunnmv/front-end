import React from 'react';
import {BrowserRouter, Route, Switch,Link} from 'react-router-dom';
import UserList from './pages/User/UserList';
import UserCreate from './pages/User/UserCreate';
import UserEdit from './pages/User/UserEdit';
import PhoneList from './pages/Phone/PhoneList';
import AddressList from './pages/Address/AddressList';
import AddressCreate from './pages/Address/AddressCreate';
import PhoneCreate from './pages/Phone/PhoneCreate';
import logo from './assets/logo.png';
import PhoneEdit from "./pages/Phone/PhoneEdit";
import AddressEdit from "./pages/Address/AddressEdit";

const Routes = () => (
    <BrowserRouter>
        <div className="container router-container">
            <nav className="navbar navbar-expand-lg navbar-light router-navbar-bg ">
                <a className="navbar-brand" href="https://github.com/bunnmv/fullstack" rel="noopener noreferrer" target="_blank">
                    <img src={logo} width="40" height="40" alt="logo"/>
                </a>
                <Link to="/" className="navbar-brand">CRUD Usuário</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Listar Usuários</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user/create" className="nav-link">Novo Usuário</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <br/>
        <Switch>
            <Route path="/" exact component={UserList}/>
            <Route path="/user/edit/:id" component={UserEdit}/>
            <Route path="/user/create" component={UserCreate}/>
            <Route path="/user/:user/address/create" component={AddressCreate}/>
            <Route path="/user/:user/phone/create" component={PhoneCreate}/>
            <Route path="/user/:user/address/edit/id" component={AddressEdit}/>
            <Route path="/user/:user/phone/edit/id" component={PhoneEdit}/>
            <Route path="/user/:user/address/list" component={AddressList}/>
            <Route path="/user/:user/phone/list" component={PhoneList}/>
        </Switch>
        </div>
    </BrowserRouter>
);

export default Routes;
