import React, { Component } from 'react';
import userService from '../../../services/user.service';
import './styles.css';
import MaskedInput from 'react-text-mask'
import moment from "../UserEdit";

const ErrorMessage = () => (
    <div className="error-message">
        <p>CPF Inválido</p>
    </div>
);


export default class UserCreate extends Component {

    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.onChangeUserName = this.onChangeUserName.bind(this); // binds the function to the class
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserCPF = this.onChangeUserCPF.bind(this);
        this.onChangeUserBirthDate = this.onChangeUserBirthDate.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            invalidCPF:false,
            user: {
                name: '',
                email: '',
                birth_date: '',
                cpf:''
            },
            phones:[{
                mobile:'',
                home:''
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

    testCPF = (e) => {
        let cpf = e.replace(/[^\d]/g, "");
        let sum;
        let remainder;
        sum = 0;
        if (cpf === '00000000000') return false;
        if (cpf === '11111111111') return false;
        if (cpf === '22222222222') return false;
        if (cpf === '33333333333') return false;
        if (cpf === '44444444444') return false;
        if (cpf === '55555555555') return false;
        if (cpf === '66666666666') return false;
        if (cpf === '77777777777') return false;
        if (cpf === '88888888888') return false;
        if (cpf === '99999999999') return false;

        for (let i=1; i<=9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11))  remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10)) ) return false;
        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11))  remainder = 0;
        return remainder === parseInt(cpf.substring(10, 11));
    };
    onChangeUserCPF(e) {
        if(e.target.value.length === 14){
            if(this.testCPF(e.target.value)){
                this.setState({
                    invalidCPF:false,
                    user: {
                        ...this.state.user,
                        cpf: e.target.value // cpf is valid
                    }
                });
            } else {
                this.setState({invalidCPF:true});
            }
        } else {
            this.setState({
                user: {
                    ...this.state.user,
                    cpf: e.target.value
                }
            });
        }
    }

    onChangeUserBirthDate(e) {
        this.setState({
            user: {
                ...this.state.user,
                birth_date: e.target.value
            }
        });
    }

    checkCPFMessage() {
        if(this.state.invalidCPF){
            return <ErrorMessage/>
        }
    }

    checkDisabledForm(){
        return this.state.invalidCPF;
    }

    formatBirthDateUS(date){ // format to Date format for DB
        let parts = date.split('/');
        let day = parts[0];
        let aux_number_day = Number(day);
        aux_number_day > 9? day = String(aux_number_day): day = '0'+String(aux_number_day);
        return parts[2] + '-' + parts[1] + '-' + day;
    }

    onSubmit(e) {
        e.preventDefault(); // prevents form from redirecting
        const user = this.state.user;
        // date has to be formatted back to be saved on DB
        user.birth_date = this.formatBirthDateUS(this.state.user.birth_date);
        console.log('Form submitted:',user);
        userService.createUser({user: user}).then((res) => {
            console.log('NEW USER',res.data);
            this.props.history.push('/'); // redirect back to user list
        }).catch(err => console.log(err));
    }
    render() {
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
                                        <MaskedInput
                                            mask={[ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                            className="form-control"
                                            placeholder="Insira um CPF válido"
                                            guide={false}
                                            id="cpf"
                                            value={this.state.user.cpf || ''}
                                            onChange={this.onChangeUserCPF}
                                        />
                                        { this.checkCPFMessage() }
                                    </div>
                                    <div className="form-group">
                                        <label>Data de Nascimento: </label>
                                        <MaskedInput
                                            mask={[ /\d/, /[1-9]/,'/',/\d/,/[1-9]/,'/', /[1-9]/,/\d/,/\d/,/\d/]}
                                            className="form-control"
                                            placeholder="Ex: Dia/Mês/Ano"
                                            guide={false}
                                            id="birth_date"
                                            value={this.state.user.birth_date || ''}
                                            onChange={this.onChangeUserBirthDate}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input disabled={this.checkDisabledForm()} type="submit" value="Salvar Usuário" className="btn btn-primary" />
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