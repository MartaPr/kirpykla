import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/product_actions';

class PriceList extends Component {
  state = {
    services: [],
  };

  componentDidMount() {
    this.props.dispatch(getProducts()).then((response) => {
      let services = this.props.products.services;
      console.log('services', services);
      this.setState({
        services,
      });
      console.log('services state', this.state.services);
    });
  }

  showPrices = () =>
    this.state.services.map((item) => {
      return (
        <div key={item._id} className="category">
          <div className="item-category">{item.name}</div>
          <div className="item-price">
            nuo <span style={{ fontWeight: '800' }}> {item.price}€ </span>
          </div>
        </div>
      );
    });

  render() {
    return (
      <div className="container">
        <h2 className="title">Paslaugų kainos</h2>
        <div className="priece-list">
          {this.showPrices()}
          {console.log('show prices')}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(PriceList);
