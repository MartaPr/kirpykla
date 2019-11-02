import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@material-ui/core';

class FileUpload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false
  };

  showUploadedImages = () => {
    this.setState({
      uploading: true
    });
  };

  onDrop = (files) => {
    this.setState({uploading:true});
    let formData = new FormData();
    const config = {
        header: {'content-type':'multipart/form-data'}
    }
    formData.append("file",files[0]);

    axios.post('/api/users/uploadimage',formData,config)
    .then(response => {

         console.log(response.data)

         this.setState({
             uploading:false,
             uploadedFiles:[
                 ...this.state.uploadedFiles,
                 response.data
             ]
         },()=>{
             this.props.imagesHandler(this.state.uploadedFiles)
         })
    });
 }

  render() {
    return (
      <div>
        <section className="dropzone clear">
          <Dropzone
            onDrop={e => this.onDrop(e)}
            multiple={false}
            className="dropzone-box"
          >
            <div className="wrap">
              <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            </div>

            {this.showUploadedImages}
            {this.state.uploading ? (
              <div
                className="dropzone-box"
                style={{
                  textAlign: 'center',
                  paddingTop: '60px'
                }}
              >
                <CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
              </div>
            ) : null}
          </Dropzone>
        </section>
      </div>
    );
  }
}

export default FileUpload;
