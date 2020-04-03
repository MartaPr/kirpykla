import React from 'react';
import Slider from 'react-slick';
import ButtonOne from '../utils/Button';

const HomeSlider = props => {
  const slides = [
    {
      img: 'img/img1.jpg',
      lineOne:
        'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      lineTwo: 'Lorem ipsum dolor sit amet',
      linkTitle: 'Užsirašyti',
      linkTo: '/vartotojas/registruotis'
    },
    {
      img: 'img/img2.jpg',
      lineOne:
        'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      lineTwo: 'Lorem ipsum dolor sit amet',
      linkTitle: 'Užsirašyti',
      linkTo: '/vartotojas/registruotis'
    },
    {
      img: 'img/img3.jpg',
      lineOne:
        'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      lineTwo: 'Lorem ipsum dolor sit amet',
      linkTitle: 'Užsirašyti',
      linkTo: '/vartotojas/registruotis'
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  const generateSlides = () =>
    slides
      ? slides.map((item, i) => (
          <div key={i}>
            <div
              className="slider slider-image"
              style={{
                background: `url(${item.img}) no-repeat center`,
                height: '700px',
                backgroundSize: 'auto auto'
              }}
            >
              <div className="container">
                <div className="slider slider-wrapper">
                  <div className="tag-title">{item.lineOne}</div>
                  <div className="tag-title"> {item.lineTwo} </div>
                  <div>
                    <ButtonOne
                      type="default"
                      title={item.linkTitle}
                      linkTo={item.linkTo}
                      className="btn-link"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      : null;

  return (
    <div className="slider">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

export default HomeSlider;
