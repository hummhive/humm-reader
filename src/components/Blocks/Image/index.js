import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Loader';
import { Image, LoaderContainer } from './styled';

const ImageBlock = ({ src }) => {
  if (!src)
    return (
      <LoaderContainer>
        <Loader isShowing size={56} />
      </LoaderContainer>
    );

  return (
    <Image src={src} />
  );
};

ImageBlock.propTypes = {
  src: PropTypes.string,
};

export default ImageBlock;
