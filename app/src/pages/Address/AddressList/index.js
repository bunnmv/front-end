import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import addressService from "../../../services/address.service";

const Message = () => (
    <div className="container message-container">
        <div className="row justify-content-center">
            <h6>Oops... Nenhum endereço cadastrado. Clique <Link to={"/address/create"}>aqui</Link> para cadastrar um.</h6>
        </div>
    </div>
);
export default class AddressList extends Component {
    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.state = {addressList: []};
        this.refreshList = this.refreshList.bind(this);
        this.deleteAddress = this.deleteAddress.bind(this);
        this.refreshList();
    }
    componentDidMount() {

    }

    deleteAddress(id){
        let user = 1; // todo fix
        addressService.deleteAddress(user,id).then((res) => {
            console.log(res.data);
            this.refreshList();
        }).catch(err => console.log(err));
    }

    refreshList = () => {
        const user =this.props.match.params.user; // User ID from router params
        addressService.getAddresses(user).then((res) => {
            console.log('Address List',res.data);
            this.setState({ addressList: res.data});
        }).catch(err => console.log(err));
    };

    addressList() {
        return this.state.addressList.length && this.state.addressList.map((address,index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{address.street}</td>
                <td>{address.number}</td>
                <td>{address.neighborhood}</td>
                <td>{address.city}</td>
                <td>{address.state}</td>
                <td>{address.zip_code}</td>
                <td className="row ops-row">
                    <Link to={"/address/edit/"+address.id}>Editar</Link>
                    <button className="link-button" onClick={() => {this.onRemoveClick(address.id)}}>Apagar</button>
                </td>
            </tr>
        ))
    };

    onRemoveClick(id){
        this.deleteAddress(id);
    };

    render() {
        if(this.state.addressList.length){
            return (
                <div className="row justify-content-center">
                    <div className="col-10">
                        <h3>Endereços Cadastrados de <small> nome do usuario </small></h3>
                        <div className="card">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Rua</th>
                                    <th scope="col">Número</th>
                                    <th scope="col">Bairro</th>
                                    <th scope="col">Cidade</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">CEP</th>
                                </tr>
                                </thead>
                                <tbody>
                                { this.addressList() }
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