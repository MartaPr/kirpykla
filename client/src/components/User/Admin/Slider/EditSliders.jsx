import React from 'react';

const EditSliders = (props) => {
  const showSlides = () => {};
  return props.slides.map((item) => {
    return (
      <div key={item._id} className="slider">
        <div className="slider slider--list-block">
          <div className="slider slider--list">
            <div className="slider-item-title">{item.title}</div>
            <p className="slider-item-description">{item.description}</p>
          </div>
          <div className="slider slider-buttons">
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
