import { Location, LocationDescriptor } from 'history';
import { history } from '../store';

export const isNavHashLinkExact = (
  to: LocationDescriptor<unknown> | ((location: Location<unknown>) => LocationDescriptor<unknown>),
): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const url = to.toString();
  if (url.startsWith('#')) {
    // On a hash link match to just the hash because pathname isn't present
    return url === history.location.hash;
  } else {
    /*
     * On a regular link match to the full pathname and hash to
     * precent parent links from getting aria-current="page"
     */
    return url === history.location.pathname + history.location.search + history.location.hash;
  }
};
