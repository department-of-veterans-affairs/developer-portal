import * as React from 'react';

interface HoverImageProps {
  alt: string;
  imagePath: string;
  hoverImagePath: string;
}

const HoverImage = (props: HoverImageProps): JSX.Element => {
  const [src, setSrc] = React.useState(props.imagePath);

  return (
    <img
      alt={props.alt ? props.alt : ''}
      role="presentation"
      onMouseEnter={(): void => setSrc(props.hoverImagePath)}
      onMouseLeave={(): void => setSrc(props.imagePath)}
      src={src}
    />
  );
};

export { HoverImage };
