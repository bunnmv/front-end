import React, { Component } from 'react';
import './styles.css';
import MaskedInput from "react-text-mask";
import phoneService from "../../../services/phone.service";


export default class PhoneCreate extends Component {
    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);// binds the function to the class
        this.onChangePhoneType = this.onChangePhoneType.bind(this);// binds the function to the class
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            phone:{
                number:'',
                type:''
            }
        };
    }
    onChangePhoneNumber(e) {
        this.setState({
            phone: {
                ...this.state.phone,
                number: e.target.value
            }
        });
        console.log(this.state);
    }

    onChangePhoneType(e) {
        this.setState({
            phone: {
                ...this.state.phone,
                type: e.target.value
            }
        });
    }

    phoneNumberType(){
        if (this.state.phone.type === 'MOBILE'){
            return (
                <div className="form-group ">
                    <label>Celular: </label>
                    <MaskedInput
                        mask={['(', /[1-9]/, /[1-9]/, ')', ' ', /[1-9]/, ' ', /[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        className="form-control"
                        placeholder="Ex:(48) 9 9654-8776"
                        guide={false}
                        value={this.state.phone.number || ''}
                        onChange={this.onChangePhoneNumber}
                    />
                </div>
            )
        } else {
            return (
                <div className="form-group">
                    <label>Residencial: </label>
                    <MaskedInput
                        mask={['(', /[1-9]/, /[1-9]/, ')', ' ', /[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        className="form-control"
                        placeholder="Ex:(48) 3443-8776"
                        guide={false}
                        value={this.state.phone.number || ''}
                        onChange={this.onChangePhoneNumber}
                    />
                </div>
            )
        }
    }

    checkDisabledForm(){
        return this.state.phone.number === '' || this.state.phone.type === '';
    }

    onSubmit(e) {
        e.preventDefault(); // prevents form from redirecting
        console.log('Form submitted:', this.state);
        const user = this.props.match.params.user; // User ID from router params
        phoneService.createPhone(user,this.state).then((res) => {
            console.log('NEW PHONE',res.data);
            this.props.history.push('/user/'+user+'/phone/list'); // redirect back to user list
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-sm-8 ">
                        <h3>Novo Telefone</h3>
                        <div className="card card-phone">
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <label>Tipo do telefone: </label>
                                    <div className="form-group">
                                        <div className="form-check form-check-inline">
                                            <input  className="form-check-input"
                                                    type="radio"
                                                    name="priorityOptions"
                                                    id="priorityLow"
                                                    value="MOBILE"
                                                    checked={this.state.phone.type==='MOBILE'}
                                                    onChange={this.onChangePhoneType}
                                            />
                                            <label className="form-check-label">Celular</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input  className="form-check-input"
                                                    type="radio"
                                                    name="priorityOptions"
                                                    id="priorityMedium"
                                                    value="HOME"
                                                    checked={this.state.phone.type ==='HOME'}
                                                    onChange={this.onChangePhoneType}
                                            />
                                            <label className="form-check-label">Residencial</label>
                                        </div>
                                    </div>
                                    {this.phoneNumberType()}
                                    <div className="form-group">
                                        <input disabled={this.checkDisabledForm()} type="submit" value="Salvar Telefone" className="btn btn-primary" />
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