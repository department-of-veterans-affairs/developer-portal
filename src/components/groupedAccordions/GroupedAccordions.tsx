import classNames from 'classnames';
import * as React from 'react';
import toHtmlId from '../../toHtmlId';

import './GroupedAccordions.scss';

export interface AccordionPanelContent {
  readonly body: string | JSX.Element;
  readonly title: string;
}

interface GroupedAccordionsProps {
  readonly panelContents: AccordionPanelContent[];
  readonly title: string;
}

// Convenience types purely for code readability
type CollapsiblePanelComponent = React.Component<unknown>;
type CollapsiblePanelComponentRef = React.RefObject<CollapsiblePanelComponent>;

const GroupedAccordions = (props: GroupedAccordionsProps): JSX.Element => {
  const [allExpanded, setAllExpanded] = React.useState(false);
  const [panelRefs, setPanelRefs] = React.useState<CollapsiblePanelComponentRef[]>([]);
  const headingId = `${toHtmlId(props.title)}-accordions`;

  React.useEffect(
    () => (): void => {
      setPanelRefs([]);
    },
    [],
  );

  const handleExpandCollapse = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    event.currentTarget.parentElement?.nextElementSibling?.childNodes.forEach(
      (element: HTMLElement) => {
        if (!!element.getAttribute('open') === allExpanded) {
          element.setAttribute('open', allExpanded ? 'false' : 'true');
        }
      },
    );
    setAllExpanded(!allExpanded);
  };

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
        <button
          className={classNames(
            'va-api-grouped-accordions-button',
            'vads-u-color--primary',
            'vads-u-margin--0',
            'vads-u-padding--0',
            'vads-u-text-decoration--underline',
            'vads-u-font-weight--normal',
            'vads-u-width--auto',
          )}
          onClick={(event): void => handleExpandCollapse(event)}
          type="button"
        >
          {allExpanded ? 'Collapse all' : 'Expand all'}
        </button>
      </div>
      <va-accordion>
        {props.panelContents.map((c: AccordionPanelContent) => {
          const panelRef: CollapsiblePanelComponentRef =
            React.createRef<CollapsiblePanelComponent>();
          panelRefs.push(panelRef);
          return (
            <va-accordion-item ref={panelRef} header={c.title} open={allExpanded} key={c.title}>
              {c.body}
            </va-accordion-item>
          );
        })}
      </va-accordion>
    </section>
  );
};

export { GroupedAccordions };
