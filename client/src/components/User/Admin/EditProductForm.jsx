import React, { Component } from 'react';
import FormField from '../../utils/Form/FormField';
import UserLayout from '../../../Hoc/User';
import { connect } from 'react-redux';
import {
  clearProduct,
  updateProduct,
  getProductById,
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
    const _id = this.props.match.params.id;
    this.props.dispatch(getProductById(_id)).then((response) => {
      let services = this.props.products.services;
      this.setState({
        services,
      });
      const newFormData = populateFields(
        this.state.formdata,
        this.state.services
      );
      this.setState({
        formdata: newFormData,
      });
      console.log('formdata', this.state.formdata);
    });
  }

  // updateFields = (newFormdata) => {
  //   this.setState({
  //     formdata: newFormdata,
  //   });
  // };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'update_product');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
    console.log('update form', newFormdata);
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'update_product');

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

    let datatoSubmit = generateData(this.state.formdata, 'update_product');
    let formIsValid = isFormValid(this.state.formdata, 'update_product');

    console.log('datatoSubmit', datatoSubmit);
    if (formIsValid) {
      this.props
        .dispatch(updateProduct(datatoSubmit, this.props.match.params.id))
        .then(() => {
          if (this.props.products.updateProduct.success) {
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
                <div className="form-success">
                  Paslauga sėkmingai atnaujinta
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
