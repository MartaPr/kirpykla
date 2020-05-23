import React, { Component } from 'react';
import UserLayout from '../../../Hoc/User';
import FileUpload from './FileUpload';
import FormField from '../../utils/Form/FormField';
import EditSliders from '../Admin/EditSliders';

import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from '../../utils/Form/FormActions';

import {
  addSliderItem,
  clearSliderItem,
  deleteSliderItem,
  getSliderImages,
} from '../../../actions/slider_actions';

import { connect } from 'react-redux';

class AddSliderItem extends Component {
  state = {
    slides: [],
    formError: false,
    formSuccess: false,
    formdata: {
      title: {
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
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Aprašymas',
          name: 'name_input',
          type: 'text',
          placeholder: '',
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
      image: {
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
    this.getSlides();
  }

  imagesHandler = (image) => {
    const newFormData = {
      ...this.state.formdata,
    };
    newFormData['image'].value = image;
    newFormData['image'].valid = true;

    this.setState({
      formdata: newFormData,
    });
  };

  updateFields = (newFormdata) => {
    this.setState({
      formdata: newFormdata,
    });
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'slider');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
    console.log('element', element);
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'slider');

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
          this.props.dispatch(clearSliderItem());
        }
      );
    }, 3000);
  };

  submitForm = (event) => {
    event.preventDefault();

    let datatoSubmit = generateData(this.state.formdata, 'slider');
    let formIsValid = isFormValid(this.state.formdata, 'slider');

    if (formIsValid) {
      this.props.dispatch(addSliderItem(datatoSubmit)).then(() => {
        if (this.props.slider) {
          this.resetFieldHandler();
          this.getSlides();
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

  getSlides = () => {
    this.props.dispatch(getSliderImages()).then((response) => {
      let slides = this.props.slider.sliderImg;
      this.setState({
        slides,
      });
      console.log('slides from props', slides);
    });
  };

  deleteSlide = (id) => {
    this.props.dispatch(deleteSliderItem(id)).then((response) => {
      this.getSlides();
    });
  };

  render() {
    return (
      <UserLayout>
        <div className="add-product-form">
          <h2 className="create-gallery title">
            Pagrindinio puslapio slaideris
          </h2>

          <form onSubmit={(event) => this.submitForm(event)}>
            <FileUpload
              imagesHandler={(image) => this.imagesHandler(image)}
              reset={this.state.formSuccess}
            />
            <FormField
              id={'title'}
              formdata={this.state.formdata.title}
              change={(element) => this.updateForm(element)}
            />{' '}
            <FormField
              id={'description'}
              formdata={this.state.formdata.description}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'publish'}
              formdata={this.state.formdata.publish}
              change={(element) => this.updateForm(element)}
            />
            {this.state.formSuccess ? (
              <div className="form-success">Sėkmingai pridėta</div>
            ) : null}
            {this.state.formError ? (
              <div className="error-label">
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
        <div className="slider-items-list">
          <EditSliders
            slides={this.state.slides}
            deleteSlide={this.deleteSlide}
          />
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    slider: state.slider,
  };
};

export default connect(mapStateToProps)(AddSliderItem);
