/*
  A module for wrapping common sets of VADS classes used throughout the site. Think of this 
  module as mixins but in Typescript. The default pattern here is to use the classNames utility
  to aggregate VADS classes, with optional conditions, but you should feel free to write utilities
  however you want.
*/

import classNames from 'classnames';

export const defaultFlexContainer = (alignItemsCenter = false): string =>
  classNames('vads-u-display--flex', 'vads-u-flex-direction--row', 'vads-u-flex-wrap--wrap', {
    'vads-u-align-items--center': alignItemsCenter,
  });

export const mobileOnly = (): string =>
  classNames('vads-u-display--block', 'medium-screen:vads-u-display--none');
export const desktopOnly = (): string =>
  classNames('vads-u-display--none', 'medium-screen:vads-u-display--block');
