import React, { Component } from 'react';
import './styles.css';
import MaskedInput from 'react-text-mask'
import addressService from "../../../services/address.service";
export default class AddressEdit extends Component {

    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.onChangeAddressZipCode = this.onChangeAddressZipCode.bind(this); // binds the function to the class
        this.onChangeAddressStreet = this.onChangeAddressStreet.bind(this);
        this.onChangeAddressNumber = this.onChangeAddressNumber.bind(this);
        this.onChangeAddressCity = this.onChangeAddressCity.bind(this);
        this.onChangeAddressState = this.onChangeAddressState.bind(this);
        this.onChangeAddressNeighborhood = this.onChangeAddressNeighborhood.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { address: {
                zip_code: '',
                street: '',
                number: '',
                city:'',
                state:'',
                neighborhood:''
            }
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id; // Address ID from router params
        const user = this.props.match.params.user; // User ID from router params
        this.getAddress(user,id);
    }

    getAddress = (user,id) => {
        addressService.getAddress(user,id).then((res) => {
            console.log('Address',res.data);
            this.setState({address:res.data});
        }).catch(err => console.log(err));
    };
    // ... spread operator for Immutable state
    onChangeAddressZipCode(e) {
        this.setState({
            address: {
                ...this.state.address,
                zip_code: e.target.value
            }
        });
    }

    onChangeAddressStreet(e) {
        this.setState({
            address: {
                ...this.state.address,
                street: e.target.value
            }
        });
    }

    onChangeAddressNumber(e) {
        this.setState({
            address: {
                ...this.state.address,
                number: e.target.value
            }
        });
    }
    onChangeAddressCity(e) {
        this.setState({
            address: {
                ...this.state.address,
                city: e.target.value
            }
        });
    }
    onChangeAddressState(e) {
        this.setState({
            address: {
                ...this.state.address,
                state: e.target.value
            }
        });
    }
    onChangeAddressNeighborhood(e) {
        this.setState({
            address: {
                ...this.state.address,
                neighborhood: e.target.value
            }
        });
    }
    checkDisabledForm(){
        return this.state.address.zip_code === '' || this.state.address.state === '';
    }
    onSubmit(e) {
        e.preventDefault(); // prevents form from redirecting
        console.log('Form submitted:', this.state);
        const user = this.props.match.params.user; // User ID from router params
        const id = this.props.match.params.id; // Address ID from router params
        addressService.editAddress(user,id,this.state).then((res) => {
            console.log('EDIT ADDRESS',res.data);
            this.props.history.push('/user/'+user+'/address/list'); // redirect back to user list
        }).catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-sm-8 ">
                        <h3>Editar Endereço</h3>
                        <div className="card card-address">
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="row">
                                        <div className="form-group col-sm-10">
                                            <label>Rua: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.address.street || ''}
                                                onChange={this.onChangeAddressStreet}
                                            />
                                        </div>
                                        <div className="form-group col-sm-2">
                                            <label>Número: </label>
                                            <MaskedInput
                                                mask={[ /[1-9]/, /\d/,/\d/, /\d/, /\d/]}
                                                className="form-control"
                                                placeholder="N•"
                                                guide={false}
                                                value={this.state.address.number || ''}
                                                id="number"
                                                onChange={this.onChangeAddressNumber}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-sm-6">
                                            <label>Cidade: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.address.city || ''}
                                                onChange={this.onChangeAddressCity}
                                            />
                                        </div>
                                        <div className="form-group col-sm-6">
                                            <label>Estado: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.address.state || ''}
                                                onChange={this.onChangeAddressState}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-sm-8">
                                            <label>Bairro: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.address.neighborhood || ''}
                                                onChange={this.onChangeAddressNeighborhood}
                                            />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>CEP: </label>
                                            <MaskedInput
                                                mask={[ /\d/, /\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                                className="form-control"
                                                value={this.state.address.zip_code || ''}
                                                placeholder="CEP"
                                                guide={false}
                                                id="zip_code"
                                                onChange={this.onChangeAddressZipCode}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input disabled={this.checkDisabledForm()} type="submit" value="Salvar Alteraçōes" className="btn btn-primary" />
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