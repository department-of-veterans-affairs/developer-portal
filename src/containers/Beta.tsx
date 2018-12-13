import * as React from 'react';

import ErrorableTextInput from '@department-of-veterans-affairs/formation/ErrorableTextInput';

import { validateEmail } from '../actions';
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
  VICPROD: {
    auth: "00Nt0000000bf2N",
    cell: "00Nt0000000bf2K",
    confirm: "00Nt0000000bf2L",
    oid: "00Dt00000004X38",
  },
  VICSIT: {
    auth: "00Nt0000000bf2N",
    cell: "00Nt0000000bf2K",
    confirm: "00Nt0000000bf2L",
    oid: "00Dr00000001HYK",
  },
  VICUAT: {
    auth: "00Nt0000000bf2N",
    cell: "00Nt0000000bf2K",
    confirm: "00Nt0000000bf2L",
    oid: "00Dr00000001HcX",
  }
}

const env = process.env.REACT_APP_SALESFORCE_ENV || 'VICDEV';

interface IVetConfirm {
  caretaker: boolean,
  family: boolean,
  no: boolean
  servicemember: boolean,
  veteran: boolean,
}

interface IBetaPageState {
  ds: boolean,
  email: IErrorableInput,
  firstName: string,
  idme: boolean,
  lastName: string,
  mhv: boolean,
  vetConfirm: IVetConfirm,
  iPhone: boolean,
  computer: boolean
}

const vetConfirmMap = {
  caretaker: "Caretaker",
  family: "Family member",
  no: "No",
  servicemember: "Servicemember",
  veteran: "Veteran",
}

export class BetaPage extends React.Component<{}, IBetaPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      computer: false,
      ds: false,
      email: {
        dirty: false,
        value: '',
      },
      firstName: '',
      iPhone: false,
      idme: false,
      lastName: '',
      mhv: false,
      vetConfirm: {
        caretaker: false,
        family: false,
        no: true,
        servicemember: false,
        veteran: false
      },
    }
  }

  public render() {
    return (
      <div className="beta-application">
        <section role="region" aria-label="Page Hero" className="usa-hero">
          <div className="usa-grid">
            <div className="usa-hero-callout">
              <h1 className="usa-sans">Sign up to test the next mobile VA applications</h1>
              <div className="usa-grid no-pad">
                <div className="usa-width-one-half">
                  <p>Mobile applications are at the center of how we work, play, and connect with each other. The VA would like your help to create the next mobile applications to help Veterans.</p>
                  <p><span className="bold-text">Please submit the form below </span>and you'll receive and an email shortly with instructions about how to join our exclusive mobile beta test program.</p>
                </div>
                <div className="usa-width-one-half">
                  <div className="right-box">
                    <p>
                      <span className="bold-text">Respondent burden:</span> 5 minutes
                    </p>
                    <p>
                      <span className="bold-text">OMB Control #:</span> 2900-0770
                    </p>
                    <p>
                      <span className="bold-text">Expiration Date:</span> 09/30/2020
                    </p>
                  </div>
                </div>
              </div>
              <p className="usa-hero-disclaimer-text"><span className="bold-text">Survey Disclaimer: </span>According to the Paperwork Reduction Act of 1995, no persons are required to respond to a collection of information unless it displays a valid OMB control number. The valid OMB control number for this information collection is 2900-0770. The time required to complete this information collection is estimated to average 5 minutes per response, including the time to review instructions, search existing data resources, gather the data needed, and complete and review the information collection. If you have comments concerning the accuracy of the time estimate(s) or suggestions for improving this form, please write to: Office of Information and Regulatory Affairs, Office of Management and Budget, Attn: VA Desk Officer; 725 17th St. NW, Washington, DC 20503 or sent through electronic mail to oira_submission@omb.eop.gov. Please refer to “OMB Control No. 2900-0770” in any correspondence.</p>
            </div>
          </div>
        </section>
        <div className="usa-grid form-container">
          <h1 className="underlined-header">Tell us about yourself. <small className="small-header-text">(All responses required unless noted.)</small></h1>
          <form className="usa-width-one-whole" action={env === 'VICPROD' ? "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" : "https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"} method="POST">
            <input hidden={true} name="oid" defaultValue={idMappings[env].oid} />
            <input hidden={true} name="retURL" defaultValue={process.env.REACT_APP_SALESFORCE_RETURN_URL} />
            <input id="company" maxLength={40} name="company" hidden={true} defaultValue="Intake Form" />
            <input id="lead_source" maxLength={40} name="lead_source" hidden={true} defaultValue="Intake Form" />
            <input hidden={true} name="recordType" id="recordType" defaultValue="0123500000012eiAAA" />
            <input type="text" hidden={true} name={idMappings[env].confirm} id={idMappings[env].confirm} value={this.formatIVetConfirm(this.state.vetConfirm)} readOnly={true} />

            <div className="usa-width-one-whole">
              <div className="usa-width-one-half">
                <label htmlFor="first_name">First Name </label>
                <input
                  id="first_name"
                  maxLength={40}
                  name="first_name"
                  type="text"
                  required={true}
                  aria-required={true}
                  value={this.state.firstName}
                  onChange={this.updateNameInput('firstName')}
                />
              </div>
              <div className="usa-width-one-half">
                <label htmlFor="last_name">Last Name </label>
                <input
                  id="last_name"
                  maxLength={80}
                  name="last_name"
                  type="text"
                  required={true}
                  aria-required={true}
                  value={this.state.lastName}
                  onChange={this.updateNameInput('lastName')}
                />
              </div>
            </div>

            <div className="usa-width-one-half">
              <ErrorableTextInput
                errorMessage={this.state.email.validation}
                label="Email"
                field={this.state.email}
                name="email"
                maxLength={80}
                onValueChange={this.updateEmail}
              />
            </div>
            <div className="usa-width-one-whole question-area">
              <label className="checkbox-label">Are you a Veteran, Veteran's family member, Veteran's caretaker, or Servicemember? <small className="small-checkbox-label">(Check all that apply)</small></label>

              <div className="form-checkbox">
                <input
                  id="vet-checkbox"
                  type="checkbox"
                  checked={this.state.vetConfirm.veteran}
                  onChange={this.updateIVetConfirm('veteran')}
                />
                <label htmlFor="vet-checkbox">Veteran</label>
              </div>
              <div className="form-checkbox">
                <input
                  id="vet-family-checkbox"
                  type="checkbox"
                  checked={this.state.vetConfirm.family}
                  onChange={this.updateIVetConfirm('family')} />
                <label htmlFor="vet-family-checkbox">Veteran's family member</label>
              </div>
              <div className="form-checkbox">
                <input
                  id="vet-caretaker-checkbox"
                  type="checkbox"
                  checked={this.state.vetConfirm.caretaker}
                  onChange={this.updateIVetConfirm('caretaker')} />
                <label htmlFor="vet-caretaker-checkbox">Veteran's caretaker</label>
              </div>
              <div className="form-checkbox">
                <input
                  id="servicemember-checkbox"
                  type="checkbox"
                  checked={this.state.vetConfirm.servicemember}
                  onChange={this.updateIVetConfirm('servicemember')} />
                <label htmlFor="servicemember-checkbox">Servicemember</label>
              </div>
            </div>
            <div className="usa-width-one-whole question-area">
              <label className="checkbox-label">How do you access the internet? <small className="small-checkbox-label">(Check all that apply)</small></label>
              <div className="usa-width-one-whole internet-checkbox-group">
                <div className="usa-width-one-half">
                  <label className="checkbox-label">Select device(s)</label>
                  <div className="form-checkbox">
                    <input
                      id={`${idMappings[env].cell}-1`}
                      name={idMappings[env].cell}
                      checked={this.state.iPhone}
                      type="checkbox"
                      value="iPhone"
                      onChange={this.toggleChecked('iPhone')}
                    />
                    <label htmlFor={`${idMappings[env].cell}-1`}>iPhone</label>
                  </div>
                  <div className="form-checkbox">
                    <input
                      id={`${idMappings[env].cell}-2`}
                      name={idMappings[env].cell}
                      checked={this.state.computer}
                      type="checkbox"
                      onChange={this.toggleChecked('computer')}
                      value="Computer, tablet or other smartphone"
                    />
                    <label htmlFor={`${idMappings[env].cell}-2`}>Computer, tablet, or other smartphone</label>
                  </div>
                </div>

                <div className="usa-width-one-half">
                  <label className="checkbox-label">Select log in method</label>
                  <div className="form-checkbox">
                    <input
                      id={`${idMappings[env].auth}-2`}
                      name={idMappings[env].auth}
                      type="checkbox"
                      checked={this.state.ds}
                      onChange={this.toggleChecked('ds')}
                      value="DS" />
                    <label htmlFor={`${idMappings[env].auth}-2`}>Access VA on-line services with <img alt="DSLogon Icon" src={ds} />DS Logon</label>
                  </div>
                  <div className="form-checkbox">
                    <input
                      id={`${idMappings[env].auth}-1`}
                      name={idMappings[env].auth}
                      type="checkbox"
                      checked={this.state.idme}
                      onChange={this.toggleChecked('idme')}
                      value="ID.Me" />
                    <label htmlFor={`${idMappings[env].auth}-1`}>Access VA on-line services with <img alt="DSLogon Icon" src={idme} /></label>
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
                      Access VA on-line services with <img style={{ backgroundColor: 'rgb(17, 46, 81)' }} alt="DSLogon Icon" src={mhv} /> MyHealtheVet
                      </label>
                  </div>
                </div>
              </div>


              <button
                disabled={this.submitButtonDisabled()}
                className="usa-button question-area"
                type="submit"
                name="submit">
                Sign me up
                    </button>
            </div>


          </form>
        </div>
      </div>
    );
  }

  private toggleChecked = (key: string) => {
    return () => {
      const update = {};
      update[key] = !this.state[key];
      this.setState(update);
    }
  }

  private updateNameInput = (name: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const update = {};
      update[name] = event.target.value;
      this.setState(update);
    }
  }

  private updateIVetConfirm = (key: string) => {
    return () => {
      const update = { ...this.state.vetConfirm }
      update[key] = !update[key];

      update.no = !(update.caretaker || update.family || update.veteran || update.servicemember);

      this.setState({ vetConfirm: update });
    }
  }

  private updateEmail = (value: IErrorableInput) => {
    this.setState({ email: validateEmail(value) });
  }

  private formatIVetConfirm = (confirm: IVetConfirm) => {
    if (confirm.no) {
      return vetConfirmMap.no;
    } else {
      return Object.keys(confirm).reduce((arr, key) => {
        if (confirm[key]) {
          return arr.concat(vetConfirmMap[key]);
        } else {
          return arr;
        }
      }, []).join(';');
    }
  }

  private submitButtonDisabled = () => {
    return !(this.loginChecked() && this.deviceChecked() && this.vetStatusChecked() && this.validTextInput());
  }

  private loginChecked = () => {
    return this.state.idme || this.state.ds || this.state.mhv;
  }

  private deviceChecked = () => {
    return this.state.computer || this.state.iPhone;
  }

  private vetStatusChecked = () => {
    return this.state.vetConfirm.veteran || this.state.vetConfirm.family || this.state.vetConfirm.caretaker || this.state.vetConfirm.servicemember;
  }

  private validTextInput = () => {
    return this.state.firstName !== '' && this.state.lastName !== '' && !this.state.email.validation;
  }
}
