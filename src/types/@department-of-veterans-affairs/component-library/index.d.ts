declare module '@department-of-veterans-affairs/component-library';
declare module '@department-of-veterans-affairs/component-library/AlertBox';
declare module '@department-of-veterans-affairs/component-library/Modal';

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

interface VaSegmentedProgressBar {
  current: number;
  enableAnalytics?: boolean;
  label?: string;
  total: number;
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
}

declare namespace JSX {
  interface IntrinsicElements {
    'va-accordion': VaAccordionProps;
    'va-accordion-item': unknown;
    'va-alert': VaAlertProps;
    'va-segmented-progress-bar': VaSegmentedProgressBar;
  }
}
