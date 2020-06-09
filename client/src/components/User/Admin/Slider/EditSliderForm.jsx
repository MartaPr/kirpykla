import React, { Component } from 'react';
import UserLayout from '../../../../Hoc/User';
import FileUpload from '../../../utils/Form/FileUpload';
import FormField from '../../../utils/Form/FormField';

import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from '../../../utils/Form/FormActions';

import {
  getSliderById,
  updateSlider,
} from '../../../../actions/slider_actions';

import { connect } from 'react-redux';

class EditSliderForm extends Component {
  state = {
    slide: [],
    image: [],
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
          placeholder: 'Įveskite aprašymą',
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
    this.props.dispatch(getSliderById(_id)).then((response) => {
      const slide = this.props.slider.slide;
      const image = this.props.slider.slide.image;
      this.setState({
        slide,
        image,
      });
      console.log('slider state', this.state.slide);
      const newFormData = populateFields(this.state.formdata, this.state.slide);
      this.setState({
        formdata: newFormData,
      });
    });
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

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'update_slider');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
    console.log('update form', newFormdata);
  };

  submitForm = (event) => {
    event.preventDefault();

    const datatoSubmit = generateData(this.state.formdata, 'update_slider');
    const formIsValid = isFormValid(this.state.formdata, 'update_slider');

    if (formIsValid) {
      this.props
        .dispatch(updateSlider(datatoSubmit, this.props.match.params.id))
        .then(() => {
          if (this.state.image.length && this.props.slider.updateSlider) {
            this.setState({ formError: false, formSuccess: true });
            setTimeout(() => {
              this.props.history.push('/admin/pagrindinis-puslapis');
            }, 3000);
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

  getImage = () => {
    return this.state.image.map((item) => {
      return (
        <div key={item.public_id} className="img-wrapper">
          <div
            className="image"
            style={{
              background: `url(${item.url}) center no-repeat`,
              backgroundSize: 'cover',
              height: '300px',
            }}
          ></div>
        </div>
      );
    });
  };

  render() {
    return (
      <UserLayout>
        <div className="add-product-form">
          <h2 className="create-gallery title">
            Pagrindinio puslapio valdymas
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
            />
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
              <div className="form-success">
                Slankiklis sėkmingai atnaujintas
              </div>
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
              Atnaujinti
            </button>
            {this.getImage()}
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (props) => {
  return {
    slider: props.slider,
  };
};

export default connect(mapStateToProps)(EditSliderForm);
