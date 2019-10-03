import * as React from 'react';

interface IImageProps {
  imagePath: string;
  hoverImagePath: string;
}

interface IHoverImageState {
  src: string;
}

export default class HoverImage extends React.Component<IImageProps, IHoverImageState> {
  constructor(props : IImageProps) {
    super(props);
    this.state = {
      src: props.imagePath,
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  public render() {
    const { src } = this.state;
    return (
      <img
        alt=''
        role='presentation'
        src={src}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      />
    );
  }

  private onMouseEnter() {
    this.setState({
      src: this.props.hoverImagePath,
    });
  }

  private onMouseLeave() {
    this.setState({
      src: this.props.imagePath,
    });
  }
}
