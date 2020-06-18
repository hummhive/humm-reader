import React from 'react';
import PropTypes from 'prop-types';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import { EmbedContianer } from './styled';

const Embed = ({ data, isFocused }) => {
  const { url } = data;

  return (
    <EmbedContianer contentEditable={false} isFocused={isFocused}>
      <FacebookProvider appId="3019638951386555">
        <EmbeddedPost href={url} width="500" />
      </FacebookProvider>
    </EmbedContianer>
  );
};

Embed.propTypes = {
  data: PropTypes.object,
  isFocused: PropTypes.bool,
};

export default Embed;
