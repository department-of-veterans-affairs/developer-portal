declare module 'component-library-legacy/Modal';
declare module 'component-library-legacy/LoadingIndicator';

interface VaAccordionProps {
  bordered?: boolean;
  children: JSX.Element | JSX.Element[];
  disableAnalytics?: boolean;
  openSingle?: boolean;
}
interface VaAccordionItemProps {
  header: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  open?: boolean;
  subheader?: string;
}

interface VaSelectProps {
  children: JSX.Element | JSX.Element[];
  error?: string;
  label: string;
  name: string;
  value?: string;
  required?: boolean;
}

declare module '@department-of-veterans-affairs/component-library/dist/react-bindings';
declare module '@department-of-veterans-affairs/react-components';
declare module '@department-of-veterans-affairs/component-library' {
  export function defineCustomElements(): void;
}

interface VaAlertProps {
  ['background-only']?: boolean;
  ['close-btn-aria-label']?: string;
  ['disable-analytics']?: boolean;
  ['full-width']?: boolean;
  ['show-icon']?: boolean;
  children: JSX.Element | JSX.Element[];
  closeable?: boolean;
  status: 'info' | 'success' | 'error' | 'warning' | 'continue';
  visible: boolean;
  key?: string;
}
declare namespace JSX {
  interface IntrinsicElements {
    'va-accordion': VaAccordionProps;
    'va-accordion-item': unknown;
    'va-alert': VaAlertProps;
    'va-select': VaSelectProps;
    defaultLoadingSpinner: unknown;
  }
}
