import React from 'react';
import ConfirmDialog from '../../../utils/ConfirmDiamlog';

const EditGalleryItem = (props) => {
  const showGalleryItems = () => {
    const renderCards = props.gallery.map((item) => {
      return (
        <div key={item._id}>
          {item.images.map((img, i) => {
            return (
              <div key={i} className="img-wrapper">
                <div
                  className="image"
                  style={{
                    background: `url(${img.url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
                <button
                  className="btn btn__btn-small btn--red remove-img"
                  onClick={() => props.getModal(item._id)}
                >
                  Trinti
                </button>
                <ConfirmDialog
                  title="Trinti įrašą?"
                  open={props.showModal === item._id}
                  setOpen={props.hideModal}
                  onConfirm={(id) => props.deleteGalleryItem(item._id)}
                >
                  Patvirtinkite, ar tikrai norite ištrinti nuotrauką?
                </ConfirmDialog>
              </div>
            );
          })}
        </div>
      );
    });
    return renderCards;
  };

  return <div className="image-list">{showGalleryItems()}</div>;
};

export default EditGalleryItem;
