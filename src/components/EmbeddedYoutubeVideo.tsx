import classnames from 'classnames';
import * as getVideoId from 'get-video-id';
import * as React from 'react';

import './EmbeddedYoutubeVideo.scss';

interface IEmbeddedYoutubeVideoProps {
  url: string;
  title: string;
}

const YOUTUBE_SERVICE = 'youtube';
const YOUTUBE_BASE = 'https://www.youtube.com/embed/';

export default function EmbeddedYoutubeVideo({url, title} : IEmbeddedYoutubeVideoProps) {
  const videoInfo = getVideoId(url);
  if(videoInfo.service !== YOUTUBE_SERVICE) {
    return <a href={url}>{ url }</a>;
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
      <iframe className={iframeStyles} title={title} src={embedUrl} frameBorder="0" allowFullScreen={true} />
    </div>
  );
}
