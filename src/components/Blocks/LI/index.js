import React from 'react';
import PropTypes from 'prop-types';
import { LI } from './styled';

const LIBlock = props => <LI {...props.attributes}>{props.children}</LI>;

LIBlock.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.any,
};

export default LIBlock;
