import React from 'react';
import PropTypes from 'prop-types';
import { UL } from './styled';

const ULBlock = props => <UL>{props.children}</UL>;

ULBlock.propTypes = {
  children: PropTypes.any,
};

export default ULBlock;
