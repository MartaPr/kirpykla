import React from 'react';
import ButtonOne from '../../utils/Button';
// import EditProductForm from './EditProductForm';
// import FormField from '../../utils/Form/FormField';

const ProductList = (props) => {
  return (
    <div className="product">
      <div className="product product--list-block">
        <div className="product product--list">
          <div>{props.name}</div>
          <div>{props.price}</div>
          <div>{props.publish}</div>
        </div>
        <div className="product product--buttons">
          <button className="btn btn__btn-small" onClick={props.onClick}>
            Redaguoti
          </button>

          <button className="btn btn__btn-small">Trinti</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
