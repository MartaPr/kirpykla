import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSlider } from '../../../actions/slider_actions';
import HomeSlider from './HomeSlider';

class Home extends Component {
  state = {
    slides: [],
  };

  componentDidMount() {
    this.props.dispatch(getSlider()).then((response) => {
      const slides = this.props.slider.size;
      console.log('slides', slides);
      this.setState({
        slides,
      });
    });
  }

  render() {
    return <HomeSlider slides={this.state.slides} />;
  }
}

const mapStateToProps = (props) => {
  return {
    slider: props.slider,
  };
};

export default connect(mapStateToProps)(Home);