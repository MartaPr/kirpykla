import React, { Component } from 'react';
import UserLayout from '../../../../Hoc/User';
import FormField from '../../../utils/Form/FormField';

import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from '../../../utils/Form/FormActions';
import {
  getContacts,
  addContacts,
  updateContacts,
} from '../../../../actions/contacts_actions';
import { connect } from 'react-redux';

class ContactInfo extends Component {
  state = {
    contacts: [],
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: '',
          name: 'address_input',
          type: 'text',
          placeholder: 'Įveskite adresą',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          label: '',
          name: 'phone_input',
          type: 'number',
          placeholder: 'Įveskite tel. nr.',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: '',
          name: 'email_input',
          type: 'text',
          placeholder: 'Įveskite el. pašto adresą',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
    },
  };

  componentDidMount() {
    this.getContactInfo();
  }

  updateFields = (newFormdata) => {
    this.setState({
      formdata: newFormdata,
    });
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'contacts');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    let datatoSubmit = generateData(this.state.formdata, 'contacts');
    let formIsValid = isFormValid(this.state.formdata, 'contacts');
    console.log('this.state.contacts.length', this.state.contacts.length);
    if (this.state.contacts.length === 0) {
      if (formIsValid) {
        this.props.dispatch(addContacts(datatoSubmit)).then(() => {
          if (this.props.contacts.addContacts) {
            this.getContactInfo();
            this.setState({ formSuccess: true });
          } else {
            this.setState({ formError: true });
          }
        });
      } else {
        this.setState({
          formError: true,
        });
      }
    } else {
      if (formIsValid) {
        this.props.dispatch(updateContacts(datatoSubmit)).then(() => {
          if (this.props.contacts.updateContacts) {
            this.getContactInfo();
            this.setState({ formSuccess: true });
          } else {
            this.setState({ formError: true });
          }
        });
      } else {
        this.setState({
          formError: true,
        });
      }
    }
  };

  getContactInfo = () => {
    this.props.dispatch(getContacts()).then((response) => {
      let contacts = this.props.contacts.contacts[0];
      if (contacts) {
        this.setState({
          contacts,
        });
        const newFormData = populateFields(
          this.state.formdata,
          this.state.contacts
        );
        this.setState({
          formdata: newFormData,
        });
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <UserLayout>
        <div className="add-product-form">
          <h2>Kontaktai</h2>
          <form onSubmit={(event) => this.submitForm(event)}>
            <FormField
              id={'address'}
              formdata={this.state.formdata.address}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id={'phone'}
              formdata={this.state.formdata.phone}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id={'email'}
              formdata={this.state.formdata.email}
              change={(element) => this.updateForm(element)}
            />

            {this.state.formSuccess ? (
              <div className="form-success">
                Kontaktinė informacija sėkmingai pridėta
              </div>
            ) : null}

            {this.state.formError ? (
              <div className="error-label">Klaidingi duomenys</div>
            ) : null}

            <button
              className="btn btn__btn-default"
              onClick={(event) => this.submitForm(event)}
            >
              Atnaujinti
            </button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (props) => {
  return {
    contacts: props.contacts,
  };
};

export default connect(mapStateToProps)(ContactInfo);
