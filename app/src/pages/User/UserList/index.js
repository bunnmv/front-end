import React, { Component } from 'react';
import userService from '../../../services/user.service';
import './styles.css';
import { Link } from 'react-router-dom';
import moment from "moment";
import 'moment/locale/pt-br'
const Message = () => (
    <div className="container message-container">
        <div className="row justify-content-center">
            <h6>Oops... Nenhum usuário cadastrado. Clique <Link to={"/create"}>aqui</Link> para cadastrar um.</h6>
        </div>
    </div>
);
export default class UserList extends Component {
    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.state = {userList: []};
        this.refreshList = this.refreshList.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

    }
    componentDidMount() {
        this.refreshList();
    }
    deleteUser(id){
        console.log('delete', id);
        userService.deleteUser(id).then((res) => {
            console.log(res.data);
            this.refreshList();
        }).catch(err => console.log(err));
    }

    refreshList = () => {
        userService.getUsers().then((res) => {
            console.log('User List',res.data);
            this.setState({ userList: res.data});
        }).catch(err => console.log(err));
    };

    userList() {
        return this.state.userList.length && this.state.userList.map((user,index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.cpf}</td>
                <td>{moment(user.birth_date).locale('pt-br').format('L')}</td>
                <td>{moment(user.date_added).locale('pt-br').format('LL')}</td>
                <td className="row ops-row">
                    <Link to={"/user/edit/"+user.id}>Editar</Link>
                    <button className="link-button" onClick={() => {this.onRemoveClick(user.id)}}>Apagar</button>
                </td>
            </tr>
        ))
    };

    onRemoveClick(id){
        this.deleteUser(id);
    };

    render() {
        if(this.state.userList.length){
            return (
                <div className="row justify-content-center">
                    <div className="col-10">
                        <h3>Usuários Cadastrados</h3>
                        <div className="card">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">CPF</th>
                                    <th scope="col">Data de Nascimento</th>
                                    <th scope="col">Adição no Sistema</th>
                                    <th scope="col">Operações</th>
                                </tr>
                                </thead>
                                <tbody>
                                { this.userList() }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Message/>
        }
    }
}