import React, { Component } from 'react';
import userService from '../../services/user.service';
import { Link } from 'react-router-dom';
import moment from "moment";
import 'moment/locale/pt-br'


const User = props => (
    <tr>
        <th scope="row">{props.index + 1}</th>
        <td>{props.user.name}</td>
        <td>{props.user.email}</td>
        <td>{props.user.cpf}</td>
        <td>{moment(props.user.birth_date).locale('pt-br').format('L')}</td>
        <td>{moment(props.user.date_added).locale('pt-br').format('LL')}</td>
        <td>
            <Link to={"/edit/"+props.user.id}>Editar</Link>
        </td>
    </tr>
);

export default class UserList extends Component {
    state = { userList: [{}] };
    componentDidMount(){
        this.refreshList();
    }

    userList() {
        return this.state.userList && this.state.userList.map((user,index) => (
            <User user={user} index={index} key={index} />
        ))
    }
    refreshList = () => {
        userService.getUsers().then((res) => {
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
                    <th scope="col">Ação</th>
                </tr>
                </thead>
                <tbody>
                { this.userList() }
                </tbody>
            </table>
        )
    }
}