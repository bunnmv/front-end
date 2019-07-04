import React, { Component } from 'react';
import './styles.css';
export default class PhoneCreate extends Component {

    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);// binds the function to the class
    }
    onChangePhoneNumber(e) {
        this.props.phones[0].number = e.target.value;
        this.props.onPhoneChange(this.props.phones);
    }

    render() {
        const phones = this.props.phones;
        return (
            <div>
                <div className="address-title">
                    <h4>Telefones</h4>
                </div>
                <div className="form-group">
                    <label>Número: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={phones[0].number || ''}
                        onChange={this.onChangePhoneNumber}
                    />
                </div>
            </div>
        )
    }
}