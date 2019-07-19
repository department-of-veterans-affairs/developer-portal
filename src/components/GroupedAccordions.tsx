import CollapsiblePanel from '@department-of-veterans-affairs/formation/CollapsiblePanel';
import * as React from 'react'

declare let window: any;

const style = {
    "marginBottom": "20px",
    "width": "100%",
}

const headerStyle = {
    "alignItems": "center",
    "display": "flex",
    "justifyContent": "space-between",
}

export interface IQuestion {
    answer: any,
    question: string
}

export default class GroupedAccordions extends React.Component<{ questions: IQuestion[], title: string }, any> {

    private panelRefs: any[];
    private panels: any;

    constructor(props: any) {
        super(props);
        this.state = { allCollapsed: true }
        this.panelRefs = [];
        this.panels = this.createPanels();
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
            <section style={style} className="va-grouped-accordion">
                <div style={headerStyle}>
                    <h2>{this.props.title}</h2>
                    <a href='javascript:void(0)' onClick={(event) => this.handleExpandCollapse(event)}>{this.checkState()}</a>
                </div>
                {this.panels}
            </section>
        );
    }

    private checkState() {
        return this.state.allCollapsed ? 'Expand all' : 'Collapse all';
    }

    private createPanels(): any {
        return this.props.questions.map((q: IQuestion, index: number) => {
            return <CollapsiblePanel ref={(n: any) => this.panelRefs.push(n)} panelName={q.question} startOpen={!this.state.allCollapsed} key={index}>
                {q.answer}
            </CollapsiblePanel>
        });
    }

    private handleExpandCollapse(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.setState((prevState: any) => ({ allCollapsed: !prevState.allCollapsed }), () => {
            this.panelRefs.filter(r => r.state.open === this.state.allCollapsed).map(r => {
                r.setState({ open: !this.state.allCollapsed })
            });
        });
    }
}