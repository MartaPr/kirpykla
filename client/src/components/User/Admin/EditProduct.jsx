import React, { Component } from 'react';
// import FormField from '../../utils/Form/FormField';
// import ProductList from './ProductList';

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
import { connect } from 'react-redux';
import ButtonOne from '../../utils/Button';

class EditProduct extends Component {
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

  renderFields = () => {
    return <div>form fields</div>;
  };

  showPrices = () =>
    this.state.services.map((item) => {
      return (
        // <ProductList
        //   key={item._id}
        //   name={item.name}
        //   price={item.price}
        //   publish={item.publish}
        //   onClick={this.onClick}
        //   showForm={this.state.showForm}
        //   renderFields={this.renderFields()}
        // >
        //   {item._id}
        //   {item.name}
        //   {item.price}
        //   {item.publish}
        // </ProductList>
        <div key={item._id} className="product">
          <div className="product product--list-block">
            <div className="product product--list">
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>{item.publish}</div>
            </div>
            <div className="product product--buttons">
              {/* <button
                className="btn btn__btn-small"
                onClick={(id) => this.onClick(item._id)}
              >
                Redaguoti
              </button> */}
              <ButtonOne
                type="default"
                className="btn btn__btn-small"
                title="Redaguoti"
                linkTo={`/admin/paslaugos/redaguoti-paslauga/${item._id}`}
              />
              <button className="btn btn__btn-small">Trinti</button>
            </div>
          </div>
        </div>
      );
    });

  render() {
    return (
      <div className="container">
        <div>{this.showPrices()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
export default connect(mapStateToProps)(EditProduct);
