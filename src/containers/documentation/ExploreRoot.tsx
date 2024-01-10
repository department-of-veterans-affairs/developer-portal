import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { ApiFilters, ExploreApiCard, PageHeader } from '../../components';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import { APIDescription } from '../../apiDefs/schema';
import { getScrollPosition, setScrollPosition } from '../../features/general/scrollPositionSlice';
import { getApisLoaded } from '../../apiDefs/query';
import { RootState } from '../../types';
import './ExploreRoot.scss';
import { useAppDispatch } from '../../hooks';

export const ExploreRoot = (): JSX.Element => {
  const [apis, setApis] = useState<APIDescription[]>([]);
  const dispatch = useAppDispatch();
  const scrollPositionSelector = (state: RootState): number =>
    getScrollPosition(state.scrollPosition);
  const scrollPosition = useSelector(scrollPositionSelector);

  const [scrollPos, setScrollPos] = useState(scrollPosition);
  const apisLoaded = getApisLoaded();

  useEffect(() => {
    if (apisLoaded && scrollPos) {
      setTimeout(() => window.scrollTo(0, scrollPos), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apisLoaded]);

  useEffect(() => {
    const getScrollPositionValue = (): void => {
      const currentPosition = window.scrollY;
      setScrollPos(currentPosition);
    };

    window.addEventListener('scroll', getScrollPositionValue);

    return () => {
      window.removeEventListener('scroll', getScrollPositionValue);
      dispatch(setScrollPosition(scrollPos));
    };
  }, [dispatch, scrollPos]);

  return (
    <div className="explore-root-container">
      <PageHeader
        header="Explore our APIs"
        subText="View and sort our APIs to find the best one for your needs."
      />
      <ApiFilters apis={apis} setApis={setApis} />
      <ApisLoader>
        <>
          <div data-cy="api-list" className="explore-main-container" role="list">
            {apis.map((api: APIDescription) => (
              <div key={api.urlSlug} className="vads-u-display--flex" role="listitem">
                <ExploreApiCard api={api} />
              </div>
            ))}
          </div>
          <p className={classNames('explore-end-of-list', 'vads-u-color--gray-warm-dark')}>
            End of list
          </p>
        </>
      </ApisLoader>
    </div>
  );
};
