import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const ContactInfo = (props) => {
  const renderContacts = () => {
    return props.contacts.map((item) => {
      return (
        <div className="footer-container">
          <div className="footer-wrapper">
            <div key={item._id} className=" contact-info">
              <div className="tag">
                <FontAwesomeIcon icon={faCompass} className="icon" />
                <div className="contact">
                  <div>Adresas</div>
                  <div>{item.address}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className="contact">
                  <div>Tel. nr.</div>
                  <div>+{item.phone}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className="contact">
                  <div>El. paštas</div>
                  <div>{item.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return <div className="container-md">{renderContacts()}</div>;
};

export default ContactInfo;
