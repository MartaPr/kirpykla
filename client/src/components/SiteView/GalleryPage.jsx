import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGalleryItems } from '../../actions/gallery_actions';
import ImageGallery from 'react-image-gallery';

class GalleryPage extends Component {
  state = {
    gallery: [],
  };

  componentDidMount() {
    this.props.dispatch(getGalleryItems()).then((response) => {
      const gallery = this.props.gallery.toGallery;
      this.setState({
        gallery,
      });
    });
  }

  renderGallery = () => {
    const imageArr = this.state.gallery.map((item) => {
      return item.images;
    });

    const imgUrl = imageArr.map((item) => {
      return item[0].url;
    });

    const newImage = [];
    imgUrl.forEach((item) => {
      newImage.push({
        original: item,
        thumbnail: item,
        thumbnailPosition: 'left',
      });
    });

    if (newImage) {
      return <ImageGallery items={newImage} />;
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="gallery">{this.renderGallery()}</div>
      </div>
    );
  }
}

const mapStateToProps = (props) => {
  return {
    gallery: props.gallery,
  };
};

export default connect(mapStateToProps)(GalleryPage);
