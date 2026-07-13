import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {translate} from '@docusaurus/Translate';
import {useLocation} from '@docusaurus/router';
import IconHome from '@theme/Icon/Home';
import styles from './styles.module.css';

export default function HomeBreadcrumbItem() {
  const homeHref = useBaseUrl('/');
  const {pathname} = useLocation();
  const isAtelio = pathname.includes('/atelio/');

  return (
    <li className="breadcrumbs__item">
      {isAtelio && (
        <span className={styles.defunctNotice}>Live site defunct</span>
      )}
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Home page',
          description: 'The ARIA label for the home page in the breadcrumbs',
        })}
        className="breadcrumbs__link"
        href={homeHref}>
        <IconHome className={styles.breadcrumbHomeIcon} />
      </Link>
    </li>
  );
}
