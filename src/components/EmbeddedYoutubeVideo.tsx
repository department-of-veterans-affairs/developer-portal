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

  const embedUrl = url.replace('watch?v=', 'embed/');
  return (
    <div className="va-api-youtube-wrapper">
      <iframe title={title} src={embedUrl} frameBorder="0" allowFullScreen={true} />
    </div>
  );
}
