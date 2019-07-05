import React, { Component } from 'react';
import './styles.css';
import MaskedInput from "react-text-mask";
export default class PhoneCreate extends Component {

    constructor(props) {
        super(props); // creates the "this" to class and allow this.state
        this.onChangePhoneNumberMobile = this.onChangePhoneNumberMobile.bind(this);// binds the function to the class
        this.onChangePhoneNumberHome = this.onChangePhoneNumberHome.bind(this);// binds the function to the class
    }
    onChangePhoneNumberMobile(e) {
        this.props.phones[0].mobile = e.target.value;
        this.props.onPhoneChange(this.props.phones);
    }

    onChangePhoneNumberHome(e) {
        this.props.phones[0].home = e.target.value;
        this.props.onPhoneChange(this.props.phones);
    }

    render() {
        const phones = this.props.phones? this.props.phones: [{}];
        console.log('PHONES',phones);
        return (
            <div>
                <div className="address-title">
                    <h4>Telefones</h4>
                </div>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <label>Celular: </label>
                        <MaskedInput
                            mask={['(',/[1-9]/,/[1-9]/,')', ' ', /[1-9]/,' ',/[1-9]/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                            className="form-control"
                            placeholder="Ex:(48) 9 9654-8776"
                            guide={false}
                            id="mobile"
                            value={phones[0].mobile || ''}
                            onChange={this.onChangePhoneNumberMobile}
                        />
                    </div>
                    <div className="form-group col-sm-6">
                        <label>Residencial: </label>
                        <MaskedInput
                            mask={['(',/[1-9]/,/[1-9]/,')',' ',/[1-9]/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                            className="form-control"
                            placeholder="Ex:(48) 3443-8776"
                            guide={false}
                            id="home"
                            value={phones[0].home || ''}
                            onChange={this.onChangePhoneNumberHome}
                        />
                    </div>
                </div>
            </div>
        )
    }
}