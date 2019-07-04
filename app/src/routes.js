import React from 'react';
import {BrowserRouter, Route, Switch,Link} from 'react-router-dom';
import UserList from './pages/UserList';
import UserCreate from './pages/UserCreate';
import UserDetail from './pages/UserDetail';
import logo from './assets/logo.png';

const Routes = () => (
    <BrowserRouter>
        <div className="container router-container">
            <nav className="navbar navbar-expand-lg navbar-light router-navbar-bg">
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
                            <Link to="/create" className="nav-link">Novo Usuário</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <br/>
        <Switch>
            <Route path="/" exact component={UserList}/>
            <Route path="/user/:id" component={UserDetail}/>
            <Route path="/create" component={UserCreate}/>
        </Switch>
        </div>
    </BrowserRouter>
);

export default Routes;
