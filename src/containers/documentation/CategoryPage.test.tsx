// import { shallow } from 'enzyme';
import 'jest';
// import * as React from 'react';
import TrustedPartnerOnlyTag from '../../components/TrustedPartnerOnlyTag';
import VAInternalOnlyTag from '../../components/VAInternalOnlyTag';

import { onlyTags } from './CategoryPage';

const child = (jsx: JSX.Element | undefined, i: number) => jsx &&
  jsx!.props && Array.isArray(jsx!.props!.children) && jsx!.props!.children[i];

describe('onlyTags', () => {
  it('renders selectively', () => {
    expect(onlyTags).toBeTruthy();

    let tags = onlyTags({vaInternalOnly: false, trustedPartnerOnly: false});
    expect(tags).toBeUndefined();

    tags = onlyTags({vaInternalOnly: true, trustedPartnerOnly: false});
    expect(child(tags, 0)!.type).toBe(VAInternalOnlyTag);

    tags = onlyTags({vaInternalOnly: false, trustedPartnerOnly: true});
    expect(child(tags, 1)!.type).toBe(TrustedPartnerOnlyTag);

    tags = onlyTags({vaInternalOnly: true, trustedPartnerOnly: true});
    expect(child(tags, 0)!.type).toBe(VAInternalOnlyTag);
    expect(child(tags, 1)!.type).toBe(TrustedPartnerOnlyTag);
  });
});
