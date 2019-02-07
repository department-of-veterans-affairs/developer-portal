export class TryItOut {

  static toggle() {

    return {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => {
            const currAPI = window.location.pathname.split('/').pop().toUpperCase();
            const envValue = process.env[`REACT_APP_${currAPI}_TRY_IT_OUT_ENABLED`];
            if (envValue === 'true') {
              return true;
            } else {
              return false;
            }
          },
        },
      },
    }
  }
}
