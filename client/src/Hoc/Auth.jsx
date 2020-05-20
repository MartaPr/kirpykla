import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function(ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    _isMounted = false;
    state = {
      loading: true,
    };

    componentDidMount() {
      this._isMounted = true;
      this.props.dispatch(auth()).then((response) => {
        let user = this.props.user.userdata;

        if (!user.isAuth) {
          if (reload) {
            this.props.history.push('/prisijungti');
          }
        } else {
          if (adminRoute && user.isAdmin) {
            this.props.history.push('/vartotojas/informacija');
          } else {
            if (reload === false) {
              this.props.history.push('/vartotojas/informacija');
            }
          }
        }

        if (this._isMounted) {
          this.setState({ loading: false });
        }
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      if (this.state.loading) {
        return (
          <div
            className="main-loader"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '15%',
            }}
          >
            <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
          </div>
        );
      } else {
        return (
          <div className="composed-class">
            <ComposedClass {...this.props} user={this.props.user} />
          </div>
        );
      }
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };

  return connect(mapStateToProps)(AuthenticationCheck);
}
