import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
  {
    name: 'Mano paskyra',
    linkTo: '/user/dashboard'
  },
  {
    name: 'Mano paslaugos',
    linkTo: '/user/paslaugos'
  }
];

const admin = [
  {
    name: 'Naujienos',
    linkTo: '/admin/informacija'
  },
  {
    name: 'Pridėti paslaugą',
    linkTo: '/admin/paslaugos'
  },
  {
    name: 'Galerijos',
    linkTo: '/admin/sukurti-galerija'
  },
  {
    name: 'Kalendorius',
    linkTo: '/admin/kalendorius'
  }
];

const UserLayout = props => {
  const generateLinks = links =>
    links.map((item, i) => (
      <Link className="user-links" to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ));
  return (
    <div className="container">
      <div className="user-info">
        <nav className="user-info user-info__user-left">
          <h2>Informacija</h2>
          <div className="links">{generateLinks(links)}</div>
          {props.user.userdata.isAdmin ? (
            <div>
              <h2>Admin</h2>
              <div className="links">{generateLinks(admin)}</div>
            </div>
          ) : null}
        </nav>
        <div className="user-info user-info__user-right">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserLayout);
