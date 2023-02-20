import classNames from 'classnames';
import * as React from 'react';
import toHtmlId from '../../toHtmlId';

// import './GroupedAccordions.scss';

export interface AccordionPanelContent {
  readonly body: string | JSX.Element;
  readonly title: string;
}

interface GroupedAccordionsProps {
  readonly panelContents: AccordionPanelContent[];
  readonly title: string;
}

const GroupedAccordions = (props: GroupedAccordionsProps): JSX.Element => {
  const headingId = `${toHtmlId(props.title)}-accordions`;

  return (
    <section
      className={classNames('va-grouped-accordion', 'vads-u-margin-bottom--2p5')}
      aria-labelledby={headingId}
    >
      <div
        className={classNames(
          'vads-u-display--flex',
          'vads-u-justify-content--space-between',
          'vads-u-align-items--center',
        )}
      >
        <h2 id={headingId} className="vads-u-font-size--lg">
          {props.title}
        </h2>
      </div>
      <va-accordion>
        {props.panelContents.map((c: AccordionPanelContent) => (
          <va-accordion-item header={c.title} key={c.title}>
            {c.body}
          </va-accordion-item>
        ))}
      </va-accordion>
    </section>
  );
};

export { GroupedAccordions };
