import React from 'react';
import Slider from 'react-slick';
import ButtonOne from '../utils/Button';

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
      console.log('item img', item.image[0].url);
      return (
        <div className="home-slider" key={item._id}>
          <div
            className="slider slider-image"
            style={{
              background: `url(${item.image[0].url}) no-repeat center`,
              backgroundPosition: '50% 0%',
              backgroundSize: 'cover',
              height: '700px',
            }}
          >
            <div className="container">
              <div className="slider slider-wrapper">
                <div className="tag-title">{item.title}</div>
                <div className="tag-text"> {item.description} </div>
                <div>
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
