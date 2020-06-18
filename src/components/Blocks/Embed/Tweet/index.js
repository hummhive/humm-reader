import React from 'react';
import PropTypes from 'prop-types';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { TweetContianer } from './styled';

const Tweet = ({ data, isFocused }) => {
  const { tweetId } = data;

  return (
    <TweetContianer contentEditable={false} isFocused={isFocused}>
      <TwitterTweetEmbed tweetId={tweetId} />
    </TweetContianer>
  );
};

Tweet.propTypes = {
  data: PropTypes.object,
  isFocused: PropTypes.bool,
};

export default Tweet;
