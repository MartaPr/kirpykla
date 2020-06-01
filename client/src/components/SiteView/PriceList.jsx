import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/product_actions';
import bgImg from '../../resources/img/bgImg.jpg';

class PriceList extends Component {
  state = {
    services: [],
  };

  componentDidMount() {
    this.props.dispatch(getProducts()).then((response) => {
      const products = this.props.products.services;
      const services = products.filter((service) => service.publish === true);

      this.setState({
        services,
      });

      console.log('services', this.state.services);
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
      <div className="price-list">
        <div className="price-list price-list--left">
          <div className="categories">
            <h2 className="title">Paslaugų kainos</h2>
            {this.showPrices()}
          </div>
        </div>
        <div className="price-list price-list--right">
          <img src={bgImg} alt="bg" />
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
