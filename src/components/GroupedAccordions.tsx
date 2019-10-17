import CollapsiblePanel from '@department-of-veterans-affairs/formation-react/CollapsiblePanel';
import * as classNames from 'classnames';
import * as React from 'react';

import './GroupedAccordions.scss';

declare const window: { VetsGov: object };

export interface IPanelContent {
  readonly body: string | JSX.Element;
  readonly title: string;
}

interface IGroupedAccordionsProps {
  readonly panelContents: IPanelContent[];
  readonly title: string;
}

interface IGroupedAccordionsStates {
  allCollapsed: boolean;
}

interface ICollapsiblePanelStates {
  open: boolean;
}

export default class GroupedAccordions extends React.Component<IGroupedAccordionsProps, IGroupedAccordionsStates> {
  private panelRefs: Array<React.RefObject<React.Component<{}, ICollapsiblePanelStates>>>;

  constructor(props: IGroupedAccordionsProps) {
    super(props);
    this.state = { allCollapsed: true };
    this.panelRefs = [];
  }

  public componentDidMount() {
    // CollapsiblePanel expects a VetsGov object on the global window
    if (!window.VetsGov) {
      window.VetsGov = { scroll: null };
    }
  }

  public componentWillUnmount() {
    this.panelRefs = [];
  }

  public render() {
    return (
      <section className={classNames('va-grouped-accordion', 'vads-u-margin-bottom--2p5')}>
        <div className={classNames(
          'vads-u-display--flex',
          'vads-u-justify-content--space-between',
          'vads-u-align-items--center',
        )}>
          <h3>{this.props.title}</h3>
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
            onClick={(event) => this.handleExpandCollapse(event)}
          >
            {this.state.allCollapsed ? 'Expand all' : 'Collapse all'}
          </button>
        </div>
        {this.props.panelContents.map((c: IPanelContent, index: number) => {
          const panelRef = React.createRef<React.Component<{}, ICollapsiblePanelStates>>();
          this.panelRefs.push(panelRef);
          return (
            <CollapsiblePanel ref={panelRef} panelName={c.title} startOpen={!this.state.allCollapsed} key={index}>
              {c.body}
            </CollapsiblePanel>
          );
        })}
      </section>
    );
  }

  private handleExpandCollapse(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    this.setState((prevState: IGroupedAccordionsStates) => ({ allCollapsed: !prevState.allCollapsed }), () => {
      this.panelRefs.filter(r => r.current && (r.current.state.open === this.state.allCollapsed)).forEach(r => {
        if (r.current) {
          r.current.setState({ open: !this.state.allCollapsed });
        }
      });
    });
  }
}