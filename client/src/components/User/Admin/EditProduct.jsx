import React from 'react';
import ButtonOne from '../../utils/Button';

const EditProduct = (props) => {
  const showPrices = () =>
    props.services.map((item) => {
      return (
        <div key={item._id} className="product">
          <div className="product product--list-block">
            <div className="product product--list">
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>{item.publish}</div>
            </div>
            <div className="product product--buttons">
              <ButtonOne
                type="default"
                className="btn btn__btn-small btn--green"
                title="Redaguoti"
                linkTo={`/admin/paslaugos/redaguoti-paslauga/${item._id}`}
              />

              <button
                className="btn btn__btn-small btn--red"
                onClick={() => props.deleteProduct(item._id)}
              >
                Trinti
              </button>
            </div>
          </div>
        </div>
      );
    });
  return (
    <div className="container">
      <div>{showPrices()}</div>
    </div>
  );
};

export default EditProduct;
