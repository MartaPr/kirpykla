import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProducts } from '../../actions/product_actions'

class PriceList extends Component {
  state = {
    services: []
  };

  componentDidMount() {
    this.props.dispatch(getProducts()).then(response => {
      let services = this.props.products.services;

      this.setState({
        services
      });
    });
  }


  showCatOne = () =>
    this.state.services.map((item, i) => {
      if (item.category === 'Kirpimas') 
      return <div key={i} className="category">
      <div>{item.description}</div> 
        <div>{item.price}</div>
      </div>;
      
    });

    showCatTwo = () =>
    this.state.services.map((item, i) => {
      if (item.category === 'Kirpimas + dažymas') 
      return <div key={i} className="category">
      <div>{item.description}</div> 
        <div>{item.price}</div>
      </div>;
      
    });

  render() {
    return (
      <div>
        <div>
            <h2>Krpimas</h2>
            {this.showCatOne()}

            <h2>Krpimas + dažymas</h2>
            {this.showCatTwo()}
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}


export default connect(mapStateToProps)(PriceList);