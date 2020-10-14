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
      onMouseEnter={() => setSrc(props.hoverImagePath)}
      onMouseLeave={() => setSrc(props.imagePath)}
    />
  );
};

export { HoverImage };
