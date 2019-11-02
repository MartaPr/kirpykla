import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions';

class Header extends Component {

    state = {

        logo: 
            {
                name: 'Alinos studija',
                linkTo: '/',
                public: true
            }
        ,
        page: [
            {
                name: 'Naujienos',
                linkTo: '/kainynas',
                public: true
            },
            {
                name: 'Galerijos',
                linkTo: '/galerijos',
                public: true
            },
            {
                name: 'Kainynas',
                linkTo: '/kainynas',
                public: true
            },
        ],
        user: [
            {
                name: 'Vartotojo informacija',
                linkTo: '/vartotojas/informacija',
                public: false
            },
            {
                name: 'Registruotis vizitui',
                linkTo: '/vartotojas/registruotis',
                public: false
            },
            {
                name: 'Prisijungti',
                linkTo: '/prisijungti',
                public: true
            },
            {
                name: 'Atsijungti',
                linkTo: '/vartotojas/atsijungti',
                public: false
            }
        ]

    }

    logOutHandler = () => {
        this.props.dispatch(logoutUser()).then(response => {
            if(response.payload.success) {
                this.props.history.push('/')
            }
        })
    }

    defaultLink = (item, i) => (

        item.name === 'Atsijungti' ?
            <div className='log-out'
            key={i}
            onClick = {()=>this.logOutHandler()}
            >
                {item.name}
            </div>
        : 

        <Link  className="page-links" to={item.linkTo} key={i}>
                {item.name}
        </Link>
    )

    showLinks = (type) => {
        let list = [];
        if(this.props.user.userdata) {
            type.forEach((item) => {
                if(!this.props.user.userdata.isAuth) {
                    if(item.public === true) {
                        list.push(item)
                    }
                } else {
                    if(item.name !== 'Prisijungti') {
                        list.push(item)
                    }   
                }
            })
        }

        return list.map((item, i) => {
            return this.defaultLink(item,i)
        })
    }

    render() {
        return (
            <header className="header">
                <div className="header-container">
                    <div className="header-left">
                         <Link className="header-logo logo" to={this.state.logo.linkTo} >{this.state.logo.name}</Link> 
                    </div>
                    <div className="header-links">
                       <div> { this.showLinks(this.state.page) } </div>
                       <div className="user-links-header"> { this.showLinks(this.state.user) } </div>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header));