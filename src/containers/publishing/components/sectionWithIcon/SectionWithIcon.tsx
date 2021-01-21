import React, { FC } from 'react';

interface SectionWithIconProps {
  imageFile: string;
  header: string;
}

const SectionWithIcon: FC<SectionWithIconProps> = ({ children, imageFile, header }) => (
  <section className="vads-u-display--flex vads-u-align-items--flex-start">
    <div className="vads-u-display--flex vads-u-justify-content--center vads-u-flex--1">
      <img src={imageFile} alt="" role="presentation" />
    </div>
    <div className="vads-u-flex--3">
      <h3>{header}</h3>
      {children}
    </div>
  </section>
);

export default SectionWithIcon;
