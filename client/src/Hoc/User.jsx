import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
    {
        name: "Mano paskyra",
        linkTo: "/user/dachboard"
    },
    {
        name: "Mano paslaugos",
        linkTo: "/user/paslaugos"
    }
]

const admin = [
    {
        name: "Puslapio informacija",
        linkTo: "/admin/informacija"
    },
    {
        name: "Pridėti paslaugą",
        linkTo: "/admin/paslaugos"
    },
    {
        name: "Galerijos",
        linkTo: "/admin/galerijos"
    },
    {
        name: "Kalendorius",
        linkTo: "/admin/kalendorius"
    }
]

const UserLayout = (props) => {

    const generateLinks = (links) => (
        
        links.map((item, i) => (
            <Link className="user-links" to={item.linkTo} key={i}>
                {item.name}
            </Link>
        ))
    )
    return (
        <div className="container">
            <div className="user-container">
                <nav className="user-left-nav">
                    <h2>Mano paskyra</h2>
                    <div className="links">
                        {generateLinks(links)}
                    </div>
                    {
                        props.user.userdata.isAdmin ?
                            <div>
                                <h2>Admin</h2>
                                <div className="links">
                                    {generateLinks(admin)}
                                </div>
                            </div>
                            : null
                    }
                </nav>
                <div className="user-right">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserLayout);