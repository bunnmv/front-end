import React, { Component } from 'react';
import userService from '../../../services/user.service';
import phoneService from '../../../services/phone.service';
import addressService from '../../../services/address.service';
import AddressCreate from '../../Address/AddressCreate'
import PhoneCreate from "../../Phone/PhoneCreate";
import './styles.css';
import MaskedInput from 'react-text-mask'
export default class UserCreate extends Component {

    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.onChangeUserName = this.onChangeUserName.bind(this); // binds the function to the class
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserCPF = this.onChangeUserCPF.bind(this);
        this.onChangeUserBirthDate = this.onChangeUserBirthDate.bind(this);

        this.handleAddressChange=this.handleAddressChange.bind(this);
        this.handlePhoneChange=this.handlePhoneChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user: {
                name: '',
                email: '',
                birth_date: '',
                cpf:''
            },
            phones:[{
                mobile:'',
                home:'',
            }],
            addresses:[{
                zip_code: '',
                street: '',
                number: '',
                city:'',
                state:'',
                neighborhood:''
            }]
        }
    }

    // ... spread operator for Immutable state
    onChangeUserName(e) {
        this.setState({
            user: {
                ...this.state.user,
                name: e.target.value
            }
        });
    }

    onChangeUserEmail(e) {
        this.setState({
            user: {
                ...this.state.user,
                email: e.target.value
            }
        });
    }

    onChangeUserCPF(e) {
        this.setState({
            user: {
                ...this.state.user,
                cpf: e.target.value
            }
        });
    }
    onChangeUserBirthDate(e) {
        if(e.target.value.length===10){ // 10 chars for date string dd/mm/yyyy
            let parts = e.target.value.split('/');
            console.log('parts',parts);
            let day = parts[0];
            let aux_number_day = Number(day)+1; // date hast to increase by one because index starts with 0
            aux_number_day > 9? day = String(aux_number_day): day = '0'+String(aux_number_day);
            const birth_date = parts[2] + '-' + parts[1] + '-' + day;
            console.log('birth_date',birth_date);
            this.setState({
                user: {
                    ...this.state.user,
                    birth_date: birth_date
                }
            });
        } else {
            this.setState({
                user: {
                    ...this.state.user,
                    birth_date: e.target.value
                }
            });
        }
    }

    handlePhoneChange(phones){
        this.setState({
            phones: phones,
        });
    }

    handleAddressChange(addresses){
        this.setState({
            addresses: addresses,
        });
    }


    onSubmit(e) {
        e.preventDefault(); // prevents form from redirecting
        console.log('Form submitted:', this.state);
        userService.createUser({user: this.state.user}).then((res) => {
            console.log('NEW USER',res.data);
            const userID = res.data.user.id;
            phoneService.createPhone(userID,{phone:this.state.phones[0]}).then((res) => {
                console.log('NEW PHONE',res.data);
            }).catch(err => console.log(err));
            addressService.createAddress(userID,{address:this.state.addresses[0]}).then((res) => {
                console.log('NEW ADDRESS',res.data);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));

        this.props.history.push('/'); // redirect back to user list
    }

    render() {
        const phones = this.state.phones;
        const addresses = this.state.addresses;
        return (
            <div className="user-create-component">
                <div className="row justify-content-center">
                    <div className="col-sm-8 ">
                        <h3>Novo Usuário</h3>
                        <div className="card card-user">
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label>Nome: </label>
                                        <input
                                            type="text"
                                            placeholder="Nome"
                                            className="form-control"
                                            value={this.state.user.name || ''}
                                            onChange={this.onChangeUserName}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>E-mail: </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="email@email.com"
                                            value={this.state.user.email || ''}
                                            onChange={this.onChangeUserEmail}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CPF: </label>
                                        {/*<input*/}
                                        {/*    type="text"*/}
                                        {/*    className="form-control"*/}
                                        {/*    value={this.state.user.cpf || ''}*/}
                                        {/*    onChange={this.onChangeUserCPF}*/}
                                        {/*/>*/}
                                        <MaskedInput
                                            mask={[ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                            className="form-control"
                                            placeholder="Insira um CPF válido"
                                            guide={false}
                                            id="cpf"
                                            onChange={this.onChangeUserCPF}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Data de Nascimento: </label>
                                        {/*<input*/}
                                        {/*    type="date"*/}
                                        {/*    className="form-control"*/}
                                        {/*    value={this.state.user.birth_date || ''}*/}
                                        {/*    onChange={this.onChangeUserBirthDate}*/}
                                        {/*/>*/}
                                        <MaskedInput
                                            mask={[ /\d/, /[1-9]/,'/',/\d/,/[1-9]/,'/', /[1-9]/,/\d/,/\d/,/\d/]}
                                            className="form-control"
                                            placeholder="dia/mês/ano"
                                            guide={false}
                                            id="birth_date"
                                            onChange={this.onChangeUserBirthDate}
                                        />
                                    </div>
                                    {/* Pass handlers and values*/}
                                    <PhoneCreate phones={phones} onPhoneChange={this.handlePhoneChange}/>
                                    <AddressCreate addresses={addresses} onAddressChange={this.handleAddressChange}/>
                                    <div className="form-group">
                                        <input type="submit" value="Criar Usuário" className="btn btn-primary" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}