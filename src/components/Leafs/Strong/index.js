import React from 'react';
import PropTypes from 'prop-types';
import { Strong } from './styled';

function StrongBlock(props) {
  return <Strong>{props.children}</Strong>;
}

StrongBlock.propTypes = {
  children: PropTypes.any,
};

export default StrongBlock;
