import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const admin = [
  {
    name: 'Pagrindinio puslapio valdymas',
    linkTo: '/admin/pagrindinis-puslapis',
  },
  {
    name: 'Paslaugų valdymas',
    linkTo: '/admin/paslaugos',
  },
  {
    name: 'Galerijos valdymas',
    linkTo: '/admin/sukurti-galerija',
  },
  {
    name: 'Kontaktai',
    linkTo: '/admin/kontaktai',
  },
];

const UserLayout = (props) => {
  const generateLinks = (links) =>
    links.map((item, i) => (
      <NavLink
        activeClassName="is-active"
        className="user-links"
        to={item.linkTo}
        key={i}
      >
        {item.name}
      </NavLink>
    ));
  return (
    <div className="container">
      <div className="user-info">
        <nav className="user-info user-info__user-left">
          <h2>Puslapio informacija</h2>
          <div className="links">{generateLinks(admin)}</div>
        </nav>
        <div className="user-info user-info__user-right">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(UserLayout);
