import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import phoneService from "../../../services/phone.service";

const Message = (props) => (
    <div className="container message-container">
        <div className="row justify-content-center">
            <h6>Oops... Nenhum telefone cadastrado. Clique <Link to={"/user/"+props.user+"/phone/create"}>aqui</Link> para cadastrar um.</h6>
        </div>
    </div>
);
export default class PhoneList extends Component {
    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.state = {phonesList: []};
        this.refreshList = this.refreshList.bind(this);
        this.deletePhone = this.deletePhone.bind(this);
        this.refreshList();
    }
    componentDidMount() {

    }

    deletePhone(id){
        const user = this.props.match.params.user; // User ID from router params
        phoneService.deletePhone(user,id).then((res) => {
            console.log(res.data);
            this.refreshList();
        }).catch(err => console.log(err));
    }

    refreshList = () => {
        const user = this.props.match.params.user; // User ID from router params
        phoneService.getPhones(user).then((res) => {
            console.log('Phone List',res.data);
            this.setState({ phonesList: res.data});
        }).catch(err => console.log(err));
    };

    phoneList() {
        return this.state.phonesList.length && this.state.phonesList.map((phone,index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{phone.number}</td>
                <td>{phone.type === "MOBILE"? 'Celular': 'Residencial'}</td>
                <td className="row ops-row">
                    <Link to={"/phone/edit/"+phone.id}>Editar</Link>
                    <button className="link-button" onClick={() => {this.onRemoveClick(phone.id)}}>Apagar</button>
                </td>
            </tr>
        ))
    };

    onRemoveClick(id){
        this.deletePhone(id);
    };

    render() {
        const user = this.props.match.params.user;
        if(this.state.phonesList.length){
            return (
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="row">
                            <h3 className="col-sm-10">Telefones Cadastrados de <small> nome do usuario </small></h3>
                            <Link className="new-phone-link" to={"/user/"+user+"/phone/create"}>Novo Telefone</Link>
                        </div>
                        <div className="card">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Número</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Operações</th>
                                </tr>
                                </thead>
                                <tbody>
                                { this.phoneList() }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Message user={user}/>// User ID from router params}/>
        }
    }
}