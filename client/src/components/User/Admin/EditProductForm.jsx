import React, { Component } from 'react';
import FormField from '../../utils/Form/FormField';
import UserLayout from '../../../Hoc/User';
import {
  getProducts,
  updateProduct,
  clearProduct,
} from '../../../actions/product_actions';
import {
  update,
  populateFields,
  generateData,
  isFormValid,
} from '../../utils/Form/FormActions';

class EditProductForm extends Component {
  state = {
    services: [],
    showForm: false,
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: '',
          name: 'name_input',
          type: 'text',
          placeholder: 'Įveskite paslaugą',
        },
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Paslaugos kaina',
          name: 'price_input',
          type: 'number',
          placeholder: 'Įveskite kainą',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Skelbti',
          name: 'publish_input',
          options: [
            { key: true, value: 'Skelbti' },
            { key: false, value: 'Paslėpti' },
          ],
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
    this.props.dispatch(getProducts()).then((response) => {
      const services = this.props.products.services;
      const newFormData = populateFields(
        this.state.formdata,
        this.props.products.services
      );
      this.setState({
        formdata: newFormData,
        services,
      });
    });
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'update_service');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'update_service');
    let formIsValid = isFormValid(this.state.formdata, 'update_servicer');

    if (formIsValid) {
      this.props.dispatch(updateProduct(dataToSubmit)).then(() => {
        if (this.props.user.updateProduct.success) {
          this.setState(
            {
              formSuccess: true,
            },
            () => {
              setTimeout(() => {
                this.props.dispatch(clearProduct());
                this.setState({
                  formSuccess: false,
                });
              }, 2000);
            }
          );
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Pridėti paslaugą</h1>
          <form onSubmit={(event) => this.submitForm(event)}>
            <FormField
              id={'category'}
              formdata={this.state.formdata.category}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id={'description'}
              formdata={this.state.formdata.description}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id={'price'}
              formdata={this.state.formdata.price}
              change={(element) => this.updateForm(element)}
            />

            <div className="form-devider" />

            <FormField
              id={'publish'}
              formdata={this.state.formdata.publish}
              change={(element) => this.updateForm(element)}
            />

            {this.state.formSuccess ? (
              <div className="form-success">Paslauga sėkmingai sukurta</div>
            ) : null}

            {this.state.formError ? (
              <div className="error-label">Klaidingi duomenys</div>
            ) : null}

            <button
              className="button button-submit button-register"
              onClick={(event) => this.submitForm(event)}
            >
              Išsaugoti
            </button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

export default EditProductForm;
