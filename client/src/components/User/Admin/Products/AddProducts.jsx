import React, { Component } from 'react';
import UserLayout from '../../../../Hoc/User';
import FormField from '../../../utils/Form/FormField';
import EditProduct from './EditProduct';
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from '../../../utils/Form/FormActions';
import {
  addProduct,
  getProducts,
  clearProduct,
  deleteProduct,
} from '../../../../actions/product_actions';
import { connect } from 'react-redux';

class AddProduct extends Component {
  state = {
    services: [],
    showModal: 0,
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
    this.getServices();
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
          this.getServices();
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

  getServices = () => {
    this.props.dispatch(getProducts()).then((response) => {
      let services = this.props.products.services;
      this.setState({
        services,
      });
      console.log('services from props', services);
    });
  };

  deleteService = (id) => {
    this.props.dispatch(deleteProduct(id)).then((response) => {
      this.getServices();
    });
  };

  getModal = (value) => {
    this.setState({ showModal: value });
  };

  hideModal = () => {
    this.setState({ showModal: 0 });
  };

  render() {
    return (
      <UserLayout>
        <div className="add-product-form">
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
        <div className="services-list">
          <EditProduct
            services={this.state.services}
            deleteProduct={this.deleteService}
            hideModal={this.hideModal}
            getModal={this.getModal}
            showModal={this.state.showModal}
          />
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(AddProduct);
