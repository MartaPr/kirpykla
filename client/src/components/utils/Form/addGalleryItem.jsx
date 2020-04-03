import React, { Component } from 'react';
import UserLayout from '../../../Hoc/User';

import FormField from '../../utils/Form/FormField';
import {
  update,
  generateData,
  isFormValid,
  // populateOptionFields,
  resetFields
} from '../../utils/Form/FormActions';
import FileUpload from '../Form/FileUpload';

import { connect } from 'react-redux';
import { addGallery, clearGallery } from '../../../actions/gallery_actions';

class addGalleryItem extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Pavadinimas',
          name: 'name_input',
          type: 'text',
          placeholder: 'Įveskite pavadinimą'
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
          label: 'Publikuoti',
          name: 'publish_input',
          options: [
            { key: true, value: 'Rodyti' },
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
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showlabel: false
      }
    }
  };

  updateFields = newFormdata => {
    this.setState({
      formdata: newFormdata
    });
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'items');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'items');

    this.setState({
      formdata: newFormData,
      formSuccess: true
    });
    setTimeout(() => {
      this.setState(
        {
          formSuccess: false
        },
        () => {
          this.props.dispatch(clearGallery());
        }
      );
    }, 3000);
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'items');
    let formIsValid = isFormValid(this.state.formdata, 'items');

    console.log(this.props);

    if (formIsValid) {
      this.props.dispatch(addGallery(dataToSubmit)).then(() => {
        if (this.props.items.addGallery.success) {
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

  // componentDidMount() {
  //   const formdata = this.state.formdata;

  //   this.props.dispatch(getBrands()).then(response => {
  //     const newFormData = populateOptionFields(
  //       formdata,
  //       this.props.products.brands,
  //       'brand'
  //     );
  //     this.updateFields(newFormData);
  //   });

  //   this.props.dispatch(getWoods()).then(response => {
  //     const newFormData = populateOptionFields(
  //       formdata,
  //       this.props.products.woods,
  //       'wood'
  //     );
  //     this.updateFields(newFormData);
  //   });
  // }

  imagesHandler = images => {
    const newFormData = {
      ...this.state.formdata
    };
    newFormData['images'].value = images;
    newFormData['images'].valid = true;

    this.setState({
      formdata: newFormData
    });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Galerijos kūrimas</h1>

          <form onSubmit={event => this.submitForm(event)}>
            <FileUpload
              imagesHandler={images => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />

            <FormField
              id={'name'}
              formdata={this.state.formdata.name}
              change={element => this.updateForm(element)}
            />

            <div className="form_devider"></div>

            <FormField
              id={'publish'}
              formdata={this.state.formdata.publish}
              change={element => this.updateForm(element)}
            />

            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}

            {this.state.formError ? (
              <div className="error_label">Patikrinkite duomenis</div>
            ) : null}
            <button onClick={event => this.submitForm(event)}>Pridėti</button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

export default connect(mapStateToProps)(addGalleryItem);
