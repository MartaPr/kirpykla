import React, { Component } from 'react';
import Header from '../components/Header_Footer/Header';
import Footer from '../components/Header_Footer/Footer';

class Layout extends Component {
  render() {
    return (
      <div className="page-main">
        <Header />
        <div className="page_wrapper">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
