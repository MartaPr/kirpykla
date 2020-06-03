import React from 'react';
import ButtonOne from '../../../utils/Button';
import ConfirmDialog from '../../../utils/ConfirmDiamlog';

const EditSliders = (props) => {
  const showSlides = () => {
    return props.slides.map((item) => {
      return (
        <div key={item._id} className="slider">
          <div className="slider slider--list-block">
            <div className="slider slider--list">
              <div className="slider-item-title">{item.title}</div>
              <p className="slider-item-description">{item.description}</p>
              <div className="list-item-publish">
                {item.publish ? 'Matoma' : 'Paslėpta'}
              </div>
            </div>
            <div className="slider slider-buttons">
              <ButtonOne
                type="default"
                className="btn btn__btn-small btn--green"
                title="Redaguoti"
                linkTo={`/admin/pagrindinis-puslapis/${item._id}`}
              />
              <button
                className="btn btn__btn-small btn--red"
                onClick={() => props.getModal(item._id)}
              >
                Trinti
              </button>
              <ConfirmDialog
                title="Trinti įrašą?"
                open={props.showModal === item._id}
                setOpen={props.hideModal}
                onConfirm={() => props.deleteSlide(item._id)}
              >
                Patvirtinkite, ar tikrai norite ištrinti įrašą?
              </ConfirmDialog>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div>{showSlides()}</div>;
};

export default EditSliders;
