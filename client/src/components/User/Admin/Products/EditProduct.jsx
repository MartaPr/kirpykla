import React, { useState } from 'react';
import ButtonOne from '../../../utils/Button';
import ConfirmDialog from '../../../utils/ConfirmDiamlog';

const EditProduct = (props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const showPrices = () =>
    props.services.map((item) => {
      return (
        <div key={item._id} className="product">
          <div className="product product--list-block">
            <div className="product product--list service">
              <div className="list-item">{item.name}</div>
              <div className="list-item">nuo {item.price}€ </div>
              <div className="list-item">
                {item.publish ? 'Matoma' : 'Paslėpta'}
              </div>
            </div>
            <div className="product product--buttons">
              <ButtonOne
                type="default"
                className="btn btn__btn-small btn--green"
                title="Redaguoti"
                linkTo={`/admin/paslaugos/redaguoti-paslauga/${item._id}`}
              />
              <div>
                <button
                  className="btn btn__btn-small btn--red"
                  onClick={() => setConfirmOpen(true)}
                >
                  Trinti
                </button>
              </div>
              <ConfirmDialog
                title="Trinti įrašą?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={(id) => props.deleteProduct(item._id)}
              >
                Patvirtinkite, ar tikrai norite ištrinti įrašą?
              </ConfirmDialog>
            </div>
          </div>
        </div>
      );
    });
  return (
    <div className="container services-list">
      <h2>Paslaugų sąrašas</h2>
      {showPrices()}
    </div>
  );
};

export default EditProduct;
