/**
 * create-react-app enables the use of the Service Worker API on an opt-in basis, and we've
 * chosen not to use it for now. We have removed the default functionality for registering a
 * service worker and have only left unregister() so we can ensure there are no service workers on
 * the site. If we would like to re-enable service workers in the future, we can revert this file
 * to an older version containing the registration code.
 *
 * create-react-app: https://create-react-app.dev/docs/making-a-progressive-web-app/
 * Service Worker API: https://developer.mozilla.org/en/docs/Web/API/Service_Worker_API
 * progressive web apps: https://web.dev/progressive-web-apps/
 */

export const unregister = (): void => {
  if ('serviceWorker' in navigator) {
    void navigator.serviceWorker.ready.then(registration => {
      void registration.unregister();
    });
  }
};
