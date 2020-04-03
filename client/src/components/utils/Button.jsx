import React from 'react';
import { Link } from 'react-router-dom';

const ButtonOne = props => {
  const buttons = () => {
    let template = '';
    switch (props.type) {
      case 'default':
        template = (
          <Link className="link-default" to={props.linkTo} {...props.addStyles}>
            {props.title}
          </Link>
        );
        break;
      default:
        template = '';
    }

    return template;
  };

  return <div className="btn btn-default">{buttons()}</div>;
};

export default ButtonOne;
