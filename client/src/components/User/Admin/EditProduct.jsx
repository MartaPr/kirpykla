import React, { Component } from 'react';

import { connect } from 'react-redux';
import ButtonOne from '../../utils/Button';

class EditProduct extends Component {
  state = {
    services: [],
  };

  componentWillMount() {
    this.props.dispatch(getProducts()).then((response) => {
      let services = this.props.products.services;

      this.setState({
        services,
      });
    });
  }

  renderFields = () => {
    return <div>form fields</div>;
  };

  showPrices = () =>
    this.state.services.map((item) => {
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
                className="btn btn__btn-small"
                title="Redaguoti"
                linkTo={`/admin/paslaugos/redaguoti-paslauga/${item._id}`}
              />
              <button className="btn btn__btn-small">Trinti</button>
            </div>
          </div>
        </div>
      );
    });

  render() {
    return (
      <div className="container">
        <div>{this.showPrices()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
export default connect(mapStateToProps)(EditProduct);
