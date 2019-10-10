import classnames from 'classnames';
import * as React from 'react';

import './EmbeddedYoutubeVideo.scss';

interface IEmbeddedYoutubeVideoProps {
  url: string;
  title: string;
}

export default function EmbeddedYoutubeVideo({url, title} : IEmbeddedYoutubeVideoProps) {
  if(!url.includes('www.youtube.com')) {
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

  const embedUrl = url.replace('watch?v=', 'embed/');
  return (
    <div className={wrapperStyles}>
      <iframe className={iframeStyles} title={title} src={embedUrl} frameBorder="0" allowFullScreen={true} />
    </div>
  );
}
