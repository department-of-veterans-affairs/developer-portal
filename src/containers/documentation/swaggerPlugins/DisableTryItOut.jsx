import React from "react";

export default class DisableTryItOut {

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
    return process.env[`REACT_APP_TRY_IT_OUT_ENABLED`] === 'true';
  }
}
