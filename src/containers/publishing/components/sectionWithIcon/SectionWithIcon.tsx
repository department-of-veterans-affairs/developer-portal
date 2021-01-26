import React, { FC } from 'react';

interface SectionWithIconProps {
  imageFile: string;
  header: string;
  headerId: string;
}

const SectionWithIcon: FC<SectionWithIconProps> = ({ children, imageFile, header, headerId }) => (
  <section
    className="vads-u-display--flex vads-u-align-items--flex-start"
    aria-labelledby={headerId}
  >
    <div className="vads-u-display--flex vads-u-justify-content--center vads-u-flex--1">
      <img src={imageFile} alt="" />
    </div>
    <div className="vads-u-flex--4">
      <h3 id={headerId}>{header}</h3>
      {children}
    </div>
  </section>
);

export { SectionWithIcon };
