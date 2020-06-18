import React from 'react';
import PropTypes from 'prop-types';
import { A } from './styled';

function ABlock(props) {
  return (
    <A
      href={props.href}
      target={props.target}
      isEditor={!!props.editor}
    >
      {props.children}
    </A>
  );
}

ABlock.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  target: PropTypes.string,
};

export default ABlock;
