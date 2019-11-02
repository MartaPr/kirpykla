import React, { Component } from 'react';
import FileUpload from '../../utils/Form/FileUpload';

class Gallery extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Kam taikoma',
          name: 'description_input',
          type: 'text',
          placeholder: ''
        },
        validation: {
          required: false
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

  render() {
    return (
      <div>
        
        <FileUpload
          imagesHandler={images => this.imagesHandler(images)}
          reset={this.state.formSuccess}
        />
    
      </div>
    );
  }
}

export default Gallery;
