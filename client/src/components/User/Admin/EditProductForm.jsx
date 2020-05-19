import React, { Component } from 'react';
import FormField from '../../utils/Form/FormField';
import UserLayout from '../../../Hoc/User';
import { connect } from 'react-redux';
import {
  addProduct,
  clearProduct,
  getProducts,
} from '../../../actions/product_actions';
import {
  update,
  generateData,
  isFormValid,
  resetFields,
  populateFields,
} from '../../utils/Form/FormActions';

class EditProductForm extends Component {
  state = {
    services: [],
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
      console.log('services,', this.state.services);
    });
  }

  updateFields = (newFormdata) => {
    this.setState({
      formdata: newFormdata,
    });
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'products');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
    console.log('element', element);
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'products');

    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });
    setTimeout(() => {
      this.setState(
        {
          formSuccess: false,
        },
        () => {
          this.props.dispatch(clearProduct());
        }
      );
    }, 3000);
  };

  submitForm = (event) => {
    event.preventDefault();

    let datatoSubmit = generateData(this.state.formdata, 'products');
    let formIsValid = isFormValid(this.state.formdata, 'products');

    if (formIsValid) {
      this.props.dispatch(addProduct(datatoSubmit)).then(() => {
        if (this.props.products.addProduct.success) {
          this.resetFieldHandler();
        } else {
          this.setState({ formError: true });
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
      <div>
        <UserLayout>
          <div>
            <h2>Pridėti paslaugą</h2>
            <form onSubmit={(event) => this.submitForm(event)}>
              <FormField
                id={'name'}
                formdata={this.state.formdata.name}
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
                className="btn btn__btn-default"
                onClick={(event) => this.submitForm(event)}
              >
                Išsaugoti
              </button>
            </form>
          </div>
        </UserLayout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(EditProductForm);
