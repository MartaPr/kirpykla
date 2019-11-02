import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo logo">alinos studija</div>
                <div className="footer-wrapper">
                        <div className="contact-info">
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faCompass}
                                    className="icon"
                                />
                                <div className="adress">
                                    <div>Adresas</div>
                                    <div>Katinuku g. 12, Vilnius</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="icon"
                                />
                                <div className="adress">
                                    <div>Tel. nr.</div>
                                    <div>+370 650 759 23</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="icon"
                                />
                                <div className="adress">
                                    <div>El. paštas</div>
                                    <div>alina@studija.lt</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </footer>
    );
};

export default Footer;