import React from 'react';
import PropTypes from 'prop-types';
import InstagramEmbed from 'react-instagram-embed';
import { EmbedContianer } from './styled';

const Embed = ({ data, isFocused }) => {
  const { url } = data;

  return (
    <EmbedContianer contentEditable={false} isFocused={isFocused}>
      <InstagramEmbed url={url} />
    </EmbedContianer>
  );
};

Embed.propTypes = {
  data: PropTypes.object,
  isFocused: PropTypes.bool,
};

export default Embed;
