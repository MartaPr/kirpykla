import React from 'react';
import Slider from 'react-slick';
import ButtonOne from '../../utils/Button';

const HomeSlider = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const generateSlides = () => {
    return props.slides.map((item) => {
      return (
        <div className="home-slider" key={item._id}>
          <div
            className="slider slider-image"
            style={{
              background: `url(${item.image[0].url}) no-repeat center`,
              backgroundPosition: '50% 50%',
              backgroundSize: 'cover',
              height: `${props.height - 250}px`,
            }}
          >
            <div className="container">
              <div className="slider slider-wrapper">
                <div className="info-block">
                  <div className="tag-title">{item.title}</div>
                  <div className="tag-text"> {item.description} </div>
                  <div className="slider-button">
                    <ButtonOne
                      type="default"
                      title="Užsirašyti"
                      linkTo="/kontaktai"
                      className="btn btn__btn-default"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="slider">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

export default HomeSlider;
