import * as React from 'react';

interface HoverImageProps {
  imageAlt: string;
  imagePath: string;
  hoverImagePath: string;
}

const HoverImage = (props: HoverImageProps): JSX.Element => {
  const [alt, setAlt] = React.useState(props.imageAlt);
  const [src, setSrc] = React.useState(props.imagePath);

  const setProps = (): void => {
    setAlt(props.imageAlt);
    setSrc(props.hoverImagePath);
  };

  return (
    <img
      alt={alt}
      role="presentation"
      onMouseEnter={(): void => setProps()}
      onMouseLeave={(): void => setSrc(props.imagePath)}
      src={src}
    />
  );
};

export { HoverImage };
