import React from 'react';

const EditSliders = (props) => {
  const showSlides = () =>
    props.slides.map((item) => {
      return (
        <div key={item._id} className="product">
          <div className="product product--list-block">
            <div className="product product--list">
              <div className="slider-item">{item.title}</div>
              <div className="slider-item">{item.description}</div>
              <div className="slider-item">{item.publish}</div>
            </div>
            <div className="product slider-buttons">
              <button
                className="btn btn__btn-small btn--red"
                onClick={() => props.deleteSlide(item._id)}
              >
                Trinti
              </button>
            </div>
          </div>
        </div>
      );
    });
  return <div>{showSlides()}</div>;
};

export default EditSliders;
