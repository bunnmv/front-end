import React, { Component } from 'react';
import userService from '../../services/user.service';
export default class UserCreate extends Component {

    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.onChangeUserName = this.onChangeUserName.bind(this); // binds the function to the class
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserCPF = this.onChangeUserCPF.bind(this);
        this.onChangeUserBirthDate = this.onChangeUserBirthDate.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = { user: {
                name: '',
                email: '',
                birth_date: '',
                cpf:''
            }
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
        this.setState({
            user: {
                ...this.state.user,
                birth_date: e.target.value
            }
        });
    }

    onSubmit(e) {
        e.preventDefault(); // prevents form from redirecting
        console.log('Form submitted:', this.state);
        userService.createUser(this.state).then((res) => {
            console.log(res.data);
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-8 card">
                    <div className="card-header">
                        <h3>Novo Usuário</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Nome: </label>
                                <input
                                    type="text"
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
                                    value={this.state.user.email || ''}
                                    onChange={this.onChangeUserEmail}
                                />
                            </div>
                            <div className="form-group">
                                <label>CPF: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.user.cpf || ''}
                                    onChange={this.onChangeUserCPF}
                                />
                            </div>
                            <div className="form-group">
                                <label>Data de Nascimento: </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={this.state.user.birth_date || ''}
                                    onChange={this.onChangeUserBirthDate}
                                />
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Adicionar" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}