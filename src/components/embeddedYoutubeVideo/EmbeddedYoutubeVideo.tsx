import classnames from 'classnames';
import getVideoId from 'get-video-id';
import * as React from 'react';

import './EmbeddedYoutubeVideo.scss';

interface EmbeddedYoutubeVideoProps {
  url: string;
  title: string;
}

const YOUTUBE_SERVICE = 'youtube';
const YOUTUBE_BASE = 'https://www.youtube.com/embed/';

export const EmbeddedYoutubeVideo = ({ url, title }: EmbeddedYoutubeVideoProps): JSX.Element => {
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
