import classnames from 'classnames';
import getVideoId from 'get-video-id';
import * as React from 'react';
import * as PropTypes from 'prop-types';

import './EmbeddedYoutubeVideo.scss';

const EmbeddedYoutubeVideoPropTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

type EmbeddedYoutubeVideoProps = PropTypes.InferProps<typeof EmbeddedYoutubeVideoPropTypes>;

const YOUTUBE_SERVICE = 'youtube';
const YOUTUBE_BASE = 'https://www.youtube.com/embed/';

const EmbeddedYoutubeVideo = ({ url, title }: EmbeddedYoutubeVideoProps): JSX.Element => {
  const videoInfo = getVideoId(url);
  if (videoInfo.service !== YOUTUBE_SERVICE) {
    return <a href={url}>{url}</a>;
  }

  const wrapperStyles = classnames(
    'va-api-youtube-wrapper',
    'vads-u-display--block',
    'vads-u-width--full',
    'vads-u-height--0',
  );

  const iframeStyles = classnames(
    'vads-u-display--block',
    'vads-u-width--full',
    'vads-u-height--full',
  );

  const embedUrl = `${YOUTUBE_BASE}${videoInfo.id}`;
  return (
    <div className={wrapperStyles}>
      <iframe
        className={iframeStyles}
        title={title}
        src={embedUrl}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export { EmbeddedYoutubeVideo };
