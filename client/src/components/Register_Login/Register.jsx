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
          placeholder: 'Įveskite el. paštą'
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
          placeholder: 'pakartokite slaptažodį'
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
      <div className="signin-wrapper">
        <h2>Prisijungimo informacija</h2>
        <form
          className="register-form"
          onSubmit={event => this.submitForm(event)}
        >
          <div className="user-email">
            <FormField
              id={'email'}
              formdata={this.state.formdata.email}
              change={element => this.updateForm(element)}
            />
          </div>
          <div className="user-password">
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
          </div>
          <div className="checkbox">
            <input type="checkbox" />
            <div>
              <div>
                su privatumo <span>taisyklėmis</span>
              </div>
              <div>
                ir <span>politika</span> susipažinau
              </div>
            </div>
          </div>
          {this.state.formError ? (
            <div className="error-label">
              Nenumatyta klaida. bandykite dar kartą.
            </div>
          ) : null}
          <button
            className="button button-submit button-register"
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
