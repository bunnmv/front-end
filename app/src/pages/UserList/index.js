import React, { Component } from 'react';
import userService from '../../services/user.service';
import moment from "moment";
import 'moment/locale/pt-br'

export default class UserList extends Component {
    state = { userList: [{}] };
    componentDidMount(){
        this.refreshList();
    }
    refreshList = () => {
        userService.getUsers.then((res) => {
            console.log(res.data);
            this.setState({ userList: res.data })
        }).catch(err => console.log(err));
    };
    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Data de Nascimento</th>
                    <th scope="col">Adição no Sistema</th>
                </tr>
                </thead>
                <tbody>
                {this.state.userList && this.state.userList.map((user,index) => (
                    <tr key = {index}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.cpf}</td>
                        <td>{moment(user.birth_date).locale('pt-br').format('L')}</td>
                        <td>{moment(user.date_added).locale('pt-br').format('LL')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
}