import React, { Component } from 'react';
import FormField from '../utils/Form/FormField';
import { update, generateData, isFormValid } from '../utils/Form/FormActions';
import Dialog from '@material-ui/core/Dialog';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/user_actions';

class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Įveskite el. pašto adresą',
          label: 'El. pašto adresas'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Įveskite slaptažodį'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Pakartokite slaptažodį'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'register');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  submitForm = e => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'register');
    let formIsValid = isFormValid(this.state.formdata, 'register');

    if (formIsValid) {
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then(response => {
          if (response.payload.success) {
            this.setState({
              formError: false,
              formSuccess: true
            });
            setTimeout(() => {
              this.props.history.push('/prisijungti');
            }, 3000);
          } else {
            this.setState({ formError: true });
          }
        })
        .catch(e => {
          this.setState({ formError: true });
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <div className="signin container-form">
        <h2 className="signin-title">Prisijungimo informacija</h2>
        <form
          className="signin__register-form"
          onSubmit={event => this.submitForm(event)}
        >
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />

          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'confirmPassword'}
            formdata={this.state.formdata.confirmPassword}
            change={element => this.updateForm(element)}
          />

          <div className="checkbox">
            <input type="checkbox" />
            <p className="privacy-policy">
              Su privatumo politika ir naudojimosi taisyklėmis susipažinau ir
              sutinku.
            </p>
            {/* TODO: modalai politika ir taisyklės */}
          </div>
          {this.state.formError ? (
            <div
              className="error-label"
              style={{ color: 'red', marginTop: '7px' }}
            >
              Būtina pažymėti varnelę.
            </div>
          ) : null}
          <button
            className="btn btn-default"
            onSubmit={event => this.submitForm(event)}
          >
            registruotis
          </button>
        </form>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog-alert">
            <h2 className="dialog-header">Sėkmingai užsiregistravote!</h2>
            <div className="dialog-text">Prašome prisijungti</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
