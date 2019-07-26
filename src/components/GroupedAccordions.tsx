import CollapsiblePanel from '@department-of-veterans-affairs/formation/CollapsiblePanel';
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

export default class GroupedAccordions extends React.Component<IGroupedAccordionsProps, IGroupedAccordionsStates> {

  private panelRefs: any[];

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
          <a className="toggle-panels" href='javascript:void(0)' onClick={(event) => this.handleExpandCollapse(event)}>{this.determineLabelFromState()}</a>
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
      return (
        <CollapsiblePanel ref={(n: any) => this.panelRefs.push(n)} panelName={c.title} startOpen={!this.state.allCollapsed} key={index}>
          {c.body}
        </CollapsiblePanel>
      )
    });
  }

  private handleExpandCollapse(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    this.setState((prevState: IGroupedAccordionsStates) => ({ allCollapsed: !prevState.allCollapsed }), () => {
      this.panelRefs.filter(r => r && (r.state.open === this.state.allCollapsed)).map(r => {
        r.setState({ open: !this.state.allCollapsed })
      });
    });
  }
}