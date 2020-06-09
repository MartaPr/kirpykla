import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getContacts } from '../../actions/contacts_actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import bgImg from '../../resources/img/bgImg.jpg';

class ContactsPage extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    this.props.dispatch(getContacts()).then((response) => {
      const contacts = this.props.contacts.contacts;
      this.setState({
        contacts,
      });
    });
  }

  renderContacts = () => {
    return this.state.contacts.map((item) => {
      return (
        <div key={item._id} className="contact contact-list">
          <div className="tag">
            <FontAwesomeIcon icon={faClock} className="icon" />
            <div className="contact">
              <div>Darbo laikas:</div>
              <div className="info">
                <span style={{ fontWeight: '500' }}>I-V </span> 8-18val.
              </div>
            </div>
          </div>
          <div className="tag">
            <FontAwesomeIcon icon={faCompass} className="icon" />
            <div className="contact">
              <div>Adresas:</div>
              <div className="info">{item.address}</div>
            </div>
          </div>
          {/* <div className="break"></div> */}
          <div className="tag">
            <FontAwesomeIcon icon={faPhone} className="icon" />
            <div className="contact">
              <div>Tel. nr.:</div>
              <a className="info" href={`tel:${item.phone}`}>
                +{item.phone}
              </a>
            </div>
          </div>
          <div className="break"></div>
          <div className="tag">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <div className="contact">
              <div>El. paštas:</div>
              <a className="info" href={`mailto:${item.email}`}>
                {item.email}
              </a>
            </div>
          </div>
          <div className="fb-info tag">
            <div className="link-wrapper">
              <a
                className="f-icon"
                target="blank"
                href="https://www.facebook.com/aoumanailcare"
              >
                <FontAwesomeIcon icon={faFacebookF} className="icon" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="contact-page">
        <div className="contact-page contact-page--left">
          <img src={bgImg} alt="bg" />
        </div>
        <div className="contact-page contact-page--right">
          <div className="contact-page wrapper">
            <div className="contact-info">
              <h2>Susisiekime</h2>
              <div className="contact-list-wrapper container">
                {this.renderContacts()}
                {/* <div className="fb-info">
                  <div className="link-wrapper">
                    <a
                      className="f-icon"
                      target="blank"
                      href="https://www.facebook.com/aoumanailcare"
                    >
                      <FontAwesomeIcon icon={faFacebookF} className="icon" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div> */}
              </div>

              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2306.938999962108!2d25.278091316109112!3d54.675501980279066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd946b1a345c5f%3A0x41f70f803740d36!2sKruop%C5%B3%20g.%203%2C%20Vilnius%2001140!5e0!3m2!1sen!2slt!4v1590227550628!5m2!1sen!2slt"
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: '0' }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (props) => {
  return {
    contacts: props.contacts,
  };
};

export default connect(mapStateToProps)(ContactsPage);
