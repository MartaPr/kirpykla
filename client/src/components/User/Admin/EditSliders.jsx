import React from 'react';

const EditSliders = (props) => {
  const showSlides = () =>
    props.slides.map((item) => {
      return (
        <div key={item._id} className="product">
          <div className="product product--list-block">
            <div className="product product--list">
              <div>{item.title}</div>
              <div>{item.description}</div>
              <div>{item.publish}</div>
            </div>
            <div className="product product--buttons">
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
