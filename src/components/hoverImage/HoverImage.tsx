import * as React from 'react';

interface HoverImageProps {
  alt?: string;
  imagePath: string;
  hoverImagePath: string;
}

const HoverImage = ({ alt = '', imagePath, hoverImagePath }: HoverImageProps): JSX.Element => {
  const [src, setSrc] = React.useState(imagePath);

  return (
    <img
      alt={alt}
      onMouseEnter={(): void => setSrc(hoverImagePath)}
      onMouseLeave={(): void => setSrc(imagePath)}
      src={src}
    />
  );
};

export { HoverImage };
