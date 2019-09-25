import CollapsiblePanel from '@department-of-veterans-affairs/formation-react/CollapsiblePanel';
import * as classNames from 'classnames';
import * as React from 'react'

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
    this.state = { allCollapsed: true }
    this.panelRefs = [];
  }

  public componentDidMount() {
    // CollapsiblePanel expects a VetsGov object on the global window
    if (!window.VetsGov) {
      window.VetsGov = { scroll: null }
    }
  }

  public componentWillUnmount() {
    this.panelRefs = [];
  }

  public render() {
    return (
      <section className="va-grouped-accordion">
        <div className="va-grouped-accordion-header">
          <h2>{this.props.title}</h2>
          <button className={classNames("toggle-panels", "btn-link")} onClick={(event) => this.handleExpandCollapse(event)}>{this.determineLabelFromState()}</button>
        </div>
        {this.createPanels()}
      </section>
    );
  }

  private determineLabelFromState() {
    return this.state.allCollapsed ? 'Expand all' : 'Collapse all';
  }

  private createPanels() {
    return this.props.panelContents.map((c: IPanelContent, index: number) => {
      const panelRef = React.createRef<React.Component<{}, ICollapsiblePanelStates>>();
      this.panelRefs.push(panelRef);
      return (
        <CollapsiblePanel ref={panelRef} panelName={c.title} startOpen={!this.state.allCollapsed} key={index}>
          {c.body}
        </CollapsiblePanel>
      )
    });
  }

  private handleExpandCollapse(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    this.setState((prevState: IGroupedAccordionsStates) => ({ allCollapsed: !prevState.allCollapsed }), () => {
      this.panelRefs.filter(r => r.current && (r.current.state.open === this.state.allCollapsed)).forEach(r => {
        if (r.current) {
          r.current.setState({ open: !this.state.allCollapsed })
        }
      });
    });
  }
}