import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSlider } from '../../../actions/slider_actions';
import HomeSlider from './HomeSlider';

class Home extends Component {
  state = {
    slides: [],
    height: '',
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.dispatch(getSlider()).then((response) => {
      const getSlides = this.props.slider.size;
      const slides = getSlides.filter((slide) => slide.publish === true);

      console.log('slides', slides);
      this.setState({
        slides,
      });
    });
  }

  updateWindowDimensions = () => {
    this.setState({ height: window.innerHeight });
  };

  render() {
    return <HomeSlider height={this.state.height} slides={this.state.slides} />;
  }
}

const mapStateToProps = (props) => {
  return {
    slider: props.slider,
  };
};

export default connect(mapStateToProps)(Home);
