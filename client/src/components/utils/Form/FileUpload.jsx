import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileupload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false,
  };

  onDrop = (files) => {
    this.setState({ uploading: true });
    const formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/users/uploadimage', formData, config).then((response) => {
      console.log('file upload', response.data);

      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data],
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        }
      );
    });
  };

  onRemove = (id) => {
    axios.get(`/api/users/removeimage?public_id=${id}`).then((response) => {
      let images = this.state.uploadedFiles.filter((item) => {
        return item.public_id !== id;
      });

      this.setState(
        {
          uploadedFiles: images,
        },
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };

  showUploadedImages = () =>
    this.state.uploadedFiles.map((item) => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{
            background: `url(${item.url})`,
            height: '300px',
            width: '300px',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>
    ));

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadedFiles: [],
      });
    }
    return null;
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            onDrop={(e) => this.onDrop(e)}
            multiple={false}
            className="dropzone-box"
          >
            <div className="wrap">
              <FontAwesomeIcon icon={faPlusCircle} />
              <span className="icon-text">Įkelti nuotrauką</span>
            </div>
          </Dropzone>
          {this.showUploadedImages()}
          {this.state.uploading ? (
            <div
              className="dropzone-box"
              style={{
                textAlign: 'center',
                paddingTop: '60px',
              }}
            >
              <CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
            </div>
          ) : null}
        </div>
      </section>
    );
  }
}

export default Fileupload;
