import CollapsiblePanel from '@department-of-veterans-affairs/component-library/CollapsiblePanel';
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

interface CollapsiblePanelStates {
  open: boolean;
}

// Convenience types purely for code readability
type CollapsiblePanelComponent = React.Component<unknown, CollapsiblePanelStates>;
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
    panelRefs
      .filter(ref => ref.current && ref.current.state.open === allExpanded)
      .forEach(ref => {
        if (ref.current) {
          ref.current.setState({ open: !allExpanded });
        }
      });
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
        <h3 id={headingId}>{props.title}</h3>
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
      {props.panelContents.map((c: AccordionPanelContent) => {
        const panelRef: CollapsiblePanelComponentRef = React.createRef<CollapsiblePanelComponent>();
        panelRefs.push(panelRef);
        return (
          <CollapsiblePanel
            ref={panelRef}
            panelName={c.title}
            startOpen={allExpanded}
            key={c.title}
          >
            {c.body}
          </CollapsiblePanel>
        );
      })}
    </section>
  );
};

export { GroupedAccordions };
