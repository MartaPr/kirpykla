import React, { Component } from 'react';
import UserLayout from '../../../../Hoc/User';

import EditGalleryItem from './EditGalleryItem';
import {
  generateData,
  isFormValid,
  resetFields,
} from '../../../utils/Form/FormActions';
import FileUpload from '../../../utils/Form/FileUpload';

import { connect } from 'react-redux';
import {
  addGallery,
  clearGallery,
  getGallery,
  deleteGallery,
} from '../../../../actions/gallery_actions';

class AddGalleryItem extends Component {
  state = {
    gallery: [],
    showModal: 0,
    formError: false,
    formSuccess: false,
    formdata: {
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

  componentDidMount() {
    this.getGalleryItems();
  }

  updateFields = (newFormdata) => {
    this.setState({
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
    if (formIsValid) {
      this.props.dispatch(addGallery(datatoSubmit)).then(() => {
        if (this.props.gallery.addGallery.success) {
          this.resetFieldHandler();
          this.getGalleryItems();
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

  getGalleryItems = () => {
    this.props.dispatch(getGallery()).then((response) => {
      const gallery = this.props.gallery.gallery;

      this.setState({
        gallery,
      });
    });
  };

  deleteGalleryItem = (id) => {
    this.props.dispatch(deleteGallery(id)).then((response) => {
      this.getGallery();
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
          <h2 className="create-gallery title">Galerijos kūrimas</h2>

          <form onSubmit={(event) => this.submitForm(event)}>
            <FileUpload
              imagesHandler={(images) => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />

            {this.state.formSuccess ? (
              <div className="form-success">Sėkmingai pridėta</div>
            ) : null}

            {this.state.formError ? (
              <div className="error-label">Patikrinkite duomenis</div>
            ) : null}
            <button
              className="btn btn__btn-default"
              onClick={(event) => this.submitForm(event)}
            >
              Pridėti
            </button>
          </form>
        </div>
        <div className="gallery-items-list">
          <EditGalleryItem
            gallery={this.state.gallery}
            deleteGalleryItem={this.deleteGalleryItem}
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
    gallery: state.gallery,
  };
};

export default connect(mapStateToProps)(AddGalleryItem);
