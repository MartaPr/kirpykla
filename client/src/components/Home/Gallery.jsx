import React, { Component } from 'react';
import { getGallery } from '../../actions/gallery_actions';
import { connect } from 'react-redux';

class Gallery extends Component {
  state = {
    limit: ''
  };

  componentDidMount() {
    this.props.dispatch(getGallery);
  }

  render() {
    const services = this.props.services;
    return <div></div>;
  }
}
const mapStateToProps = state => {
  return {
    services: state.services
  };
};
export default connect(mapStateToProps)(Gallery);
