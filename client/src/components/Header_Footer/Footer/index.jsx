import React, { Component } from 'react';
import { getContacts } from '../../../actions/contacts_actions';
import { connect } from 'react-redux';
import ContactInfo from './ContactInfo';

class Footer extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    this.props.dispatch(getContacts()).then((response) => {
      const contacts = this.props.contacts.contacts;
      this.setState({
        contacts,
      });
      console.log('contacts', contacts);
    });
  }

  // šitą jaučiu reikia perkelti į kitą komponentą

  render() {
    return (
      <footer className="footer">
        <ContactInfo contacts={this.state.contacts} />
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps)(Footer);
