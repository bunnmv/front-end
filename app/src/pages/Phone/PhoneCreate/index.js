import React, { Component } from 'react';
import './styles.css';
export default class PhoneCreate extends Component {

    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);// binds the function to the class
        this.state = { phone: {
                number: ''
            }
        }
    }
    // ... spread operator for Immutable state
    onChangePhoneNumber(e) {
        this.setState({
            phone: {
                ...this.state.phone,
                number: e.target.value
            }
        });
    }

    render() {
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
                        value={this.state.phone.number || ''}
                        onChange={this.onChangePhoneNumber}
                    />
                </div>
            </div>
        )
    }
}