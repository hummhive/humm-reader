import React from 'react';
import PropTypes from 'prop-types';
import { Pre, Code } from './styled';

const CodeBlock = props => (
  <Pre>
    <Code>{props.children}</Code>
  </Pre>
);

CodeBlock.propTypes = {
  children: PropTypes.any,
};

export default CodeBlock;
