import React, { Component } from 'react';
import UserLayout from '../../../Hoc/User';

import FormField from '../../utils/Form/FormField';
import {
  update,
  generateData,
  isFormValid,
  // populateOptionFields,
  resetFields,
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
          placeholder: 'Įveskite pavadinimą',
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
          label: 'Publikuoti',
          name: 'publish_input',
          options: [
            { key: true, value: 'Rodyti' },
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
      images: {
        value: [],
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showlabel: false,
      },
    },
  };

  updateFields = (newFormdata) => {
    this.setState({
      formdata: newFormdata,
    });
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'gallery');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'gallery');

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
          this.props.dispatch(clearGallery());
        }
      );
    }, 3000);
  };

  submitForm = (event) => {
    event.preventDefault();

    let datatoSubmit = generateData(this.state.formdata, 'gallery');
    let formIsValid = isFormValid(this.state.formdata, 'gallery');

    console.log('gallery', this.props);

    if (formIsValid) {
      this.props.dispatch(addGallery(datatoSubmit)).then(() => {
        if (this.props.gallery.addGallery.success) {
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

  imagesHandler = (images) => {
    const newFormData = {
      ...this.state.formdata,
    };
    newFormData['images'].value = images;
    newFormData['images'].valid = true;

    this.setState({
      formdata: newFormData,
    });
  };

  render() {
    return (
      <UserLayout>
        <div className="create-gallery">
          <h2 className="create-gallery title">Galerijos kūrimas</h2>

          <form onSubmit={(event) => this.submitForm(event)}>
            <FileUpload
              imagesHandler={(images) => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />
            <FormField
              id={'name'}
              formdata={this.state.formdata.name}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id={'publish'}
              formdata={this.state.formdata.publish}
              change={(element) => this.updateForm(element)}
            />

            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}

            {this.state.formError ? (
              <div className="error_label">
                Patikrinkite duomenis
                {console.log('error', this.state.formError)}
              </div>
            ) : null}
            <button
              className="btn btn__btn-default"
              onClick={(event) => this.submitForm(event)}
            >
              Pridėti
            </button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gallery: state.gallery,
  };
};

export default connect(mapStateToProps)(addGalleryItem);
