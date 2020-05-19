import React from 'react';
import Slider from 'react-slick';
import ButtonOne from '../utils/Button';

const HomeSlider = (props) => {
  const slides = [
    {
      img: 'img/elena-taranenko-wKdCfeqwwi0-unsplash.jpg',
      lineOne:
        'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      lineTwo: 'Lorem ipsum dolor sit amet',
      linkTitle: 'Užsirašyti',
      linkTo: '/vartotojas/registruotis',
    },
    {
      img: 'img/frederick-medina-LW2sL5QEmyk-unsplash.jpg',
      lineOne:
        'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      lineTwo: 'Lorem ipsum dolor sit amet',
      linkTitle: 'Užsirašyti',
      linkTo: '/vartotojas/registruotis',
    },
    {
      img: 'img/laura-chouette-BFPoAq_IyWI-unsplash.jpg',
      lineOne:
        'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      lineTwo: 'Lorem ipsum dolor sit amet',
      linkTitle: 'Užsirašyti',
      linkTo: '/vartotojas/registruotis',
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const generateSlides = () =>
    slides
      ? slides.map((item, i) => (
          <div key={i}>
            <div
              className="slider slider-image"
              style={{
                background: `url(${item.img}) center no-repeat`,
                height: '700px',
                backgroundSize: 'cover',
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
                      className="btn btn__btn-default"
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
