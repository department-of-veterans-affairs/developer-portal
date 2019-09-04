import * as React from "react";

interface IApiSelectionProps {
  onSelection: (api: IApiSelectionState) => void;
}

interface IApiSelectionState {
  [x: string]: boolean;
}

export default class ApiSelection extends React.Component<IApiSelectionProps, IApiSelectionState> {

  constructor(props: IApiSelectionProps) {
    super(props);
    this.state = {
      benefits: false,
      claims: false,
      communityCare: false,
      facilities: false,
      health: false,
      verification: false,   
    };
  }

  public render() {
    return (
      <div className="va-api-api-selection">
        <fieldset>
          <legend>API Selection</legend>
          <h4>Standard APIs:</h4>
          <div className="form-checkbox">
            <input
              type="checkbox"
              id="benefits"
              name="benefits"
              checked={this.state.benefits}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="benefits">VA Benefits API</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="facilities"
              name="facilities"
              checked={this.state.facilities}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="facilities">VA Facilities API</label>
          </div>

          <h4>OAuth APIs:</h4>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="claims"
              name="claims"
              checked={this.state.claims}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="claims">VA Claims API</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="health"
              name="health"
              checked={this.state.health}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="health">VA Health API</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="communityCare"
              name="communityCare"
              checked={this.state.communityCare}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="communityCare">Community Care Eligibility API</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="verification"
              name="verification"
              checked={this.state.verification}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="verification">VA Veteran Verification API</label>
          </div>
        </fieldset>
      </div>
    )
  }

  private toggleApis(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.checked;
    this.setState({[name]: value}, () => {
      this.props.onSelection(this.state);
    });
  }
}