import React from "react";

export class TryItOut {

  static toggleTryItOut() {
    return {
      wrapSelectors: {
        allowTryItOutFor: () => () => this.check(),
      },
    }
  }

  static toggleAuthorize() {
    return {
      authorizeBtn: (Original, system) => (props) => {
        if (this.check() === true) {
          return <Original {...props} />
        } else {
          return null;
        }
      },
    }
  }

  static check() {
    const currAPI = window.location.pathname.split('/').pop().toUpperCase();
    const envValue = process.env[`REACT_APP_${currAPI}_TRY_IT_OUT_ENABLED`];
    if (envValue === 'true') {
      return true;
    } else {
      return false;
    }
  }
}
