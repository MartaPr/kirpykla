import React, { Component } from 'react';
import UserLayout from '../../../Hoc/User';
import FormField from '../../utils/Form/FormField';
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from '../../utils/Form/FormActions';
import { addProduct, clearProduct } from '../../../actions/product_actions';
import { connect } from 'react-redux';

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
    category: {
        element: 'select',
        value: '',
        config:{
            label: 'Pasirinkite paslaugą',
            name: 'service_input',
            options:[
              { key: 'Kirpimas', value: 'Kirpimas' },
              { key: 'Dažymas', value: 'Dažymas' },
              { key: 'Kirpimas + dažymas', value: 'Kirpimas + dažymas' },
              { key: 'Proginė šukuosena', value: 'Proginė šukuosena' }
            ]
        },
        validation:{
            required: true
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
    },
      description: {
        element: 'textarea',
        value: '',
        config:{
            label: '',
            name: 'description_input',
            type: 'text',
            placeholder: ''
        },
        validation:{
            required: false
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
    },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Paslaugos kaina',
          name: 'price_input',
          type: 'number',
          placeholder: 'Įveskite kainą'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Skelbti',
          name: 'publish_input',
          options: [
            { key: true, value: 'Skelbti' },
            { key: false, value: 'Paslėpti' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      }
    }
  };
  

  updateFields = newFormdata => {
    this.setState({
      formdata: newFormdata
    });
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'products');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata,'products');

    this.setState({
        formdata: newFormData,
        formSuccess:true
    });
    setTimeout(()=>{
        this.setState({
            formSuccess: false
        },()=>{
            this.props.dispatch(clearProduct())
        })
    },3000)

}

  submitForm = event => {
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
        formError: true
      });
    }
  };

  render() {
    return (
      <div>
        <UserLayout>
          <div>
            <h1>Pridėti paslaugą</h1>
            <form onSubmit={event => this.submitForm(event)}>
            <FormField
                id={'category'}
                formdata={this.state.formdata.category}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={'description'}
                formdata={this.state.formdata.description}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={'price'}
                formdata={this.state.formdata.price}
                change={element => this.updateForm(element)}
              />

              <div className="form-devider" />

              <FormField
                id={'publish'}
                formdata={this.state.formdata.publish}
                change={element => this.updateForm(element)}
              />

              {this.state.formSuccess ? (
                <div className="form-success">Paslauga sėkmingai sukurta</div>
              ) : null}

              {this.state.formError ? (
            
                <div className="error-label">Klaidingi duomenys</div>
              ) : null}

              <button
                className="button button-submit button-register"
                onClick={event => this.submitForm(event)}
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

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(AddProduct);
