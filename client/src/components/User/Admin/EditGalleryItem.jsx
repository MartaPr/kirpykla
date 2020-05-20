import React from 'react';

const EditGalleryItem = (props) => {
  // const showGalleryItems = () => {
  //   const imageArr = props.gallery.map((item) => {
  //     return item.images;
  //   });

  //   const imgUrl = imageArr.map((item, i) => {
  //     return (
  //       <div key={i} className="img-wrapper">
  //         <div
  //           className="image"
  //           style={{
  //             background: `url(${item[0].url}) center no-repeat`,
  //             backgroundSize: 'cover',
  //           }}
  //         ></div>
  //         <button className="btn btn__btn-small btn--red remove-img">
  //           Trinti
  //         </button>
  //       </div>
  //     );
  //   });

  //   return imgUrl;
  // };

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
                  onClick={() => props.deleteGalleryItem(item._id)}
                >
                  Trinti
                </button>
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
