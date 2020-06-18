import React from 'react';
import PropTypes from 'prop-types';
import { P } from './styled';

const PBlock = ({ children }) => (
  // EDITOR TODO
  // const { dense } = data;

  <P dense={false}>{children}</P>
);
PBlock.propTypes = {
  children: PropTypes.any,
};

export default PBlock;
