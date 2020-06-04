import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions';
import logoA from '../../../resources/styles/elements/Logo/logoA.svg';

class Header extends Component {
  state = {
    isOpen: false,
    className: '',
    logo: {
      name: '',
      linkTo: '/',
      public: true,
    },
    page: [
      {
        name: 'Galerija',
        linkTo: '/darbu-galerija',
        public: true,
      },
      {
        name: 'Paslaugos',
        linkTo: '/kainynas',
        public: true,
      },
      {
        name: 'Kontaktai',
        linkTo: '/kontaktai',
        public: true,
      },
    ],
    user: [
      {
        name: 'ADMIN',
        linkTo: '/admin/pagrindinis-puslapis',
        public: false,
      },
      {
        name: 'Atsijungti',
        linkTo: '/vartotojas/atsijungti',
        public: false,
      },
    ],
  };

  componentDidMount() {
    this.setState({
      className: 'invisible',
    });
  }

  handleMenuClick = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({
        isOpen: false,
        className: 'wrapper invisible',
      });
    } else {
      this.setState({
        isOpen: true,
        className: 'wrapper accordion-open',
      });
    }
  };

  logOutHandler = () => {
    this.props.dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        this.props.history.push('/');
      }
    });
  };

  defaultLink = (item, i) =>
    item.name === 'Atsijungti' ? (
      <div
        className="user-links"
        style={{ cursor: 'pointer' }}
        key={i}
        onClick={() => this.logOutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <NavLink
        activeClassName="is-active"
        className="user-links"
        to={item.linkTo}
        key={i}
        onClick={this.handleMenuClick}
      >
        {item.name}
      </NavLink>
    );

  showLinks = (type) => {
    let list = [];
    if (this.props.user.userdata) {
      type.forEach((item) => {
        if (!this.props.user.userdata.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== 'Prisijungti') {
            list.push(item);
          }
        }
      });
    }

    return list.map((item, i) => {
      return this.defaultLink(item, i);
    });
  };

  render() {
    const { className } = this.state;
    return (
      <header className="header">
        <div className="container">
          <div className="hamburger-wrapper">
            <div className="hamburger" onClick={this.handleMenuClick}>
              <div />
              <div />
              <div />
            </div>
          </div>
          <div className="header header-container">
            <div className="header header-left">
              <NavLink
                activeClassName="is-active"
                className="header header-left--logo"
                to={this.state.logo.linkTo}
              >
                <img className="logo-img" src={logoA} alt="logo" />
              </NavLink>
            </div>
            <div className={`header header-links ${className}`}>
              <div onClick={this.handleMenuClick}>
                <div className="close" />
              </div>
              <div className="page-links-wrapper">
                {this.showLinks(this.state.page)}
                {this.showLinks(this.state.user)}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(withRouter(Header));
