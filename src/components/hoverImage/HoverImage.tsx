import * as React from 'react';

interface HoverImageProps {
  imagePath: string;
  hoverImagePath: string;
}

const HoverImage = (props: HoverImageProps): JSX.Element => {
  const [src, setSrc] = React.useState(props.imagePath);

  return (
    <img
      alt=""
      role="presentation"
      src={src}
      onMouseEnter={(): void => setSrc(props.hoverImagePath)}
      onMouseLeave={(): void => setSrc(props.imagePath)}
    />
  );
};

export { HoverImage };
