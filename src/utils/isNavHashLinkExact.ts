import { Location, LocationDescriptor } from 'history';

export const isHashLinkExact = (
  to: LocationDescriptor | ((location: Location) => LocationDescriptor),
): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const url = to.toString();
  if (url.startsWith('#')) {
    // On a hash link match to just the hash because pathname isn't present
    return url === window.location.hash;
  } else {
    /*
     * On a regular link match to the full pathname and hash to
     * precent parent links from getting aria-current="page"
     */
    return url === window.location.pathname + window.location.search + window.location.hash;
  }
};
