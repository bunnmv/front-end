import React, { Component } from 'react';
import './styles.css';
export default class AddressCreate extends Component {

    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.onChangeAddressZipCode = this.onChangeAddressZipCode.bind(this); // binds the function to the class
        this.onChangeAddressStreet = this.onChangeAddressStreet.bind(this);
        this.onChangeAddressNumber = this.onChangeAddressNumber.bind(this);
        this.onChangeAddressCity = this.onChangeAddressCity.bind(this);
        this.onChangeAddressState = this.onChangeAddressState.bind(this);
        this.onChangeAddressNeighborhood = this.onChangeAddressNeighborhood.bind(this);
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

    // // ... spread operator for Immutable state
    // onChangeAddressZipCode(e) {
    //     this.setState({
    //         address: {
    //             ...this.state.address,
    //             zip_code: e.target.value
    //         }
    //     });
    // }
    //
    // onChangeAddressStreet(e) {
    //     this.setState({
    //         address: {
    //             ...this.state.user,
    //             street: e.target.value
    //         }
    //     });
    // }
    //
    // onChangeAddressNumber(e) {
    //     this.setState({
    //         address: {
    //             ...this.state.address,
    //             number: e.target.value
    //         }
    //     });
    // }
    // onChangeAddressCity(e) {
    //     this.setState({
    //         address: {
    //             ...this.state.address,
    //             city: e.target.value
    //         }
    //     });
    // }
    // onChangeAddressState(e) {
    //     this.setState({
    //         address: {
    //             ...this.state.address,
    //             state: e.target.value
    //         }
    //     });
    // }
    // onChangeAddressNeighborhood(e) {
    //     this.setState({
    //         address: {
    //             ...this.state.address,
    //             neighborhood: e.target.value
    //         }
    //     });
    // }

    // ... spread operator for Immutable state
    onChangeAddressZipCode(e) {
        this.props.addresses[0].zip_code = e.target.value;
        this.props.onAddressChange(this.props.addresses);
    }

    onChangeAddressStreet(e) {
        this.props.addresses[0].street = e.target.value;
        this.props.onAddressChange(this.props.addresses);
    }

    onChangeAddressNumber(e) {
        this.props.addresses[0].number = e.target.value;
        this.props.onAddressChange(this.props.addresses);
    }
    onChangeAddressCity(e) {
        this.props.addresses[0].city = e.target.value;
        this.props.onAddressChange(this.props.addresses);
    }
    onChangeAddressState(e) {
        this.props.addresses[0].state = e.target.value;
        this.props.onAddressChange(this.props.addresses);
    }
    onChangeAddressNeighborhood(e) {
        this.props.addresses[0].neighborhood = e.target.value;
        this.props.onAddressChange(this.props.addresses);
    }
    render() {
        const addresses = this.props.addresses;
        return (
            <div>
                <div className="address-title">
                    <h4>Endereços</h4>
                </div>
                <div className="row">
                    <div className="form-group col-sm-10">
                        <label>Rua: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={addresses[0].street || ''}
                            onChange={this.onChangeAddressStreet}
                        />
                    </div>
                    <div className="form-group col-sm-2">
                        <label>Número: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={addresses[0].number || ''}
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
                            value={addresses[0].city || ''}
                            onChange={this.onChangeAddressCity}
                        />
                    </div>
                    <div className="form-group col-sm-6">
                        <label>Bairro: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={addresses[0].neighborhood || ''}
                            onChange={this.onChangeAddressNeighborhood}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-8">
                        <label>Estado: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={addresses[0].state || ''}
                            onChange={this.onChangeAddressState}
                        />
                    </div>
                    <div className="form-group col-sm-4">
                        <label>CEP: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={addresses[0].zip_code || ''}
                            onChange={this.onChangeAddressZipCode}
                        />
                    </div>
                </div>
            </div>
        )
    }
}