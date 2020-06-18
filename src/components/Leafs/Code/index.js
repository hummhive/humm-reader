import React from 'react';
import PropTypes from 'prop-types';
import { Code } from './styled';

function CodeBlock(props) {
  return <Code>{props.children}</Code>;
}

CodeBlock.propTypes = {
  children: PropTypes.any,
};

export default CodeBlock;
