import * as React from 'react';

import ErrorableTextInput from '@department-of-veterans-affairs/formation/ErrorableTextInput';

import { validateEmail } from '../actions';
import { PageHero } from '../components';
import { IErrorableInput } from '../types';

import ds from '../assets/dslogon-icon.svg';
import idme from '../assets/idme-icon-dark.svg';
import mhv from '../assets/mhv-icon.svg';

import './Beta.scss';

const idMappings = {
    VICDEV: {
        auth: "00N35000000rd9y",
        cell: "00N35000000rd61",
        confirm: "00N35000000rd0w",
        oid: "00D350000008des",
    },
    VICSIT: {
        auth: "00N35000000vsO1",
        cell: "00N35000000vsNz",
        confirm: "00N35000000vsO0",
        oid: "00D350000000sf8",
    },
    VICUAT: {
        auth: "00N35000000sCgz",
        cell: "00N35000000sCgw",
        confirm: "00N35000000sCgx",
        oid: "00D350000000rXW",
    }
}

const env = process.env.REACT_APP_SALESFORCE_ENV || 'VICDEV';

export class BetaPage extends React.Component<{}, { ds: boolean, email: IErrorableInput, idme: boolean, mhv: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            ds: false,
            email: {
                dirty: false,
                value: '',
            },
            idme: false,
            mhv: false,
        }
    }

    public render() {
        return (
            <div className="beta-application">
              <PageHero
                  title="Beta Signup Form"
                  content="Please submit the form below and you'll receive an email shortly with instructions about how you can participate in our exciting beta program." />
              <div className="usa-grid">
                <form className="usa-form usa-width-one-third" action="https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST">
                  <input hidden={true} name="oid" defaultValue={idMappings[env].oid} />
                  <input hidden={true} name="retURL" defaultValue={process.env.REACT_APP_SALESFORCE_RETURN_URL} />
                  <input id="company" maxLength={40} name="company" hidden={true} defaultValue="Intake Form" />
                  <input id="lead_source" maxLength={40} name="lead_source" hidden={true} defaultValue="Intake Form" />
                  <input hidden={true} name="recordType" id="recordType" defaultValue="0123500000012eiAAA" />
                  <label htmlFor="first_name">First Name <span className="form-required-span">*</span></label>
                  <input id="first_name" maxLength={40} name="first_name" type="text" required={true}
                        aria-required={true} />
                  <label htmlFor="last_name">Last Name <span className="form-required-span">*</span></label>
                  <input id="last_name" maxLength={80} name="last_name" type="text" required={true} aria-required={true} />
                  <ErrorableTextInput
                    errorMessage={this.state.email.validation}
                    label="Email"
                    field={this.state.email}
                    name="email"
                    maxLength={80}
                    onValueChange={this.updateEmail}
                    required={true} />
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" maxLength={40} name="phone" type="text" />
                  <label>Cell Phone Type: <span className="form-required-span">*</span></label>
                  <select required={true} id={idMappings[env].cell} name={idMappings[env].cell} title="Cell Phone Type">
                    <option value="">--None--</option>
                    <option value="iPhone">iPhone</option>
                    <option value="Android">Android</option>
                    <option value="Other">Other</option>
                  </select>
                  <label>Confirm Veteran?: <span className="form-required-span">*</span></label>
                  <select required={true} id={idMappings[env].confirm} name={idMappings[env].confirm} title="Confirm Veteran?">
                    <option value="">--None--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <label>What Authentication Methods do you have?: <span className="form-required-span">*</span></label>
                  <div className="form-checkbox">
                    <input
                        id={`${idMappings[env].auth}-1`}
                        name={idMappings[env].auth}
                        type="checkbox"
                        checked={this.state.idme}
                        onChange={this.toggleChecked('idme')}
                        value="ID.Me" />
                    <label htmlFor={`${idMappings[env].auth}-1`}><img alt="DSLogon Icon" src={idme} /> ID.Me</label>
                  </div>
                  <div className="form-checkbox">
                    <input
                        id={`${idMappings[env].auth}-2`}
                        name={idMappings[env].auth}
                        type="checkbox"
                        checked={this.state.ds}
                        onChange={this.toggleChecked('ds')}
                        value="DS" />
                    <label htmlFor={`${idMappings[env].auth}-2`}><img alt="DSLogon Icon" src={ds} /> DSLogon</label>
                  </div>
                  <div className="form-checkbox">
                    <input
                        id={`${idMappings[env].auth}-3`}
                        name={idMappings[env].auth}
                        type="checkbox"
                        checked={this.state.mhv}
                        onChange={this.toggleChecked('mhv')}
                        value="HealtheVet" />
                    <label htmlFor={`${idMappings[env].auth}-3`}>
                      <img style={{backgroundColor: 'rgb(17, 46, 81)'}} alt="DSLogon Icon" src={mhv} /> My HealtheVet
                    </label>
                  </div>
                  <button
                      disabled={!(this.state.idme || this.state.ds || this.state.mhv)}
                      className="usa-button"
                      type="submit"
                      name="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
        );
    }

    private toggleChecked = (key : string) => {
        return () => {
            const update = {};
            update[key] = !this.state[key];
            this.setState(update);
        }
    }

    private updateEmail = (value : IErrorableInput) => {
        this.setState({email: validateEmail(value)});
    }
}
